import express from "express";
import submissionModel, { submissionStatus } from '../models/submissions.model'
const router = express.Router();
import { getUserFromToken } from "../helpers/authHelpers";
import { userRoles } from "../models/user.models";
import { getPreviewImgURL } from "../helpers/contentHelpers";
import Telegram from "telegraf";
const telegram = new Telegram(process.env.BOT_TOKEN || '').telegram;


router.get("/", function (req, res) {
  const token = req.query.token as string;
  getUserFromToken(token, async (user, err) => {
    if (err) return res.sendStatus(403);
    const submissions = await submissionModel.find({ writer: user.username }).select('-content').sort({ submittedDate: -1 })
    res.send(submissions)
  })
});

router.get("/all", function (req, res) {
  const token = req.query.token as string;
  getUserFromToken(token, async (user, err) => {
    if (user.role != userRoles.ADMIN || err) {
      return res.sendStatus(403);
    }
    const submissions = await submissionModel.find().select('-content').sort({ submittedDate: -1 });
    res.send(submissions);
  })

});

router.get("/:id", function (req, res) {
  const token = req.query['0'] as string;
  getUserFromToken(token, async (user, err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const submission = await submissionModel.findById(req.params.id)
      if (user.role == userRoles.ADMIN || user.username == submission?.writer) {
        res.send(submission);
      } else {
        res.sendStatus(403)
      }
    }
  })
});

router.post("/:id/approve", (req, res) => {
  const token = req.body.token;
  getUserFromToken(token, async (user, err) => {
    if (err) return res.sendStatus(403)
    const { status, writer } = (await submissionModel.findById(req.params.id, 'status writer').exec()) ?? { status: null, writer: null };
    if (status === submissionStatus.AWAITING_EDITOR && user.role === userRoles.ADMIN && user.username != writer) {
      await submissionModel.findByIdAndUpdate(req.params.id,
        { status: submissionStatus.POSTED, postedDate: new Date() }).exec()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(403))
    } else if (status === submissionStatus.AWAITING_WRITER && writer === user.username) {
      await submissionModel.findByIdAndUpdate(req.params.id,
        { status: submissionStatus.POSTED, postedDate: new Date() }).exec()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(403))
    } else if (status === submissionStatus.POSTED_AWAITING_WRITER && writer === user.username) {
      const submission = await submissionModel.findByIdAndUpdate(req.params.id,
        { status: submissionStatus.POSTED }).exec()
      await submissionModel.findByIdAndDelete(submission?.prevID)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(403))
    }
    else if (status === submissionStatus.POSTED_AWAITING_EDITOR && user.role === userRoles.ADMIN && user.username != writer) {
      const submission = await submissionModel.findByIdAndUpdate(req.params.id,
        { status: submissionStatus.POSTED_AWAITING_WRITER }).exec()
      await submissionModel.findByIdAndDelete(submission?.prevID)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(403))
    }
  })
});

router.patch("/:id", (req, res) => {
  const token = req.body.token;
  const { title, subtitle, content } = req.body;
  getUserFromToken(token, async (user, err) => {
    if (err) {
      return res.sendStatus(403);
    }
    const submission = await submissionModel.findById(req.params.id).exec();
    if (submission?.writer) {
      if (submission?.status == submissionStatus.POSTED) {
        const updatedSubmission = new submissionModel({
          content: content,
          title: title,
          subtitle: subtitle,
          writer: submission.writer,
          previewImg: getPreviewImgURL(content),
          postedDate: submission.postedDate,
          submittedDate: submission.submittedDate,
          prevID: submission._id
        })
        if (submission.writer == user.username) {
          updatedSubmission.status = submissionStatus.POSTED_AWAITING_EDITOR
        } else {
          updatedSubmission.status = submissionStatus.POSTED_AWAITING_WRITER
        }
        updatedSubmission.save().then(
          () => res.sendStatus(200)
        ).catch(
          () => res.sendStatus(500)
        )
      } else {
        const writer = submission.writer
        if (submission.status == submissionStatus.POSTED_AWAITING_EDITOR || submission.status == submissionStatus.POSTED_AWAITING_WRITER) {
          if (user.username === writer) {
            submission.status = submissionStatus.POSTED_AWAITING_EDITOR
          } else if (user.role === userRoles.ADMIN) {
            submission.status = submissionStatus.POSTED_AWAITING_WRITER
          }
        } else {
          if (user.username === writer) {
            submission.status = submissionStatus.AWAITING_EDITOR
          } else if (user.role === userRoles.ADMIN) {
            submission.status = submissionStatus.AWAITING_WRITER
          }
        }

        submission.editedDate = new Date()
        submission.title = title;
        submission.subtitle = subtitle;
        submission.content = content
        const previewImg = getPreviewImgURL(content)
        if (previewImg) submission.previewImg = previewImg
        submission.save()
        return res.sendStatus(200)
      }
    }
  })
});

router.post("/", (req, res) => {
  const token = req.body.token;
  if (token == null) return res.sendStatus(401)
  getUserFromToken(token, (user, err) => {
    if (err) {
      return res.sendStatus(403);
    }
    const content: String = req.body.content
    const previewImg = getPreviewImgURL(content)
    const submission = new submissionModel({
      content: req.body.content,
      title: req.body.title,
      subtitle: req.body.subtitle,
      writer: user.username,
      status: submissionStatus.AWAITING_EDITOR,
      previewImg: previewImg,
      submittedDate: new Date()
    });
    submission.save().then(
      (submittedPost) => {
        const message = '@' + user.username + " has submitted a new post, please approve or edit the post. \n" + 
         submittedPost.title + "\n" +
         submittedPost.subtitle + "\n" 
         + 'https://nuscas.com/submissions/'+ submittedPost._id;
        telegram.sendMessage(Number(process.env.TELEGRAM_ADMIN_GROUP_ID), message);
        res.sendStatus(200)
      }
    ).catch(
      () => res.sendStatus(500)
    );
  })
});

router.delete("/", (req, res) => {
  const token = req.body.token;
  const id = req.body.id
  submissionModel.findById(id).exec().then(
    (submission) => {
      const writer = submission?.writer
      getUserFromToken(token, (user, err) => {
        if (err) return res.sendStatus(403);
        else if (user.role == userRoles.ADMIN || (user.username == writer)) {
          submissionModel.findByIdAndDelete(id).exec()
            .then(() => {
              res.sendStatus(200);
            }).catch(() => {
              res.sendStatus(404);
            })
        }
      })
    }
  ).catch(
    () => res.sendStatus(404)
  )
});

export = router;

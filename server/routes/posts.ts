import express from "express";
import { getUserFromToken } from "../helpers/authHelpers";
const router = express.Router();
import submissionModel, { Comment, Submission, submissionStatus } from '../models/submissions.model'
import { userRoles } from "../models/user.models";

router.use(express.json());

// define the home page route
router.get("/", function (req, res) {
   const page: number = Number(req.query.page);
  submissionModel.find({ status: submissionStatus.POSTED })
  .select('title subtitle previewImg writer postedDate')
  .sort({ postedDate: -1, submittedDate: -1 }).skip(page * 20)
  .limit(20)
  .exec((_err, submission) => {
    res.send(submission);
  })
});

router.get("/:id", function (req, res) {
  submissionModel.findById(req.params.id).exec((_err, submission) => {
    res.send(submission);
  })
});

router.post("/:id/comment/", (req, res) => {
  const token = req.body.token;
  getUserFromToken(token, async (user, err) => {
      if(user) {
        const comment: Comment = { content: req.body.comment, user: user.username, dateTime: new Date()};
        const { comments } = (await submissionModel.findById(req.params.id, 'comments').exec()) ?? { comments: [] as Comment[]};
        comments.push(comment);
        await submissionModel.findByIdAndUpdate(req.params.id,
          { comments: comments }).exec()
          .then(() => res.sendStatus(200))
          .catch(() => res.sendStatus(403))
      }else {
        res.sendStatus(403)
      }
  })
});

router.delete("/:id/comment/", (req, res) => {
  const token = req.body.token;
  const commentIndex = req.body.commentIndex;
  getUserFromToken(token, async (user, err) => {
      if(user && user.role == userRoles.ADMIN && commentIndex > -1) {
        const { comments } = (await submissionModel.findById(req.params.id, 'comments').exec()) ?? { comments: [] as Comment[]};
        comments.splice(commentIndex, 1);
        await submissionModel.findByIdAndUpdate(req.params.id,
          { comments: comments }).exec()
          .then(() => res.sendStatus(200))
          .catch(() => res.sendStatus(403))
      }else {
        res.sendStatus(403)
      }
  })
});

export = router;

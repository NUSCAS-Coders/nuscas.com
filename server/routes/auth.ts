import express from "express";
const router = express.Router();
import Telegram from "telegraf";
import "../helpers/authHelpers";
import { User, userRoles } from '../models/user.models'
import jwt from 'jsonwebtoken'
import { checkSignature, getUserFromToken } from "../helpers/authHelpers";
const telegram = new Telegram(process.env.BOT_TOKEN || '').telegram;

// console.log(generateAccessToken({ user: {
//   id: 1234,
//   first_name: 'diaryofcas',
//   username: 'diaryofcas contributor',
//   photo_url: '',
//   auth_date: 0,
//   hash: '',
//   role: userRoles.ADMIN
// } }))

router.post('/newUser', async (req, res) => {
  let user: User = req.body.user;
  const isAdmin = await checkMemberInChat(user, Number(process.env.TELEGRAM_ADMIN_GROUP_ID));
  const isMember = await checkMemberInChat(user, Number(process.env.TELEGRAM_MEMBER_GROUP_ID));
  if (isAdmin) {
    user.role = userRoles.ADMIN
    const token = generateAccessToken({ user: user });
    console.log(token)
    res.json({ token, user });
  } else if (isMember) {
    user.role = userRoles.MEMBER
    const token = generateAccessToken({ user: user });
    console.log(token)
    res.json({ token, user });
  } else {
    user.role = userRoles.VIEWER
    const token = generateAccessToken({ user: user });
    console.log(token)
    res.json({ token, user });
  }
});

router.post('/getUser', (req, res) => {
  const token = req.body.token;
  if (!token)
    res.sendStatus(401)
  else {
    getUserFromToken(token, (user, err) => {
      if (err) {
        res.sendStatus(403)
      }
      res.send({ user, token })
    })
  }
});

function generateAccessToken(user: { user: User }) {
  return jwt.sign(user, process.env.TOKEN_SECRET || '', { expiresIn: '7d' });
}

async function checkMemberInChat(user: User, chatId: number) {
  try {
    const chatMember = await telegram.getChatMember(chatId, user.id)
    if (checkSignature(user) && chatMember.user.username == user.username && chatMember.status != 'kicked' || chatMember.status != 'left') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export = router;


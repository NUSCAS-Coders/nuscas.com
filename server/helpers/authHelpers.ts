import { createHmac, createHash } from "crypto";
import {User} from '../models/user.models'
import jwt from 'jsonwebtoken'

export function checkSignature({ hash, ...data }: any) {
    const secret = createHash("sha256").update(process.env.BOT_TOKEN || '').digest();
    const checkString = Object.keys(data)
        .sort()
        .map((k) => `${k}=${data[k]}`)
        .join("\n");
    const hmac = createHmac("sha256", secret).update(checkString).digest("hex");
    return hmac === hash;
}

export function getUserFromToken(token: string, returnValue: (user: User, err: Error) => void) {
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, ret: any) => {
      returnValue(ret.user, err)
    })
}
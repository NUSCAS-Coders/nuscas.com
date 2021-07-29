import express from 'express' 
import cors from 'cors';
import dotenv from 'dotenv'


const app = express();
const port = 3000;
dotenv.config()

import posts from './routes/posts';
import submissions from './routes/submissions';
import auth from './routes/auth';

app.use(express.json({ limit: '2MB' }));

app.use(cors())
app.use('/posts', posts)
app.use('/submissions', submissions)
app.use('/auth', auth)


app.listen(port, () => {
  console.log(`server listening at http://192.168.1.4:${port}`);
});


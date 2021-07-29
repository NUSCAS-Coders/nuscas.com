import mongoose, { Document, Schema } from "mongoose";
const uri = process.env.MONGO_URI || '';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', false,)

export enum submissionStatus {
  AWAITING_WRITER = 'Edited, awaiting writer approval',
  AWAITING_EDITOR = "Submitted, awaiting editor's approval/ edits",
  POSTED = 'Posted',
  POSTED_AWAITING_WRITER = "Posted, awaiting writer's approval/ edits",
  POSTED_AWAITING_EDITOR = "Posted, awaiting editor's approval/ edits"
}



export interface Comment {
  user: String,
  content: String,
  dateTime: Date
}
export interface Submission extends Document {
  title: String,
  subtitle: String,
  content: Object,
  writer: String,
  status: String
  previewImg: Object,
  postedDate: Date,
  editedDate: Date,
  submittedDate: Date,
  prevID: String,
  comments: [Object]
}


const submissionSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: Object, required: true },
  writer: { type: String, required: true },
  postedDate: Date,
  editedDate: Date,
  submittedDate: Date,
  previewImg: Object,
  prevID: String,
  status: { type: String, required: true, enum: Object.values(submissionStatus) },
  comments: {type: [{
    user: String,
    content: String,
    dateTime: Date
  }]}
});

export default mongoose.model<Submission>("submission", submissionSchema);
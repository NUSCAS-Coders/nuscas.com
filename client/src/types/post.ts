export const enum ArticleStatus {
    AWAITING_WRITER = 'Edited, awaiting writer approval',
    AWAITING_EDITOR = "Submitted, awaiting editor's approval/ edits",
    POSTED = 'Posted',
    POSTED_AWAITING_WRITER = "Posted, awaiting writer's approval/ edits",
    POSTED_AWAITING_EDITOR = "Posted, awaiting editor's approval/ edits"
  }
export default interface Article{
    _id: String;
    title: String,
    subtitle: String,
    content: Object,
    writer: String,
    status: ArticleStatus
    previewImg: Object
    postedDate: Date,
    editedDate: Date,
    submittedDate: Date,
    comments: Comment[]
}

export interface Comment{
  user: String,
  content: String
  dateTime: Date;
}

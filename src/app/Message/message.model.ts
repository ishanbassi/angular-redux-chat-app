import { Thread } from "../thread/thread.model";
import { User } from "../user/user.model";

export interface Message{
    text:string,
    id?:string,
    thread?:Thread,
    author:User,
    sentAt?:Date,
    isRead?:boolean
}
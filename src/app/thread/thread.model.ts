import { Message } from "../Message/message.model"
export interface Thread{
    messages:Message[],
    id:string,
    name:string,
    avatarSrc:string
}
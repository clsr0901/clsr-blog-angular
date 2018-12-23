
export class Comment {
    
    public id: number;
    public destUserId: number;
    public destUserName: string;
    public sourceUserId: number;
    public sourceUserName: string;
    public blogId: number;
    public content: string;
    public action: number;
    public createtime: string;
    public reply: boolean = false;
    public replyContent: string;

    constructor() { }
}
import { User } from "./User";

export class Blog {
    
    public id: number;
    public userId: number;
    public content: string;
    public title: string;
    public summary: string;
    public hit: number;
    public view: number;
    public sticky: boolean;
    public hightlight: boolean;
    public createtime: string;
    public updatetime: string;
    public user: User;

    constructor(
    ) { }
}
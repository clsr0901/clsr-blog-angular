import { Injectable } from "@angular/core";

@Injectable()

export class CommonService {

    public authorization: string;

    constructor() {

    }

    public setAuthorization(data): void {
        this.authorization = data;
    }

}
import {v4 as uuid} from "uuid";

export class Todo{

    /**
     * 
     * @param {String} description
     * @return una nueva instancia 
     */
    constructor( description ){
        this.id          = uuid();
        this.description = description;
        this.done        = false;
        this.createdAt   = new Date();
    }

}
export class Homework{
    description : string;
    status : string;
    name : string;
    id : string;

    constructor(description : string, status : string, name : string, id: string){
        this.id = id;
        this.description = description;
        this.status = status;
        this.name = name;
    }
}
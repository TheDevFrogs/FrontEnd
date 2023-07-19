import { DisplayedFile } from "./displayedFile";

export class TeacherAssignmentPage{
    id_assignment : string;
    name : string;
    description : string;
    available_date : string;
    due_date : string;
    close_date : string;
    
    constructor(id_assignment : string,
                name : string,
                description : string,
                available_date : string,
                due_date : string,
                close_date : string){
        this.id_assignment = id_assignment;
        this.name = name;
        this.description = description;
        this.available_date = available_date;
        this.due_date = due_date;
        this.close_date = close_date;
    }


}
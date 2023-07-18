
export class TeacherAssignmentPreview{
    id_assignment : string;
    due_date : string;
    name : string;

    constructor(id_assignment : string, due_date : string, name : string){
        this.id_assignment = id_assignment;
        this.due_date = due_date;
        this.name = name;
    }

}
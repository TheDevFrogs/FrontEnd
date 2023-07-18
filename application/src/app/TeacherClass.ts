import { Teacher } from "./teacher";
import { TeacherAssignmentPreview } from "./teacherAssingmentPreview";


export class TeacherClass{

    id_group : string;

    name : string;

    classTag : string;

    no_group : string;

    teachers : Teacher[];

    assigments : TeacherAssignmentPreview[];


    constructor(id_group : string, name : string, classTag : string, no_group : string, teachers : Teacher[], assigments : TeacherAssignmentPreview[]){
        this.id_group = id_group;
        this.name = name;
        this.classTag = classTag;
        this.no_group = no_group;
        this.teachers = teachers;
        this.assigments = assigments;
    }

}
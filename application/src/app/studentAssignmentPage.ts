import { AssingmentFile } from "./assignmentFile";
import { DisplayedFile } from "./displayedFile";


export class StudentAssignmentPage{
    id_assingment : string;
    name : string;
    description : string;
    available_date : string;
    due_date : string;
    close_date : string;
    file : DisplayedFile;
    handed_work_files : AssingmentFile[];
    corrected_work_files : AssingmentFile[];

    constructor(){
        this.id_assingment = "";
        this.name = "";
        this.description = "";
        this.available_date = "2020-12-02T05:00:00Z";
        this.due_date = "2020-12-02T05:00:00Z";
        this.close_date = "2020-12-02T05:00:00Z";
        this.handed_work_files = [];
        this.corrected_work_files = [];
    }
}
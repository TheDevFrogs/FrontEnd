import { Teacher } from "./teacher";
import { Homework } from "./homework";

export class Cours{
    name : string;
    classTag : string;
    teachers : Teacher[];
    homework : Homework[];


    constructor(name : string, classTag : string, teacher : Teacher[], homework : Homework[]){
        this.name = name;
        this.classTag = classTag;
        this.teachers = teacher;
        this.homework = homework;
    }
}
import { Homework } from "./homework";

export class Cours{
    name : string;
    classTag : string;
    teacher : string;
    homework : Homework[];


    constructor(name : string, classTag : string, teacher : string, homework : Homework[]){
        this.name = name;
        this.classTag = classTag;
        this.teacher = teacher;
        this.homework = homework;
    }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemFileEntry, NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { Observable } from 'rxjs';
import { AuthedUserService } from '../authed-user.service';

@Component({
  selector: 'app-drop-box',
  standalone: true,
  imports: [CommonModule, NgxFileDropModule],
  templateUrl: 'drop-box.component.html',
  styleUrls: ['./drop-box.component.css']
})
export class DropBoxComponent {

  public files: NgxFileDropEntry[] = [];

  public zip = new JSZip();

  public userAuthed : AuthedUserService;

  constructor(user : AuthedUserService){
    this.userAuthed = user;
  }

  public send(){
    this.zipAndSend();
  }


  saveZip(){
    this.zip.generateAsync({type:"blob"}).then((content) => {
      this.userAuthed.uploadFile(content);
    });
  }

  zipAndSend(){

    var counter = 0;

    for (var droppedFile of this.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            counter++;
            this.zip.file(file.name, file);

            if(counter == this.files.length){
              this.saveZip();
            }
        });
      } 
    }

  }


  public cancel(){
    this.files = [];
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = this.files.concat(files);
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class DropBoxComponent{

  @Input()
  enableSend : boolean;

  @Input()
  onlyZip : boolean;

  @Output()
  onFileChanges = new EventEmitter<any>();

  @Output()
  onFileSave = new EventEmitter<any>();



  public files: NgxFileDropEntry[] = [];

  public zip = new JSZip();

  public userAuthed : AuthedUserService;

  constructor(user : AuthedUserService){
    this.userAuthed = user;
  }


  ngOnInit(){
   if(this.onlyZip == undefined){
    this.onlyZip = false;
   }
  }

  saveZip(){
    this.zip.generateAsync({type:"blob"}).then((content) => {
      this.onFileSave.emit(content);
    });
  }

  zipAndSend(){

    if(this.onlyZip){
      const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File)=>{
        var monBlob : Blob;
        monBlob = file;
        this.onFileSave.emit(monBlob);
      });
    }
    else{
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


  }


  public cancel(){
    this.files = [];
    if(!this.enableSend){
      this.zip = new JSZip();
      this.notifyNewFiles();
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    
    if(!this.enableSend && !this.onlyZip){

      var counter = this.files.length;

      for (var droppedFile of files) {
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
              counter++;
              this.zip.file(file.name, file);
              if(counter >= this.files.length){
                this.notifyNewFiles();
              }
          });
        } 
      }
    }

    if(this.onlyZip){
      if(files.length > 1){
        console.log("Multiple files");
        return;
      }
      if(!files[0].relativePath.endsWith(".zip")){
        console.log("Not zip");
        return;
      }
    }

    this.files = this.files.concat(files);
  }

  notifyNewFiles(){

    this.zip.generateAsync({type:"blob"}).then((content) => {
      this.onFileChanges.emit(content);
    });

  }



}

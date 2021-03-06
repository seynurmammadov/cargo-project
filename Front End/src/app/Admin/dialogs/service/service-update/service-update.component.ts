import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare let alertify:any
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ServiceService} from '../../../../Core/services/Admin/service/service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {Service} from '../../../../Core/models/Service';
@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.scss']
})
export class ServiceUpdateComponent implements OnInit {
  fileAttr = 'Şəkil seç';
  fileToUpload:File
  @ViewChild('fileInput') fileInput: ElementRef;
  public Editor = ClassicEditor;
  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ServiceUpdateComponent>,
    private languageService:LanguagesService,
    private service:ServiceService,
    @Inject(MAT_DIALOG_DATA) public data:Service
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      IsActived: new FormControl(this.data.isActived ),
      TitleRussia: new FormControl(this.data.serviceTranslates[1].title, [
        Validators.required,
      ]),
      TitleEnglish: new FormControl(this.data.serviceTranslates[0].title, [
        Validators.required,
      ]),
      TitleAzerbaijan: new FormControl(this.data.serviceTranslates[2].title, [
        Validators.required,
      ]),
      DescRussia: new FormControl(this.data.serviceTranslates[1].description, [
        Validators.required,
      ]),
      DescEnglish: new FormControl(this.data.serviceTranslates[0].description, [
        Validators.required,
      ]),
      DescAzerbaijan: new FormControl(this.data.serviceTranslates[2].description, [
        Validators.required,
      ]),
      FileInput: new FormControl('', [
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      this.fileAttr = imgFile.target.files[0].name

      this.fileToUpload= <File>imgFile.target.files[0]

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Şəkil seç';
    }
  }
  submit(){
    const body = new FormData();
    if(this.fileToUpload == undefined){
      body.append("Photo",null)
    }
    else{
      body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    }
    body.append("id",this.data.id.toString())
    body.append("IsActived",this.createForm.controls["IsActived"].value)
    const CourierTranslates= [
      {
        Id:this.data.serviceTranslates[0].id,
        Title:this.createForm.controls["TitleEnglish"].value.trim(),
        Description:this.createForm.controls["DescEnglish"].value.trim(),
        LanguageId:1
      },
      {
        Id:this.data.serviceTranslates[1].id,
        Title:this.createForm.controls["TitleRussia"].value.trim(),
        Description:this.createForm.controls["DescRussia"].value.trim(),
        LanguageId:2
      },
      {
        Id:this.data.serviceTranslates[2].id,
        Title:this.createForm.controls["TitleAzerbaijan"].value.trim(),
        Description:this.createForm.controls["DescAzerbaijan"].value.trim(),
        LanguageId:3
      }
    ]
    body.append("Translates",JSON.stringify(CourierTranslates))
    this.service.update(body).subscribe(
      ()=> {
        this.dialogRef.close();
      },
      error => {
        error.error.messages.forEach(e => {
          if (e.lang_id == this.languageService.select.id) {
            alertify.error(e.messageLang);
          }
        })
      }
    )
  }

}

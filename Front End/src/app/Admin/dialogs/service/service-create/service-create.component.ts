import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
declare let alertify:any
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ServiceService} from '../../../../Core/services/Admin/service/service.service';
import {NewsService} from '../../../../Core/services/Admin/news/news.service';
@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss']
})
export class ServiceCreateComponent implements OnInit {
  fileAttr = 'Şəkil seç';
  fileToUpload:File
  @ViewChild('fileInput') fileInput: ElementRef;
  public Editor = ClassicEditor;
  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ServiceCreateComponent>,
    private languageService:LanguagesService,
    private service:ServiceService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      IsActived: new FormControl(false ),
      TitleRussia: new FormControl('', [
        Validators.required,
      ]),
      TitleEnglish: new FormControl('', [
        Validators.required,
      ]),
      TitleAzerbaijan: new FormControl('', [
        Validators.required,
      ]),
      DescRussia: new FormControl('', [
        Validators.required,
      ]),
      DescEnglish: new FormControl('', [
        Validators.required,
      ]),
      DescAzerbaijan: new FormControl('', [
        Validators.required,
      ]),
      FileInput: new FormControl('', [
        Validators.required,
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
    body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    body.append("IsActived",this.createForm.controls["IsActived"].value)
    const Translates= [
      {
        Title:this.createForm.controls["TitleEnglish"].value.trim(),
        Description:this.createForm.controls["DescEnglish"].value.trim(),
        LanguageId:1
      },
      {
        Title:this.createForm.controls["TitleRussia"].value.trim(),
        Description:this.createForm.controls["DescRussia"].value.trim(),
        LanguageId:2
      },
      {
        Title:this.createForm.controls["TitleAzerbaijan"].value.trim(),
        Description:this.createForm.controls["DescAzerbaijan"].value.trim(),
        LanguageId:3
      }
    ]
    body.append("Translates",JSON.stringify(Translates))
    this.service.create(body).subscribe(
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

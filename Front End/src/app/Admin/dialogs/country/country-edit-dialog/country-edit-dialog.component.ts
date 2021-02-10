import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {CountriesService} from '../../../../Core/services/Admin/countries/countries.service';
declare let alertify:any;

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-country-edit-dialog',
  templateUrl: './country-edit-dialog.component.html',
  styleUrls: ['./country-edit-dialog.component.scss']
})
export class CountryEditDialogComponent implements OnInit {

  editForm:FormGroup
  fileAttr = 'Şəkil seç';
  fileAttr2 = 'Şəkil seç';
  fileToUpload:File
  fileToUpload2:File
  public Editor = ClassicEditor;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput2') fileInput2: ElementRef;
  data:any
  constructor(
    public dialogRef: MatDialogRef<CountryEditDialogComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public countryData:any,
    private service:CountriesService
  ) {
  }

  ngOnInit(): void {
    this.data=this.countryData.row
    this.editForm= new FormGroup({
      Name: new FormControl(this.data.name, [
        Validators.required,
      ]),
      Wallet: new FormControl(this.data.wallet, [
        Validators.required,
      ]),
      Value: new FormControl(this.data.value, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      NameEnglish: new FormControl(this.data.noticeTranslate[0].name, [
        Validators.required,
      ]),
      NameRussia: new FormControl(this.data.noticeTranslate[1].name, [
        Validators.required,
      ]),
      NameAzerbaijan: new FormControl(this.data.noticeTranslate[2].name, [
        Validators.required,
      ]),
      IsActived: new FormControl(this.data.isActived ),
      FileInput: new FormControl('', [
      ]),
      FileInput2: new FormControl('', [
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.editForm.controls[control].hasError(error);
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      this.fileAttr = imgFile.target.files[0].name

      this.fileToUpload= <File>imgFile.target.files[0]

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  uploadFileEvt2(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr2 = '';
      this.fileAttr2 = imgFile.target.files[0].name

      this.fileToUpload2= <File>imgFile.target.files[0]

      // Reset if duplicate image uploaded again
      this.fileInput2.nativeElement.value = "";
    } else {
      this.fileAttr2 = 'Choose File';
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
    if(this.fileToUpload2 == undefined){
      body.append("FlagPhoto",null)
    }
    else{
      body.append("FlagPhoto",this.fileToUpload2,this.fileToUpload2.name)
    }
    const NoticeTranlates= [
      {
        Id:this.data.noticeTranslate[0].id,
        Name:this.editForm.controls["NameEnglish"].value.trim(),
        LanguageId:1
      },
      {
        Id:this.data.noticeTranslate[1].id,
        Name:this.editForm.controls["NameRussia"].value.trim(),
        LanguageId:2
      },
      {
        Id:this.data.noticeTranslate[2].id,
        Name:this.editForm.controls["NameAzerbaijan"].value.trim(),
        LanguageId:3
      }
    ]
    body.append("Name",this.editForm.controls["Name"].value.trim())
    body.append("Wallet",this.editForm.controls["Wallet"].value)
    body.append("Value",this.editForm.controls["Value"].value)
    body.append("IsActived",this.editForm.controls["IsActived"].value)
    body.append("id",this.data.id.toString())
    body.append("Notices",JSON.stringify(NoticeTranlates))
    this.service.updateCountry(body).subscribe(
      ()=> {     this.dialogRef.close();
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

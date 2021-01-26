import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CountriesService} from '../../../Core/services/admin/countries/countries.service';
declare let alertify:any;
@Component({
  selector: 'app-country-create-dialog',
  templateUrl: './country-create-dialog.component.html',
  styleUrls: ['./country-create-dialog.component.scss']
})
export class CountryCreateDialogComponent implements OnInit {
  createForm:FormGroup
  fileAttr = 'Choose File';
  fileToUpload:File
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<CountryCreateDialogComponent>,
    private languageService:LanguagesService,
    private service:CountriesService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({

      Name: new FormControl('', [
        Validators.required,
      ]),
      Value: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      IsActived: new FormControl( ),
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
      this.fileAttr = 'Choose File';
    }
  }
  submit(){
    const body = new FormData();
    body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    body.append("Name",this.createForm.controls["Name"].value.trim())
    body.append("Value",this.createForm.controls["Value"].value)
    body.append("IsActived",this.createForm.controls["IsActived"].value)
    this.service.createCountry(body).subscribe(
      ()=> { },
      error => {
        error.error.messages.forEach(e => {
          if (e.lang_id == this.languageService.select.id) {
            alertify.error(e.messageLang);
          }
        })
      }
    )
    this.dialogRef.close();
  }
}

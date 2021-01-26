import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {CountriesService} from '../../../Core/services/admin/countries/countries.service';
import {CountryData} from '../../countries-all/CountryData';
declare let alertify:any;

@Component({
  selector: 'app-country-edit-dialog',
  templateUrl: './country-edit-dialog.component.html',
  styleUrls: ['./country-edit-dialog.component.scss']
})
export class CountryEditDialogComponent implements OnInit {

  editForm:FormGroup
  fileAttr = 'Choose File';
  fileToUpload:File
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<CountryEditDialogComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:CountryData,
    private service:CountriesService
  ) {
  }

  ngOnInit(): void {
    this.editForm= new FormGroup({

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
  submit(){
    const body = new FormData();
    body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    body.append("Name",this.editForm.controls["Name"].value.trim())
    body.append("Value",this.editForm.controls["Value"].value)
    body.append("IsActived",this.editForm.controls["IsActived"].value)
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

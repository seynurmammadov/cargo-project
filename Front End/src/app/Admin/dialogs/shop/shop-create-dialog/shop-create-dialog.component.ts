import {Component,  OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {ShopService} from '../../../../Core/services/Admin/shop/shop.service';
declare let alertify:any
@Component({
  selector: 'app-shop-create-dialog',
  templateUrl: './shop-create-dialog.component.html',
  styleUrls: ['./shop-create-dialog.component.scss']
})
export class ShopCreateDialogComponent implements OnInit {
  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ShopCreateDialogComponent>,
    private languageService:LanguagesService,
    private service:ShopService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({

      IsActived: new FormControl(false ),
      NameRussia: new FormControl('', [
        Validators.required,
      ]),
      NameEnglish: new FormControl('', [
        Validators.required,
      ]),
      NameAzerbaijan: new FormControl('', [
        Validators.required,
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }
  submit(){
    const body = new FormData();
    body.append("IsActived",this.createForm.controls["IsActived"].value)
    const ShopTranslates= [
      {
        Name:this.createForm.controls["NameEnglish"].value.trim(),
        LanguageId:1
      },
      {
        Name:this.createForm.controls["NameRussia"].value.trim(),
        LanguageId:2
      },
      {
        Name:this.createForm.controls["NameAzerbaijan"].value.trim(),
        LanguageId:3
      }
    ]
    body.append("Translates",JSON.stringify(ShopTranslates))
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

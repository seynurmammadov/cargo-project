import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {ShopService} from '../../../../Core/services/Admin/shop/shop.service';
import {Shop} from '../../../../Core/models/Shop';
declare let alertify:any
@Component({
  selector: 'app-shop-update-dialog',
  templateUrl: './shop-update-dialog.component.html',
  styleUrls: ['./shop-update-dialog.component.scss']
})
export class ShopUpdateDialogComponent implements OnInit {

  updateForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ShopUpdateDialogComponent>,
    private languageService:LanguagesService,
    private service:ShopService,
    @Inject(MAT_DIALOG_DATA) public data:Shop,
  ) { }

  ngOnInit(): void {
    this.updateForm= new FormGroup({
      Name: new FormControl(this.data.name, [
        Validators.required,
      ]),
      IsActived: new FormControl(this.data.isActived ),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.updateForm.controls[control].hasError(error);
  }
  submit(){
    const body = new FormData();
    body.append("Name",this.updateForm.controls["Name"].value.trim())
    body.append("IsActived",this.updateForm.controls["IsActived"].value)
    body.append("id",this.data.id.toString())
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

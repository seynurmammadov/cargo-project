import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {ShopLinkService} from '../../../../Core/services/Admin/shop/shop-link.service';
declare let alertify:any
@Component({
  selector: 'app-shop-link-update-dialog',
  templateUrl: './shop-link-update-dialog.component.html',
  styleUrls: ['./shop-link-update-dialog.component.scss']
})
export class ShopLinkUpdateDialogComponent implements OnInit {
  updateForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ShopLinkUpdateDialogComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:ShopLinkService
  ) { }

  ngOnInit(): void {
    this.updateForm= new FormGroup({
      Link: new FormControl(this.data.row.link, [
        Validators.required,
      ])
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.updateForm.controls[control].hasError(error);
  }

  submit(){
    const body = new FormData();
    body.append("Link",this.updateForm.controls["Link"].value.trim())
    body.append("ShopId",this.data.shopId.toString())
    body.append("id",this.data.row.id.toString())
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

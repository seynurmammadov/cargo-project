import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {ShopLinkService} from '../../../../Core/services/Admin/shop/shop-link.service';
declare let alertify:any
@Component({
  selector: 'app-shop-link-create-dialog',
  templateUrl: './shop-link-create-dialog.component.html',
  styleUrls: ['./shop-link-create-dialog.component.scss']
})
export class ShopLinkCreateDialogComponent implements OnInit {


  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ShopLinkCreateDialogComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:number,
    private service:ShopLinkService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      Link: new FormControl('', [
        Validators.required,
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }

  submit(){
    const body = new FormData();
    body.append("Link",this.createForm.controls["Link"].value.trim())
    body.append("ShopID",this.data.toString())
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

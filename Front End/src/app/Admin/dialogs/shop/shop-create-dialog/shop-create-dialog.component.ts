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
      Name: new FormControl('', [
        Validators.required,
      ]),
      IsActived: new FormControl(false ),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }
  submit(){
    const body = new FormData();
    body.append("Name",this.createForm.controls["Name"].value.trim())
    body.append("IsActived",this.createForm.controls["IsActived"].value)

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

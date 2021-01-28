import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {CityService} from '../../../../Core/services/Admin/city/city.service';
import {ProductService} from '../../../../Core/services/Admin/product/product.service';
declare let alertify:any
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {


  UpdateForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    private languageService:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:ProductService
  ) { }

  ngOnInit(): void {
    this.UpdateForm= new FormGroup({

      NameEnglish: new FormControl(this.data.row.productTranslates[0].name, [
        Validators.required,
      ]),
      NameRussia: new FormControl(this.data.row.productTranslates[1].name, [
        Validators.required,
      ]),
      NameAzerbaijan: new FormControl(this.data.row.productTranslates[2].name, [
        Validators.required,
      ]),
      IsActived: new FormControl(this.data.row.isActived ),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.UpdateForm.controls[control].hasError(error);
  }

  submit(){
    const body = {
      id:this.data.row.id,
      IsActived:this.UpdateForm.controls["IsActived"].value,
      ProductTranslates: [
        {
          id:this.data.row.productTranslates[0].id,
          name:this.UpdateForm.controls["NameEnglish"].value.trim(),
          languageId:1
        },
        {
          id:this.data.row.productTranslates[1].id,
          name:this.UpdateForm.controls["NameRussia"].value.trim(),
          languageId:2
        },
        {
          id:this.data.row.productTranslates[2].id,
          name:this.UpdateForm.controls["NameAzerbaijan"].value.trim(),
          languageId:3
        }
      ],
    }
    this.service.updateProduct(body).subscribe(
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

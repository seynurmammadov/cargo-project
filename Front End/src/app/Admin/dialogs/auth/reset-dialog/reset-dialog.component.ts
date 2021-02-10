import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Data} from '../role-dialog/role-dialog.component';
import {UsersService} from '../../../../Core/services/Admin/users/users.service';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
declare let alertify:any;

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.scss']
})
export class ResetDialogComponent implements OnInit {
  resetForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ResetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Data,
    private service:UsersService,
    private languageService:LanguagesService) { }

  ngOnInit(): void {
    this.resetForm= new FormGroup({
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
      ]),
      CheckPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
        RxwebValidators.compare({fieldName:'Password'})
      ])
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.resetForm.controls[control].hasError(error);
  }
  get Password() {
    return this.resetForm.get('Password');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  resetPassword(){
    const body = {
      "Id":this.data.id,
      "Password":this.resetForm.controls['Password'].value.split(' ').join(''),
    }
    this.service.ResetPassword(body).subscribe(
      ()=> {
        alertify.success("Sıfırlandı!");
        this.dialogRef.close();
      },
      error => {
        error.error.messages.forEach(e=>{
          if(e.lang_id==this.languageService.select.id){
            alertify.error(e.messageLang);
          }
        })
      })
  }
}

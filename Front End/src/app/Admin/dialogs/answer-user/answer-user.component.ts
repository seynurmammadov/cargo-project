import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {CourierService} from '../../../Core/services/Admin/courier/courier.service';
import {MessageUser} from '../../../Core/models/MessageUser';
declare let alertify:any
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MessageService} from '../../../Core/services/message/message.service';
@Component({
  selector: 'app-answer-user',
  templateUrl: './answer-user.component.html',
  styleUrls: ['./answer-user.component.scss']
})
export class AnswerUserComponent implements OnInit {
  public Editor = ClassicEditor;
  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<AnswerUserComponent>,
    private languageService:LanguagesService,
    private service:MessageService,
    @Inject(MAT_DIALOG_DATA) public data:MessageUser
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({

      Email: new FormControl(this.data.email, [
        Validators.required,
      ]),
      Subject: new FormControl('', [
        Validators.required,
      ]),
      Message: new FormControl('', [
        Validators.required,
      ])
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }
  submit(){
    const body = new FormData();
    body.append("Email",this.data.email)
    body.append("Subject",this.createForm.controls["Subject"].value)
    body.append("Message",this.createForm.controls["Message"].value)
    body.append("id",this.data.id.toString())


    this.service.send(body).subscribe(
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

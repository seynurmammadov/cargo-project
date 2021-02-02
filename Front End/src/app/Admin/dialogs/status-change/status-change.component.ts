import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {Status} from '../../../Core/models/Status';
import {StatusService} from '../../../Core/services/status/status.service';
declare let alertify:any


@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.scss']
})
export class StatusChangeComponent implements OnInit {

  statementForm:FormGroup
  status:Status[];

  constructor( public dialogRef: MatDialogRef<StatusChangeComponent>,
               private languageService:LanguagesService,
               private service:StatusService,
               @Inject(MAT_DIALOG_DATA) public data:any) {
    this.get();
  }

  ngOnInit(): void {
    this.statementForm= new FormGroup({

      Status: new FormControl(this.data.status.id, [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ])
    })
  }
  get(){
    this.service.get().subscribe((res)=>
      {
        this.status=res;
      }
    )

  }
  public errorHandling = (control: string, error: string) => {
    return this.statementForm.controls[control].hasError(error);
  }


  submit(){
    const body = new FormData();
    body.append("id",this.statementForm.controls["Status"].value)
    body.append("parcelId",this.data.id)

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

import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {FlightService} from '../../../../Core/services/Admin/flight/flight.service';
import {News} from '../../../../Core/models/News';
import {Flight} from '../../../../Core/models/Flight';
declare let alertify:any
@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.scss']
})
export class UpdateFlightComponent implements OnInit {

  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<UpdateFlightComponent>,
    private languageService:LanguagesService,
    private service:FlightService,
    @Inject(MAT_DIALOG_DATA) public data:Flight
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      IsActived: new FormControl(this.data.isActived ),
      From: new FormControl(this.data.from , [
        Validators.required,
      ]),
      To: new FormControl(this.data.to , [
        Validators.required,
      ]),
      LandingDate: new FormControl(this.data.landingDate , [
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
    body.append("From",this.createForm.controls["From"].value)
    body.append("To",this.createForm.controls["To"].value)
    body.append("LandingDate", JSON.stringify(this.createForm.controls["LandingDate"].value).split('"').join(''))
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

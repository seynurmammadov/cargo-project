import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {FlightService} from '../../../../Core/services/Admin/flight/flight.service';
declare let alertify:any
@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.scss']
})
export class CreateFlightComponent implements OnInit {

  createForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<CreateFlightComponent>,
    private languageService:LanguagesService,
    private service:FlightService
  ) { }

  ngOnInit(): void {
    this.createForm= new FormGroup({
      IsActived: new FormControl(false ),
      From: new FormControl('', [
        Validators.required,
      ]),
      To: new FormControl('', [
        Validators.required,
      ]),
      LandingDate: new FormControl('', [
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

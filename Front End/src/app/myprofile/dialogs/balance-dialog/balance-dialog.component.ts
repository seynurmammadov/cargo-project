import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {LanguagesService} from '../../../Core/services/lang/languages.service';
import {BalanceService} from '../../../Core/services/balance/balance.service';
declare let alertify:any


@Component({
  selector: 'app-balance-dialog',
  templateUrl: './balance-dialog.component.html',
  styleUrls: ['./balance-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class BalanceDialogComponent implements OnInit {

  createForm:FormGroup

  constructor( public dialogRef: MatDialogRef<BalanceDialogComponent>,
               private service:BalanceService, private languageService:LanguagesService) {
  }

  ngOnInit(): void {
    this.createForm= new FormGroup({

      Price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }


  submit(){
    const body = new FormData();
    body.append("balance",this.createForm.controls["Price"].value)
    this.service.add(body).subscribe(
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

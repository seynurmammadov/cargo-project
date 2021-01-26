import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-statement-dialog',
  templateUrl: './statement-dialog.component.html',
  styleUrls: ['./statement-dialog.component.scss']
})
export class StatementDialogComponent implements OnInit {
  statementForm:FormGroup
  constructor() {
  }

  ngOnInit(): void {
    this.statementForm= new FormGroup({

      Track: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      Name: new FormControl(
        '', [
          Validators.required
        ]
      ),
      Product: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Count: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      Wallet: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      TextArea: new FormControl('', [
      ]),
      FileInput: new FormControl('', [
        Validators.required,
      ]),
    })
  }
  public errorHandling = (control: string, error: string) => {
    return this.statementForm.controls[control].hasError(error);
  }
  get Track() {
    return this.statementForm.get('Track');
  }
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';


  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  submit(){

  }
}

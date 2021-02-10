import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguagesService} from '../../Core/services/lang/languages.service';
import {DescriptionsService} from '../../Core/services/descriptions/descriptions.service';
declare let alertify:any;
@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  form:FormGroup
  fileAttr = 'Şəkil seç';
  fileAttr2 = 'Şəkil seç';
  fileToUpload:File
  fileToUpload2:File
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInput2') fileInput2: ElementRef;
  data:any
  constructor(
    private languageService:LanguagesService,
    private service:DescriptionsService
  ) {
    this.get()
  }

  ngOnInit(): void {
  }
  loaded:boolean=false
  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }
  get(){
    this.service.getBio().subscribe((res)=>{
      this.data=res[0]

      this.form= new FormGroup({
        PageTitle: new FormControl(this.data.pageTitle, [
          Validators.required,
        ]),
        CallCenter: new FormControl(this.data.callCenter, [
          Validators.required,
        ]),
        ShortDescEng: new FormControl(this.data.shortDescEng, [
          Validators.required,
        ]),
        ShortDescRus: new FormControl(this.data.shortDescRus, [
          Validators.required,
        ]),
        ShortDescAz: new FormControl(this.data.shortDescAz, [
          Validators.required,
        ]),
        SliderTitleEng: new FormControl(this.data.sliderTitleEng, [
          Validators.required,
        ]),
        SliderTitleRus: new FormControl(this.data.sliderTitleRus, [
          Validators.required,
        ]),
        SliderTitleAz: new FormControl(this.data.sliderTitleAz, [
          Validators.required,
        ]),
        FileInput: new FormControl('', [
        ]),
        FileInput2: new FormControl('', [
        ]),
      })
      this.loaded=true

    })
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      this.fileAttr = imgFile.target.files[0].name

      this.fileToUpload= <File>imgFile.target.files[0]

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  uploadFileEvt2(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr2 = '';
      this.fileAttr2 = imgFile.target.files[0].name

      this.fileToUpload2= <File>imgFile.target.files[0]

      // Reset if duplicate image uploaded again
      this.fileInput2.nativeElement.value = "";
    } else {
      this.fileAttr2 = 'Choose File';
    }
  }
  submit(){
    const body = new FormData();
    if(this.fileToUpload == undefined){
      body.append("Photo",null)
    }
    else{
      body.append("Photo",this.fileToUpload,this.fileToUpload.name)
    }
    if(this.fileToUpload2 == undefined){
      body.append("Photo2",null)
    }
    else{
      body.append("Photo2",this.fileToUpload2,this.fileToUpload2.name)
    }
    body.append("PageTitle",this.form.controls["PageTitle"].value.trim())
    body.append("CallCenter",this.form.controls["CallCenter"].value.trim())
    body.append("ShortDescEng",this.form.controls["ShortDescEng"].value.trim())
    body.append("ShortDescRus",this.form.controls["ShortDescRus"].value.trim())
    body.append("ShortDescAz",this.form.controls["ShortDescAz"].value.trim())
    body.append("SliderTitleEng",this.form.controls["SliderTitleEng"].value.trim())
    body.append("SliderTitleRus",this.form.controls["SliderTitleRus"].value.trim())
    body.append("SliderTitleAz",this.form.controls["SliderTitleAz"].value.trim())
    body.append("id",this.data.id.toString())
    this.service.updateBio(body).subscribe(
      ()=> {
        alertify.success("Yeniləndi!");
        this.get()
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
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/bio/${serverPath}`;
  }
}

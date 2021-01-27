import {Component, Inject, OnInit} from '@angular/core';
import {FullPrivateUser} from '../../../Models/FullPrivateUser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Data} from '../role-dialog/role-dialog.component';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {FullBusinessUser} from '../../../Models/FullBusinessUser';
import {UsersService} from '../../../../Core/services/Admin/users/users.service';

@Component({
  selector: 'app-info-business-dialog',
  templateUrl: './info-business-dialog.component.html',
  styleUrls: ['./info-business-dialog.component.scss']
})
export class InfoBusinessDialogComponent implements OnInit {

  customer:FullBusinessUser
  constructor(
    public dialogRef: MatDialogRef<InfoBusinessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Data,
    private service:UsersService,
    private languageService:LanguagesService
  ) {
    this.getUserPrivate()
  }

  ngOnInit(): void {
  }
  loaded:boolean=false
  selectedGender:string=''
  selectedCity:string
  selectedOffice:string
  getUserPrivate(){
    this.service.getUserBusiness(this.data.id).subscribe(res=>{
      this.customer=res;
      res.user.city.cityNameTranslates.forEach(e=>{
        if(e.languageId==this.languageService.select.id){
          this.selectedCity=e.name
        }
      })
      res.user.office.officeNameTranlates.forEach(e=>{
        if(e.languageId==this.languageService.select.id){
          this.selectedOffice=e.name
        }
      })

      this.loaded=true;
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

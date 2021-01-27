import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Data} from '../role-dialog/role-dialog.component';
import {UsersService} from '../../../../Core/services/Admin/users/users.service';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
import {FullPrivateUser} from '../../../Models/FullPrivateUser';
import {HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  customer:FullPrivateUser
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Data,
    private service:UsersService,
    private languageService:LanguagesService
  ) {
    this.getUserPrivate()
  }

  ngOnInit(): void {
  }
  loaded:boolean=false
  selectedCitizenship:string=''
  selectedGender:string=''
  selectedCity:string
  selectedOffice:string
  getUserPrivate(){
    this.service.getUserPrivate(this.data.id).subscribe(res=>{
      this.customer=res;
      this.selectedCitizenship+=res.privateCustomer.citizenshipId
      this.selectedGender+=res.privateCustomer.isMan
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

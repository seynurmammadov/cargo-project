import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {UsersService} from '../../../../Core/services/Admin/users/users.service';
import {LanguagesService} from '../../../../Core/services/lang/languages.service';
declare let alertify:any;

export interface Data {
  str: string[];
  id:string;
}
@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  rolesCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  myuserRoles: string[]= [];
  allRoles: string[]

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Data,
    private service:UsersService,
    private languageService:LanguagesService) {
    this.getRoles();
    data.str.forEach(v=>{
     if(v!="PrivateCustomer"&& v!="BusinessCustomer" &&v!="MainAdmin"){
       this.myuserRoles.push(v)
     }
    })
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {

      this.myuserRoles.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.rolesCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.myuserRoles.indexOf(fruit);

    if (index >= 0) {
      this.myuserRoles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.myuserRoles.find(val=>val==event.option.viewValue)){
      this.myuserRoles.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.rolesCtrl.setValue(null);
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allRoles.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getRoles(){
    this.service.getRoles().subscribe(res=>{
      this.allRoles=res;
      this.filteredRoles = this.rolesCtrl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => role ? this._filter(role) : this.allRoles.slice()));
    })
  }
  addRole(){
    if(this.myuserRoles.length==0 && this.data.str.length==1){
      alertify.error("Rol seçin!")
      return
    }
    const body = {
      "Id":this.data.id,
      "Roles":this.myuserRoles
    }
    this.service.AddRoles(body).subscribe(
      ()=> {
        alertify.success("Dəyişildi!");
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

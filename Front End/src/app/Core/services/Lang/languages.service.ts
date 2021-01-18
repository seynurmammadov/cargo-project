import {Languages} from '../../../navbar/models/languages';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GlobalService} from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService   {
  path:string;
  languages: Languages[]=[];
  selected:string=localStorage.getItem("language");
  select:Languages;
  constructor( public translate: TranslateService, private http:HttpClient, private  global:GlobalService) {
  this.path=global.path+"Language"
    this.getLang().subscribe(res=>{
      res.forEach(r=>{
        r.flagSrc='../../assets/image/navbar/'+r.flagSrc
      })
      this.languages=res;

      this.select=this.languages.find(l=>l.value==this.selected)

      translate.addLangs(['az','ru','en']);

      if(this.selected==null || this.selected=="" ||this.languages.find(x=>x.value==this.selected)==undefined){
        this.selected='az';
        this.SetLanguage('az');
        translate.setDefaultLang(this.selected);
      }

      else{
        translate.setDefaultLang(this.selected);
      }
    });
  }

  SetLanguage(lang):void{
    localStorage.setItem("language",lang);
    this.select=this.languages.find(x=>x.value==lang);
    this.translate.use(lang);
  }

  getLang():Observable<Languages[]>{
   return this.http.get<Languages[]>(this.path)
  }
}

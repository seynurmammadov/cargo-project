import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CountriesService} from '../Core/services/Admin/countries/countries.service';
import {CountryData} from '../Admin/countries-all/CountryData';

@Component({
  selector: 'app-tariffs',
  templateUrl: './tariffs.component.html',
  styleUrls: ['./tariffs.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TariffsComponent implements OnInit {
  countryTariffs:CountryData[]=[]
  constructor(private service:CountriesService) { }
  ngOnInit(): void {
    this.get()
  }
  get(){
    this.service.getWithTariffs().subscribe(res=>{
      this.countryTariffs=res;
    })
  }
  name:string="tarifler"
  bannerSrc:string="../../assets/image/banners/price-banner.jpg";
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44387/Site/images/countries/${serverPath}`;
  }
}

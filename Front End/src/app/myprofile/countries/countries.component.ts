import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  imgFlagUsa:string="../../assets/image/AddressFlags/usa.jpg"
  flagIcon:string="../../assets/image/AddressFlags/usa-icon.png"

  constructor() { }

  ngOnInit(): void {
  }

}

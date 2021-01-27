import {CountryInfoData} from './country-info/CountryInfoData';

export class CountryData{
  id:number
  name: string
  value: number
  isActived: boolean
  image:string
  countryAddressDescriptions:CountryInfoData[]
}

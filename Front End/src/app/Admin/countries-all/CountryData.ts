import {CountryInfoData} from './country-info/CountryInfoData';
import {NoticeTranslates} from './NoticeTranslates';

export class CountryData{
  id:number
  name: string
  value: number
  wallet: string
  isActived: boolean
  image:string
  countryAddressDescriptions:CountryInfoData[]
  noticeTranlates:NoticeTranslates[];
}

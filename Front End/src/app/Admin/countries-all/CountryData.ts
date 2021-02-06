import {CountryInfoData} from './country-info/CountryInfoData';
import {NoticeTranslates} from './NoticeTranslates';
import {Tariff} from '../../Core/models/Tariff';

export class CountryData{
  id:number
  name: string
  value: number
  wallet: string
  isActived: boolean
  image:string
  countryAddressDescriptions:CountryInfoData[]
  tariff:Tariff[]
  noticeTranslate:NoticeTranslates[];
  bgImage:string
}

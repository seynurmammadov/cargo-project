import {City} from '../../Core/models/City';
import {Office} from '../../Core/models/Office';
import {Balance} from './Balance';

export class AppUser{
  camexId:string;
  balance: Balance
  cityId: number;
  city: City;
  address:string;
  officeId: number;
  office: Office;
  image: string;
  createdDate: Date;
  modifiedDate: Date;
  id: string;
  email: string
  phoneNumber: string
}

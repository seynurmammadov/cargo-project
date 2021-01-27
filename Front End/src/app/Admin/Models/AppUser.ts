import {Balance} from './Balance';
import {Office} from '../../Core/models/Office';
import {City} from '../../Core/models/City';

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

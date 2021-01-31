import {Balance} from './Balance';
import {Office} from '../../Core/models/Office';
import {City} from '../../Core/models/City';
import {Cargo} from '../../Core/models/Cargo';
import {Order} from '../../Core/models/Order';
import {Receipt} from '../../Core/models/Receipt';

export class AppUser{
  id: string;
  email: string
  phoneNumber: string
  camexId: number;
  balance: Balance;
  cityId: number;
  city: City;
  address: string;
  officeId: number;
  office: Office;
  image: string;
  cargos: Cargo[];
  orders: Order[];
  receipts: Receipt[];
  createdDate: Date;
  modifiedDate: Date;


}

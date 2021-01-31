import {AppUser} from '../../Admin/Models/AppUser';
import {Country} from './Country';
import {Status} from './Status';
import {Receipt} from './Receipt';

export class Order{
  id: number;
  name: string;
  countryId: number;
  country: Country;
  cargoPrice: number;
  price: number;
  url: string;
  count: number;
  noticeProduct: string;
  notice: string;
  statusId: number;
  status: Status;
  paymentStatus: boolean;
  userId: string;
  user: AppUser;
  receiptId: number;
  receipt: Receipt;
  createdDate: string;
  modifiedDate: string;
  isActived: boolean;
  isDeleted: boolean;
}

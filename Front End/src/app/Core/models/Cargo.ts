import {Office} from './Office';
import {Country} from './Country';
import {AppUser} from '../../Admin/Models/AppUser';
import {Status} from './Status';
import {Product} from './Product';

export class Cargo{
  id: number;
  track: string;
  name: string;
  price: number;
  count: number;
  notice: string;
  image: string;
  trackCamex: string;
  weight: number;
  camexPrice: number;
  officeId: number;
  office: Office;
  statusId: number;
  status: Status;
  productId: number;
  product: Product;
  countryId: number;
  country: Country;
  paymentStatus: boolean;
  userId: string;
  user: AppUser;
  createdDate: string;
  modifiedDate: string;
  isActived: boolean;
  isDeleted: boolean;
}

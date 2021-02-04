import {AppUser} from '../../Admin/Models/AppUser';
import {PrivateCustomer} from '../../Admin/Models/PrivateCustomer';
import {BusinessCustomer} from '../../Admin/Models/BusinessCustomer';

export class UserVM{
  user:AppUser
  privateCustomer:PrivateCustomer
  businessCustomer:BusinessCustomer
}

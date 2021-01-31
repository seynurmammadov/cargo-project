import {AppUser} from '../../Admin/Models/AppUser';

export class Receipt{
  id: number;
  name: string;
  value: number;
  userId: string;
  user: AppUser;
  createdDate: Date;
  isActived: boolean;
}

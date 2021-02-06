import {CourierTranslate} from './CourierTranslate';

export class CourierLocation {
  id: number;
  price: number;
  translates: string;
  isActived: boolean;
  isDeleted: boolean;
  courierTranslates: CourierTranslate[];
}

import {ShopLink} from './ShopLink';
import {ShopTranslate} from './ShopTranslate';

export class Shop {
  id: number;
  name: string;
  shopLinks: ShopLink[];
  shopTranslates:ShopTranslate[];
  isActived:boolean
}

import {PriceList} from './PriceList';

export class Tariff {
  id: number;
  to: string;
  priceLists: PriceList[];
  countryId: number;
}

import {ServiceTranslate} from './ServiceTranslate';

export class Service {
  id: number;
  image: string;
  isActived: boolean;
  isDeleted: boolean;
  serviceTranslates: ServiceTranslate[];
}

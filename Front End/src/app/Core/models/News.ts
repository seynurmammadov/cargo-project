import {NewsTranslate} from './NewsTranslate';

export class News {
  id: number;
  image: string;
  isActived: boolean;
  isDeleted: boolean;
  newsTranslates: NewsTranslate[];
  createdDate: string;
}

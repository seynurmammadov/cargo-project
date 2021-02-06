import {FAQTranslate} from './FAQTranslate';

export class FAQ {
  id: number;
  translates: string;
  isActived: boolean;
  isDeleted: boolean;
  faqTranslates: FAQTranslate[];
}

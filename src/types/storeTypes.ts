export interface storeType {
  name_ar: string;
  name_en: string;
  image: File[];
  featured: boolean;
  status: boolean;
  Link_en: string;
  Link_ar: string;
  description_ar: string;
  description_en: string;
  category: string;
  meta_title_ar: string;
  meta_title_en: string;
  meta_description_en: string;
  meta_description_ar: string;
  meta_keyword_ar: string;
  meta_keyword_en: string;
}
export interface ReceivedStoreType extends Omit<storeType, "image"> {
  id: number;
  image: string;
}

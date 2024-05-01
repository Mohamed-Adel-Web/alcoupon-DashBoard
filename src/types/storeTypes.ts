export interface storeType {
  name_ar: string;
  name_en: string;
  image: File[];
  featured: boolean;
  status: boolean;
  link_en: string;
  link_ar: string;
  description_ar: string;
  description_en: string;
  category_id: number;
  meta_title_ar: string;
  meta_title_en: string;
  meta_description_en: string;
  meta_description_ar: string;
  meta_keyword_ar: string;
  meta_keyword_en: string;
}
export interface Meta {
  meta_title_ar: string;
  meta_title_en: string;
  meta_description_en: string;
  meta_description_ar: string;
  meta_keyword_ar: string;
  meta_keyword_en: string;
}

// Modify ReceivedStoreType to include the Meta interface
export interface ReceivedStoreType
  extends Omit<
    storeType,
    | "image"
    | "meta_title_ar"
    | "meta_title_en"
    | "meta_description_en"
    | "meta_description_ar"
    | "meta_keyword_ar"
    | "meta_keyword_en"
    | "featured"
    | "status"
    | "category_id"
  > {
  id: number;
  image: string;
  meta: Meta;
  featured: string;
  status: string;
  category_id: number[];
}
export interface couponStore
  extends Omit<storeType, "image" | "featured" | "status"> {
  id: number;
  image: string;
  featured: string;
  status: string;
}

export interface Swiper {
  id?: number;
  images: File[];
}
export interface receivedSwiper {
  id?: number;
  images: {
    images: string;
  };
}

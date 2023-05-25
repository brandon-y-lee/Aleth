export type JSON = {
  [key: string]: string | number | boolean | JSON;
};

export enum RoutesEnum {
  FEATURES = '/',
  CONTACT_US = '/connectwithus',
  ALETH_PLATFORM = '/platform',
  PRODUCT_PASSPORT = '/product-passport',
  HOME = '/',
}

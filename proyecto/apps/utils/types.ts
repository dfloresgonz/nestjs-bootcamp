export type Product = {
  id: number; //
  name: string;
  price: number;
  imgUrl: string;
  description: string;
  isOferta: boolean;
  porcentajeOferta: number;
  finalPrice: number; //
};

export type ProductApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
};

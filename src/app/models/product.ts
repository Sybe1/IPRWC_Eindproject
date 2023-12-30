export interface Product{
  id: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  clothingType: {
    id: string
    type?: string
  };
  targetAudience: {
    id: string
    audience?: string
  };
  imageUrl: string;
}

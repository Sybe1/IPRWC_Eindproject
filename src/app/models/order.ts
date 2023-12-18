export interface Order{
  id: number;
  amount: number;
  product: {
    id: number | null;
  };
  user: {
    id: number | null;
  };
}

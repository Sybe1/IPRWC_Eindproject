export interface Order{
  // id: number;
  amount: number;
  product: {
    id: number
  };
  user: {
    username: string;
  };
}

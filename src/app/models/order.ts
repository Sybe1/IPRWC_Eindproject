export interface Order{
  id?: string;
  amount: number;
  product: {
    id: string
  };
  user: {
    username: string;
  };
}

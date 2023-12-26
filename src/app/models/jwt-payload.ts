export interface JwtPayload {
  username: string;
  iat: number;
  exp: number;
  role: [{ authority: string }];
}

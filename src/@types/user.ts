export interface GetUserResponse {
  status: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
}

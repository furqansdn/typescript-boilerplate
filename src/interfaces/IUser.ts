export interface IUser {
  _id: string;
  name: string;
  password?: string;
  email: string;
  role: string;
  photo?: string;

  correctPassword(password: string, thisPassword: string): Promise<boolean>;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}

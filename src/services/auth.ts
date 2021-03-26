import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';

import { IUser, IUserInputDTO } from '../interfaces/IUser';
import config from '../config';
import { BadRequest } from '../utils/AppError';

@Service()
export default class AuthService {
  constructor(@Inject('userModel') private userModel: Models.UserModel) {}

  public async SignUp(
    userInput: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const user = await this.userModel.create(userInput);

      const token = this.generateToken(user);
      user.password = undefined;
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  public async SignIn(
    userInput: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const { email, password } = userInput;
      let user = await this.userModel.findOne({ email }).select('+password');
      if (!user) {
        throw new BadRequest('There is no such user registered');
      }

      if (!(await user.correctPassword(password, user.password))) {
        throw new BadRequest('Incorrect password');
      }

      const token = this.generateToken(user);
      user.password = undefined;
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  private generateToken(user: IUser) {
    return jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expires,
      }
    );
  }
}

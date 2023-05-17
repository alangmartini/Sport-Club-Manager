import EnumError from '../enums/error.enum';
import Users from '../database/models/users.model';
import IUser from '../interfaces/users/IUser.interface';
import * as bcrypt from 'bcryptjs';
import IUserBody from '../interfaces/users/IUserBody.interface';

export default class UserService {
  private userModel = Users;

  async login(userBody: IUserBody): Promise<IUser> {
    const { email, password } = userBody;
    const user = await this.userModel.findOne({ where: { email}});
    
    if (user === null) {
      const error = new Error();
      error.type = EnumError.notFound;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error = new Error;
      error.type = EnumError.unauthorized;
      throw error;
    }

    return user;
  }
}
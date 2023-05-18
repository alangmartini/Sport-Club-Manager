import * as bcrypt from 'bcryptjs';
import Users from '../database/models/users.model';
import IUser from '../interfaces/users/IUser.interface';
import IUserBody from '../interfaces/users/IUserBody.interface';
import BasedError from '../errors/BasedError.class';
import EnumErrorValidation from '../enums/ErrorValidation.enum';

export default class UserService {
  private userModel = Users;

  async login(
    userBody: IUserBody,
  ): Promise<IUser> {
    const { email, password } = userBody;

    const user = await this.userModel.findOne({
      where: { email },
    });

    if (user === null) {
      const error = new BasedError('', EnumErrorValidation.EMAIL_OR_PASSWORD_INVALID);

      throw error;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error = new BasedError('', EnumErrorValidation.EMAIL_OR_PASSWORD_INVALID);

      throw error;
    }

    return user;
  }
}

import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  name: string;
  email: string;
  passwordHash: string;
  role?: Role;
}

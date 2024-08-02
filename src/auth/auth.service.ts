import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    try {
      const existingUser = await this.userService.findOneByEmail(email);

      if (existingUser) {
        if (existingUser.delete_at) {
          throw new BadRequestException('El correo electrónico no se puede utilizar');
        }
        throw new BadRequestException('El usuario ya existe');
      }

      const hashPassword = await bcrypt.hash(password, 10);

      return await this.userService.create({ name, email, passwordHash: hashPassword });
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailWithPass(email);

    if (!user) {
      throw new UnauthorizedException('El email no es correcto');
    }

    const comparePass = await bcrypt.compare(password, user.passwordHash);

    if (!comparePass) {
      throw new UnauthorizedException('La contraseña no es correcta');
    }

    const payload = { email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return { token, email, role: user.role };
  }

  async profile({ email }: { email: string }) {
    return await this.userService.findOneByEmail(email);
  }
}

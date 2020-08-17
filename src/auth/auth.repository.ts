import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { PrismaService } from 'src/persistence/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

function throwInvalidCredentials(): never {
  throw new UnauthorizedException('invalid credentials');
}

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(credentials: AuthCredentialsDTO): Promise<void> {
    try {
      const { email, password } = credentials;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await this.hashPassword(password, salt);

      await this.prisma.user.create({
        data: { email, salt, password: hashedPassword },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(credentials: AuthCredentialsDTO): Promise<string> {
    const { email, password } = credentials;
    const user = await this.prisma.user.findOne({ where: { email } });

    if (!user) throwInvalidCredentials();

    if (await this.checkPassword(user, password)) {
      return user.email;
    } else {
      throwInvalidCredentials();
    }
  }

  async checkPassword(user: User, password: string): Promise<boolean> {
    const hash = await this.hashPassword(password, user.salt);
    return hash === user.password;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

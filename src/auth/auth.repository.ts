import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { PrismaService } from 'src/persistence/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(credentials: AuthCredentialsDTO): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(credentials.password, salt);

    try {
      await this.prisma.user.create({
        data: {
          email: credentials.email,
          password: hashedPassword,
          salt: salt,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

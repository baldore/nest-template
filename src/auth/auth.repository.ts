import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { PrismaService } from 'src/persistence/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(credentials: AuthCredentialsDTO): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          email: credentials.email,
          password: credentials.password,
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
}
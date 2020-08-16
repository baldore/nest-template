import { Injectable } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async signIn(credentials: AuthCredentialsDTO): Promise<void> {
    await this.authRepository.createUser(credentials);
  }
}

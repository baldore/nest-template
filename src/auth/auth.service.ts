import { Injectable } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async signUp(credentials: AuthCredentialsDTO): Promise<void> {
    await this.authRepository.createUser(credentials);
  }

  signIn(credentials: AuthCredentialsDTO): Promise<string> {
    return this.authRepository.validatePassword(credentials);
  }
}

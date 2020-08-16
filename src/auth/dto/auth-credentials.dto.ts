import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthCredentialsDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

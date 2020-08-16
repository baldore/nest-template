import { IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  contents: string;
}

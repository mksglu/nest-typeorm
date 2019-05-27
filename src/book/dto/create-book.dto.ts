import { IsString } from 'class-validator';

export class createBookDto {
  @IsString()
  readonly name: string;
}

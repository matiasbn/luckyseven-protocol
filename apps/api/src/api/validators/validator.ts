import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

export class Value {
  @Transform((value) => parseInt(value))
  @IsNotEmpty()
  readonly value: number;
}

export class Variable {
  @IsNotEmpty()
  readonly variable: string;
}

export class SeedNumber {
  @IsNumberString()
  @IsNotEmpty()
  readonly seed: string;
}

import { IsAlpha, IsDefined, IsNotEmpty, Length, Max } from 'class-validator';
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

export class ShortestPath {
  @Transform((origin) => origin.toUpperCase())
  @IsAlpha()
  @Length(1, 1)
  @IsNotEmpty()
  readonly origin: string;

  @Transform((destination) => destination.toUpperCase())
  @IsAlpha()
  @Length(1, 1)
  @IsNotEmpty()
  readonly destination: string;
}

export class AllPaths {
  @Transform((origin) => origin.toUpperCase())
  @IsAlpha()
  @Length(1, 1)
  @IsNotEmpty()
  readonly origin: string;
}

import { IsArray, isNumber, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHumsterDto {
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
  @IsNumber({},{message: "поле должно быть числом"})
  readonly weight: number;
  @IsNumber({},{message: "поле должно быть числом"})
  readonly age: number;
  @IsArray({message: "поле должно быть массивом"})
  readonly ration: string[]
}


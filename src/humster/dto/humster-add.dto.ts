import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNumber, IsString } from "class-validator";

export class CreateHumsterDto {
  @ApiProperty()
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
  @ApiProperty()
  @IsNumber({},{message: "поле должно быть числом"})
  readonly weight: number;
  @ApiProperty()
  @IsNumber({},{message: "поле должно быть числом"})
  @ApiProperty()
  readonly age: number;
  @ArrayMinSize(1, {message: "Массив должен содержать хотя бы одно значение"})
  @IsArray({message: "поле должно быть массивом"})
  @ApiProperty()
  readonly ration: string[]
}


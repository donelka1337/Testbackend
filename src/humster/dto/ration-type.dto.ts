import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRationTypeDto {
  @ApiProperty()
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
}
  
export class DeleteRationTypeDto {
  @ApiProperty()
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
}
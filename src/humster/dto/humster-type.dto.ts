import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHumsterTypeDto {
  @ApiProperty()
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
}

export class DeleteHumsterTypeDto {
  @ApiProperty()
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
}
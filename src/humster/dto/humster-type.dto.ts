import { IsString } from "class-validator";

export class CreateHumsterTypeDto {
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
}

export class DeleteHumsterTypeDto {
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
}
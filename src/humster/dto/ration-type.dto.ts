import { IsString } from "class-validator";

export class CreateRationTypeDto {
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
}
  
export class DeleteRationTypeDto {
  @IsString({message: "поле должно быть строкой"})
  readonly typeName: string;
}
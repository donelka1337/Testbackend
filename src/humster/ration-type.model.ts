import { ApiProperty } from "@nestjs/swagger";
import { BeforeCreate, BelongsToMany, Column,DataType,Model, Table } from "sequelize-typescript";
import { Humster } from "./humster.model";
import { Ration } from "./ration.model";


interface RationTypeAttrs{
    typeName: string;
}

@Table({tableName: 'rationType'})
export class RationType extends Model<RationType, RationTypeAttrs>{

    @ApiProperty()
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty()
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    typeName: string;

    @BelongsToMany(()=> Humster, () => Ration)
    humsters: Humster[];

    @BeforeCreate
    static makeLowerCase(type: RationType) {
        type.typeName = type.typeName.toLowerCase().trimEnd().trimStart();
    }
}
import { ApiProperty } from "@nestjs/swagger";
import { BeforeCreate, BeforeDestroy, Column,DataType,HasMany,Model, Table } from "sequelize-typescript";
import { Humster } from "./humster.model";


interface HumsterTypeAttrs {
    typeName: string;
}

@Table({tableName: 'humsterType'})
export class HumsterType extends Model<HumsterType, HumsterTypeAttrs> {

    @ApiProperty()
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty()
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    typeName: string;

    @HasMany(()=> Humster)
    humsters: Humster[];

    @BeforeCreate
    static makeLowerCase(type: HumsterType) {
        type.typeName = type.typeName.toLowerCase().trimEnd().trimStart();
    }
}
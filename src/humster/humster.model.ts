import { ApiProperty } from "@nestjs/swagger";
import {BelongsTo, BelongsToMany, Column,DataType,ForeignKey,Model, Table} from "sequelize-typescript";
import { HumsterType } from "./humster-type.model";
import { RationType } from "./ration-type.model";
import { Ration } from "./ration.model";


interface HumsterAttrs{
    typeName: string;
    typeId: number;
    weight: number;
    age: number;
}

@Table({tableName: 'humster'})
export class Humster extends Model<Humster, HumsterAttrs>{

    @ApiProperty()
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ForeignKey(()=>HumsterType)

    @ApiProperty()
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    typeId: number;

    @ApiProperty()
    @Column({type: DataType.REAL, unique: false, allowNull: false})
    weight: number;
    
    @ApiProperty()
    @Column({type: DataType.REAL, unique: false, allowNull: false})
    age: number;

    @BelongsTo(()=>HumsterType)
    humsterType: HumsterType;

    @BelongsToMany(() => RationType, () => Ration)
    ration: Ration[];
}
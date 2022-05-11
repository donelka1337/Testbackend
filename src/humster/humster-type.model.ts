import { Column,DataType,HasMany,Model, Table } from "sequelize-typescript";
import { Humster } from "./humster.model";


interface HumsterTypeAttrs {
    typeName: string;
}

@Table({tableName: 'humsterType'})
export class HumsterType extends Model<HumsterType, HumsterTypeAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    typeName: string;

    @HasMany(()=> Humster)
    humsters: Humster[];
}
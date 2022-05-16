import {Column,DataType,ForeignKey,Model, Table} from "sequelize-typescript";
import { Humster } from "./humster.model";
import { RationType } from "./ration-type.model";





@Table({tableName: 'ration', createdAt: false, updatedAt: false})
export class Ration extends Model<Ration>{

    @ForeignKey(()=>RationType)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    rationId: number;
    
    @ForeignKey(()=>Humster)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    humsterId: string;
}
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HumsterType } from './humster-type.model';
import { RationType } from './ration-type.model';
import { CreateHumsterTypeDto, DeleteHumsterTypeDto } from './dto/humster-type.dto';
import { CreateHumsterDto } from './dto/humster-add.dto';
import { Humster } from './humster.model';

@Injectable()
export class HumsterService {
    constructor(@InjectModel(HumsterType) private humsterTypeRepistory: typeof HumsterType,
    @InjectModel(RationType) private rationTypeRepository: typeof RationType,
    @InjectModel(Humster) private humsterRepository: typeof Humster) {}

    async getAllHumsterType(){
        const types = await this.humsterTypeRepistory.findAll();
        return types;
    }

    async createHumsterType(dto: CreateHumsterTypeDto){
        const type = await this.humsterTypeRepistory.create(dto);
        return type;
    }

    async deleteHumsterType(dto: DeleteHumsterTypeDto){
        const type = await this.humsterTypeRepistory.destroy({
            where: {typeName: dto.typeName.toLowerCase()}
          });
          const message = {};
          if(type == 1) {
              message['statusCode'] = '200'
              message['message'] = 'success'
          } else {
              throw new HttpException('not found', HttpStatus.NOT_FOUND);
          }
          return message;
    }

    async getAllRationType(){
        const rations = await this.rationTypeRepository.findAll();
        return rations;
    }

    async createRationType(dto: CreateHumsterTypeDto){
        const ration = await this.rationTypeRepository.create(dto);
        return ration;
    }

    async deleteRationType(dto: DeleteHumsterTypeDto){
        const type = await this.rationTypeRepository.destroy({
            where: {typeName: dto.typeName.toLowerCase()}
          });
        const message = {};
        if(type == 1) {
            message['statusCode'] = '200'
            message['message'] = 'success'
        } else {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }
        return message;
    }

    async addHumster(dto: CreateHumsterDto){
        const rations = [];
        const lowerCaseRations = dto.ration.map(e => e.toLocaleLowerCase());
        const rationFromDb = await this.rationTypeRepository.findAll({where: {typeName: lowerCaseRations}})
        const type = await this.humsterTypeRepistory.findOne({where: {typeName: dto.typeName.toLowerCase()}})
        if(!type) {
            throw new HttpException('Не найден тип хомяка', HttpStatus.NOT_FOUND)
        }
        rationFromDb.forEach(element => {
            rations.push(element.id);
        });
        if(rations.length === dto.ration.length){
            dto['typeId'] = type.id;
            const humster = await this.humsterRepository.create(dto);
            await humster.$set('ration', rations);
            return dto;
        }else{
            throw new HttpException('Некоторые рационы не были найдены', HttpStatus.NOT_FOUND)
        }
    }

    async getAllHumsters(query){
        const types = await this.humsterRepository.findAll({
            include: [{
                    model: RationType, attributes:['typeName'], through: {attributes: []}
                },{
                    model: HumsterType, attributes:['typeName'],
                }
            ]
        });
        const humsters = []
        const data = {};
        types.forEach(element => {
            data['humsterId'] = element['id'];
            data['weight'] = element['weight'];
            data['age'] = element['age'];
            data['ration'] = []
            element['ration'].forEach(el => {
                data['ration'].push(el['typeName']);
            }); 
            data['type'] = element['humsterType']['typeName'];
            humsters.push(JSON.parse(JSON.stringify(data)));
        });
        if(query.field && query.type) {
            if(!humsters[0][query.field]){
                return humsters;
            }
           
            if(query.type.toLowerCase() == 'asc') {
                humsters.sort((a,b)=>{
                    return((a[query.field] > b[query.field]) ? 1 : 
                          (a[query.field] < b[query.field]) ? -1 : 0)
                });
            }
            if(query.type.toLowerCase() == 'desc') {
                humsters.sort((a,b)=>{
                  return((a[query.field] < b[query.field]) ? 1 : 
                        (a[query.field] > b[query.field]) ? -1 : 0)
                    });
                }
        }
        return humsters;
    }
}

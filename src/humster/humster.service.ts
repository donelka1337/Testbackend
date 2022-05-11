import { Injectable } from '@nestjs/common';
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
        const types = this.humsterTypeRepistory.findAll();
        return types;
    }

    async createHumsterType(dto: CreateHumsterTypeDto){
        const type = this.humsterTypeRepistory.create(dto);
        return type;
    }

    async deleteHumsterType(dto: DeleteHumsterTypeDto){
        const type = this.humsterTypeRepistory.destroy({
            where: {typeName: dto.typeName}
          });
        return type;
    }

    async getAllRationType(){
        const rations = this.rationTypeRepository.findAll();
        return rations;
    }

    async createRationType(dto: CreateHumsterTypeDto){
        console.log(dto);
        const ration = this.rationTypeRepository.create(dto);
        return ration;
    }

    async deleteRationType(dto: DeleteHumsterTypeDto){
        const type = this.rationTypeRepository.destroy({
            where: {typeName: dto.typeName}
          });
        return type;
    }

    async addHumster(dto: CreateHumsterDto){
        const rations =[];
        const test = await this.rationTypeRepository.findAll({where: {typeName: dto.ration}})
        const type = await this.humsterTypeRepistory.findOne({where: {typeName: dto.typeName}})
        test.forEach(element => {
            rations.push(element.id);
        });
        if(rations.length === dto.ration.length){
            dto['typeId'] = type.id;
            const humster = await this.humsterRepository.create(dto);
            await humster.$set('ration', rations);
            console.log(humster)
            return dto;
        }else{
            console.log('неуспех')
        }
    }

    async getAllHumsters(query){
        const types = await this.humsterRepository.findAll({
            logging: console.log,
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
                console.log('возврат');
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

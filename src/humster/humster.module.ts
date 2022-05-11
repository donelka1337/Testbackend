import { Module } from '@nestjs/common';
import { HumsterService } from './humster.service';
import { HumsterController } from './humster.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HumsterType } from './humster-type.model';
import { RationType } from './ration-type.model';
import { Ration } from './ration.model';
import { Humster } from './humster.model';

@Module({
  providers: [HumsterService],
  controllers: [HumsterController],
  imports:[SequelizeModule.forFeature([HumsterType, RationType, Ration,Humster])],
})
export class HumsterModule {}

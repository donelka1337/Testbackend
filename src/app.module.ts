import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HumsterModule } from './humster/humster.module';



@Module({
  controllers:[],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'backend',
      models: [],
      autoLoadModels:true
    }),
    HumsterModule,
  ],
})
export class AppModule {}

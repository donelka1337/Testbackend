import { Body, Controller, Delete, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CreateHumsterDto } from './dto/humster-add.dto';
import { CreateHumsterTypeDto, DeleteHumsterTypeDto } from './dto/humster-type.dto';
import { HumsterService } from './humster.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateRationTypeDto, DeleteRationTypeDto } from './dto/ration-type.dto';
import { RationType } from './ration-type.model';
import { HumsterType } from './humster-type.model';

@Controller('humster')
export class HumsterController {

    constructor(private humsterService : HumsterService){}
    
    @ApiResponse({
        status: 200,
        description: "Получение всех типов хомяков",
        type: [HumsterType]
    })
    @Get('/humstertypes')
    getHumsterTypes() {
        return this.humsterService.getAllHumsterType();
    }

    @ApiBody({type: CreateHumsterTypeDto})
    @UsePipes(ValidationPipe)
    @ApiResponse({
        status: 201,
        description: "Создание типа хомяков",
        type: HumsterType
    })
    @Post('/humstertypes')
    addHumsterType(@Body() HumsterTypeDto: CreateHumsterTypeDto){
        return this.humsterService.createHumsterType(HumsterTypeDto);
    }
    
    @ApiBody({type: DeleteHumsterTypeDto})
    @ApiResponse({
        status: 200,
        description: "Удаление типа хомяков"
    })
    @ApiResponse({
        status: 404,
        description: "Тип хомяка не был найден"
    })
    @UsePipes(ValidationPipe)
    @Delete('/humstertypes')
    deleteHumsterType(@Body() HumsterTypeDto: DeleteHumsterTypeDto){
        return this.humsterService.deleteHumsterType(HumsterTypeDto);
    }

    @ApiResponse({
        status: 200,
        description: "Получение всего рациона хомяков",
        type: [RationType]
    })
    @Get('/rationtypes')
    getRationTypes() {
        return this.humsterService.getAllRationType();
    }

    @ApiResponse({
        status: 201,
        description: "Создание рациона",
        type: RationType
    })
    @ApiBody({type: CreateRationTypeDto})
    @UsePipes(ValidationPipe)
    @Post('/rationtypes')
    addRationType(@Body() rationTypeDto: CreateRationTypeDto){
        return this.humsterService.createRationType(rationTypeDto);
    }
    
    @ApiResponse({
        status: 200,
        description: "Удаление рациона"
    })
    @ApiResponse({
        status: 404,
        description: "Рацион не был найден"
    })
    @ApiBody({type: DeleteRationTypeDto})
    @UsePipes(ValidationPipe)
    @Delete('/rationtypes')
    deleteRationType(@Body() rationTypeDto: DeleteRationTypeDto){
        return this.humsterService.deleteRationType(rationTypeDto);
    }

    @ApiQuery({name: 'type',required: false,description:"направление сортировки: принимает на вход asc или desc"})
    @ApiQuery({name: 'field',required: false,description:"Поле по которому будет идти сортировка"})
    @ApiResponse({
        status: 200,
        description: "Получение всех хомяков"
    })
    @Get('/')
    getHumsters(@Query() query) {
        return this.humsterService.getAllHumsters(query);
        
    }

    @ApiBody({type: CreateHumsterDto})
    @UsePipes(ValidationPipe)
    @Post('/')
    addHumster(@Body() HumsterDto: CreateHumsterDto){
        return this.humsterService.addHumster(HumsterDto);
    }
}

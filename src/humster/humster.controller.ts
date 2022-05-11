import { Body, Controller, Delete, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CreateHumsterDto } from './dto/humster-add.dto';
import { CreateHumsterTypeDto, DeleteHumsterTypeDto } from './dto/humster-type.dto';
import { HumsterService } from './humster.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('humster')
export class HumsterController {

    constructor(private humsterService : HumsterService){}

    @Get('/humstertypes')
    getHumsterTypes() {
        return this.humsterService.getAllHumsterType();
    }

    @UsePipes(ValidationPipe)
    @Post('/humstertypes')
    addHumsterType(@Body() HumsterTypeDto: CreateHumsterTypeDto){
        return this.humsterService.createHumsterType(HumsterTypeDto);
    }

    @UsePipes(ValidationPipe)
    @Delete('/humstertypes')
    deleteHumsterType(@Body() HumsterTypeDto: DeleteHumsterTypeDto){
        return this.humsterService.deleteHumsterType(HumsterTypeDto);
    }

    @Get('/rationtypes')
    getRationTypes() {
        return this.humsterService.getAllRationType();
    }

    @UsePipes(ValidationPipe)
    @Post('/rationtypes')
    addRationType(@Body() HumsterTypeDto: CreateHumsterTypeDto){
        return this.humsterService.createRationType(HumsterTypeDto);
    }
    
    @UsePipes(ValidationPipe)
    @Delete('/rationtypes')
    deleteRationType(@Body() HumsterTypeDto: DeleteHumsterTypeDto){
        return this.humsterService.deleteRationType(HumsterTypeDto);
    }

    @Get('/?')
    getHumsters(@Query() query) {
        return this.humsterService.getAllHumsters(query);
        
    }

    @UsePipes(ValidationPipe)
    @Post('/')
    addHumster(@Body() HumsterDto: CreateHumsterDto){
        return this.humsterService.addHumster(HumsterDto);
    }
}

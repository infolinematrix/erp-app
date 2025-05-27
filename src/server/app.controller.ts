
import { Controller, Get, Logger, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { KnexService } from './services/knex.service';


@Controller('/')
export class AppController {

  // constructor(private readonly knexService: KnexService) { }


  // @Get('health')
  // health() {
  //   return { status: 'ok' };
  // }

  // @Get('centers')
  // async getCenter(): Promise<any> {
  //   const result = await this.knexService.db('center_master').select('id', 'name as title', 'phone', 'dise_code').limit(50).offset(0);
  //   if (!result) throw new NotFoundException(`No record found`);

  //   return result;
  // }

}

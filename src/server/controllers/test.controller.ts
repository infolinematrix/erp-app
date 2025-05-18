import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Remult } from 'remult';
import { AuthService } from '../services/auth.service';
import { BackendMethod } from 'remult';

@Controller('test')
@ApiTags('Test')
export class TestController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('test1')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin@admin.com' },
        password: { type: 'string', example: 'admin@123' },
        center_code: { type: 'string', example: 'MAIN' },
      },
    },
  })
  async signIn(
    @Body() body: { username: string; password: string; center_code?: string }
  ) {
    
    try {
        // return await this.authService.login(body.username, body.password, body.center_code);
    } catch (error) {
        throw error
    }

  };
}
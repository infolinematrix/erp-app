
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

  



  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login to get access and refresh tokens' })
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            username: { type: 'string', example: 'admin@admin.com' },
            password: { type: 'string', example: 'admin@123' },
          },
        },
      })
    @Post('login')
    async login(@Body() body: any) {
      
        console.log("Received body:", body);
        
      const resp = await this.authService.signIn(body.username!, body.password!); 
      return resp;
      
    //   return this.authService.signIn(body.username, body.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req:any) {
      return req.user;
    }
  }
  
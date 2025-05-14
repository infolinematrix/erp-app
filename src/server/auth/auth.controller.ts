import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
// import * as bcrypt from 'bcryptjs';
import bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { remult, repo, UserInfo, withRemult } from 'remult';
import { User } from '../../shared/User.entity';

// export interface UserInfo {
//   id: string;
//   name?: string;
//   roles?: string[];
//   permissions?: string[];
//   center_code: string;
// }

@ApiTags('Auth')
@Controller('api/auth/signin')
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
    // console.log('Received body:', body);

    withRemult(async () => {
      const user = await repo(User).findFirst({
        username: body.username,
      });

      // console.log('----------------', user);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password
      );

      if (isPasswordValid) {
        remult.user = <UserInfo | undefined>{
          id: user.id.toString(),
          name: user.name,
          roles: [],
          permissions: [],
          center_code: 'MAIN',
        };
        console.log(remult.user);
        
      }else{
        throw new UnauthorizedException('Invalid credentials');
      };
    });

    // this.authService.signIn(body.username, body.password);
    // const resp = await this.authService.signIn(body.username!, body.password!);
    // return resp;

    //   return this.authService.signIn(body.username, body.password);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req:any) {
  //   return req.user;
  // }
}

import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Remult } from 'remult';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  @Post('sign-in')
  @ApiOperation({ summary: 'Login to get access and refresh tokens' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin@admin.com' },
        password: { type: 'string', example: 'admin@123' },
        // center_code: { type: 'string', example: 'MAIN' },
      },
    },
  })
  async signIn(
    @Body() body: { username: string; password: string },
    remult: Remult
  ) {
    if (body.username === 'admin@admin.com' && body.password === 'admin@123') {
    //   remult.authToken = 'your-jwt-token';
      return {
        access_token: 'your-jwt-token', // Usually generated via JWT service
        user: {
          username: body.username,
        },
      };
    }
    throw new Error('Invalid credentials');
  }

  @Post('sign-out')
  async signOut(remult: Remult) {
    // remult.authToken = undefined;
    return { success: true };
  }
}
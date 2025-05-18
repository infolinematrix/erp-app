import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BackendMethod, Remult } from 'remult';
import { AuthService } from '../services/auth.service';

@Controller('test')
@ApiTags('Auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}






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

  @BackendMethod({ allowed: true })
  async signIn(
    @Body() body: { username: string; password: string }) {
    try {
      console.log("body", body.username, body.password)
      return await this.authService.login(body);
      
    } catch (error) {
      throw error;
    }
  }

  @Post('sign-out')
  async signOut(remult: Remult) {
    // remult.authToken = undefined;
    return { success: true };
  }
}
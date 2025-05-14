
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from './modules/config.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';


@Module({
    
    imports:[
        AuthModule, 
        UsersModule,
    ],
    providers:[ConfigService, AuthService],
    controllers: [AuthController]
})
export class AppModule {}
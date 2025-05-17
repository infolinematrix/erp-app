
import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller';


@Module({
    
    // imports:[
    //     AuthModule, 
    //     UsersModule,
    // ],
    // providers:[ConfigService, AuthService],
    controllers: [AuthController]
})
export class AppModule {}
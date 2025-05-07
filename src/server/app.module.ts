import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
    imports:[AuthModule, UsersModule],
    providers:[ConfigService]
})
export class AppModule {}
import { NgModule } from '@angular/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthInterceptor } from './auth.interceptor';

import {
    HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule, AngularSvgIconModule.forRoot(),
    
],
  providers: [
    
    
  ],
})
export class AuthModule {}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { toast } from 'ngx-sonner';
import { remult } from 'remult';
import { AuthService } from '../../../../core/services/auth.service';
import { SessionService } from '../../../../core/services/session.service';
import { AuthController } from '../../../../../shared/controllers/AuthController';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    ButtonComponent,
  ],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _sessionService: SessionService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

 
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['admin@admin.com', [Validators.required, Validators.email]],
      password: ['admin@123', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  async onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      return;
    }
    try {
      // debugger;
      // const loginResponse = await AuthController.signIn(email, password);
      // console.log('----------------------', loginResponse);

      // const uruser = remult.user;
      // console.log('----------------------', uruser);
      // if(loginResponse){

      // }
      //  this.router.navigate(['/dashboard']);

      const user = await AuthController.signIn(email, password);
      if(user){
        const sessionData = {
          loggedIn: true,
          center_code: 'MAIN',
          user: user,
          permissions: user.permissions,
          roles: user.roles
        };
        console.log('Final user session...', sessionData);
        this.authService.setCurrentUser(user);
        // this.authService.setToken(user.id);
        
        this.router.navigate(['/dashboard']);
      }
      
      // this.authService.login({ username: email, password:password } ).subscribe({
      //   next: (response) => {
      //     this.authService.setToken(response.access_token);
      //     this.authService.setCurrentUser({
      //       username: email,
      //     });
          
      //     this.router.navigate(['/']);
      //   },
      //   error: (error:any) => {
      //     // this.errorMessage = 'Invalid credentials';
      //     toast.error('Login error:', error.message);
      //   },
      // });
    } catch (error: any) {
      toast.error(error.message);
    }
    //--Check Login Password here------
    // try {
    //   const user = await AuthController.signIn(email, password);

    //   // this._router.navigate(['/dashboard']);

    //   if(user! ){
    //     // const who=await AuthController.whoAmI();

    //     const sessionData = {
    //       loggedIn: true,
    //       center_code: 'MAIN',
    //       user: user,
    //     };
    //     console.log('Final user session...', sessionData);
    //     // this._sessionService.setSession(sessionData, 60000);

    //   }

    // } catch (error:any) {
    //   toast.error(error.message)
    // }
  }
}

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
import { AuthService } from '../../../../core/services/auth.service';
import { AuthController } from '../../../../../shared/controllers/AuthController';
import { remult } from 'remult';

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
      
      const user = await AuthController.signIn(email, password);
      
      if(user!==null){
        
        const sessionData = {
          loggedIn: true,
          center_code: 'MAIN',
          user: user,
        };
        console.log('Final user session...', sessionData);
        this.authService.setCurrentUser(user);
        this.router.navigate(['/dashboard']);
      }
     
    } catch (error: any) {
      toast.error(error.message);
    }
    
  }
}

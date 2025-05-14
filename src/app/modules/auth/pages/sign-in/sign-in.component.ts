import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthController } from 'src/shared/controllers/AuthController';
import { toast } from 'ngx-sonner';
import { remult } from 'remult';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass,  ButtonComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router,
    private readonly _sessionService: SessionService

  ) {}

  onClick() {
    console.log('Button clicked');
  }

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

    // console.log("--------------",email,password);
    

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //--Check Login Password here------
    try {
      const user = await AuthController.signIn(email, password);

      // this._router.navigate(['/dashboard']);

     
      if(user! ){
        // const who=await AuthController.whoAmI();
        
        const sessionData = {
          loggedIn: true,
          center_code: 'MAIN',
          user: user,
        };
        console.log('Final user session...', sessionData);
        this._sessionService.setSession(sessionData, 60000);
        
        
        
      }
      
    
    } catch (error:any) {
      toast.error(error.message)
    }
    
  }
}

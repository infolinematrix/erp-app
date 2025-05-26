import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from '../../core/services/auth.service';
import { remult } from 'remult';
import { CenterMaster } from '../../../shared/CenterMaster.entity';
import { humanize, sluggyfy } from '../../core/utils/humanize-slug.utils';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-setup',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    // RouterLink,
    AngularSvgIconModule,
    // NgClass,
    ButtonComponent,
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css',
})
export class SetupComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this._formBuilder.group({
      organization_name: ['Organization Name', Validators.required],
      email: ['admin@admin.com', [Validators.required, Validators.email]],
      phone: ['+919832893116', Validators.required],
      address: ['Hakimpara, Word no: 16', Validators.required],
      city: ['Siliguri', Validators.required],
      country: ['India', Validators.required],
      center_code: ['MAIN', Validators.required],
    });

   
    //--If active Center found.. 
    if(await this.hasCenter()){
      this.router.navigate(['/sign-in']);
    }
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    try {
      this.submitted = true;
      const { organization_name, phone, address, city, country, email } =
        this.form.value;

      if (this.form.invalid) {
        toast.error('Invalid!');
        return;
      }
      const centerRepo = remult.repo(CenterMaster);
      const center_code = sluggyfy(organization_name, true);
      await centerRepo.insert({
        name: organization_name,
        address: address,
        center_code: center_code,
        email: email,
        phone: phone,
        city: city,
        country: country,
        prefix: 'MAIN',
      });

      toast.success('Setup completed successfully. Redirecting ...');
      setTimeout(() => {
        this.router.navigate(['/sign-in']);
      }, 1000); // give a short delay so user sees the toast
    } catch (error: any) {
      toast.error(error.message);
    }
  }


  async hasCenter(){
    try {
      const data =  await remult.repo(CenterMaster).find({where:{is_active: 1}});
      return data.length > 0;
    } catch (error:any) {
      toast.error(error.message);
      return false;
    }
  }
}

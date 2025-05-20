import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { Location } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { Remult, remult } from 'remult';

import { EmployeeQualificationComponent } from '../components/employee-qualification/employee-qualification.component';

import { toast } from 'ngx-sonner';
import { log } from 'console';
import { EmployeeSettingsComponent } from '../components/employee-settings/employee-settings.component';
import { PickupSelectComponent } from '../../../../../shared/components/pickup-select/pickup-select.component';
import { Employee } from '../../../../../../shared/Employee.entity';
import { User } from '../../../../../../shared/User.entity';


@Component({
  selector: 'app-update-employee',
  imports: [
    DatePickerModule,
    InputGroupModule,
    MenubarModule,
    PanelModule,
    TreeModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    // Dialog,
    FieldsetModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    TextareaModule,
    SelectModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    KeyFilterModule,
    MessageModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    //--
    PickupSelectComponent,
    EmployeeQualificationComponent, EmployeeSettingsComponent
  ],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  employee?: Employee = new Employee();
  userId?: number;
  form!: FormGroup;

  ngOnInit() {
    this.loadData();

    this.form = this.formBuilder.group({
      title: [0, Validators.required],
      name: ['', Validators.required],
      gender: [0, Validators.required],
      dob: [null, Validators.required],
      marital_status: [0, Validators.required],
      city: [''],
      state: [''],
      country: [''],
      contact_no: [''],
      employee_type: [''],
      address: [''],
      nationality: [''],
      religion: [0],
      department: [0],
      designation: [''],
      joining_date: [null],
      leaving_date: [null],
      emmergency: [''],
      email: ['', Validators.email],
      user_id: [0, Validators.required],
    });

    this.form.valueChanges.subscribe((value) => {
      console.log('Employe  Changed :', value);
    });
  }

  async loadData() {
    try {
      this.userId = Number(this.activeRoute.snapshot.paramMap.get('id'));
      const userExist = await remult.repo(User).findId(this.userId);
      if(!userExist){
        toast.error('Invalid user');
        this.router.navigate(['/not-found']);
        return;
      }

      const employee = await remult
        .repo(Employee)
        .findFirst({ user_id: this.userId });


      if (employee) {
        this.employee = employee;
        this.form.patchValue(this.employee);
        console.log("FORM",this.form.value);
        
      } else {
        this.employee = new Employee();
        this.form.patchValue(this.employee);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async save() {
    // console.log(this.form.value);
    if (this.form.invalid) {
      // Loop through form controls and log the invalid ones
      Object.keys(this.form.controls).forEach((controlName) => {
        const control = this.form.get(controlName);
        if (control && control.invalid) {
          toast.error(`Invalid: ${controlName}`);
        }
      });
      return;
    }

    const formData = this.form.value;


    
    try {
      const existingEmployee = await remult.repo(Employee).findFirst({user_id: this.userId!});

      if (existingEmployee) {
        formData.id = existingEmployee.id;
        await remult.repo(Employee).save(formData);
        
       
      } else {
        formData.user_id = this.userId!;
        await remult
          .repo(Employee)
          .insert(formData);
        toast.success(
          `Employee with User ID ${this.userId!} created successfully.`
        );
        // this.form.reset();
        
      }

      //--Update user name
      
        const user = await remult.repo(User).findId(this.userId!);
        if (user) {
          await remult.repo(User).update(user.id, { name: formData.name });
        } 

         toast.success(
          `Employee with User ID ${this.userId!} updated successfully.`
        );

      
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
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
import { remult } from 'remult';

import { Employee, User } from 'src/shared';
import { EmployeeQualificationComponent } from '../components/employee-qualification/employee-qualification.component';

import { PickupSelectComponent } from 'src/app/shared/components/pickup-select/pickup-select.component';
import { toast } from 'ngx-sonner';

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
    EmployeeQualificationComponent,
  ],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  employee?: Employee = new Employee();
  userId?: number;
  form!: FormGroup;

  ngOnInit() {
    this.loadData();

    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      marital_status: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      contact_no: ['', [Validators.required]],
      employee_type: ['', [Validators.required]],
      address: ['', [Validators.required]],
      nationality: [''],
      religion: [''],

      department: [''],
      designation: [''],
      joining_date: [''],
      leaving_date: [''],

      emmergency: [''],

      email: ['',[Validators.email]],
      user_id: ['', [Validators.required]],
    });

    this.form.valueChanges.subscribe((value) => {
      console.log('Employe  Changed :', value);
    });
  }

  async loadData() {
    this.userId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    const employee = await remult.repo(Employee).findFirst({ user_id: this.userId! });

    if (employee) {
      this.employee = employee;
      this.form.patchValue(this.employee);
    } else {
      this.employee = new Employee();
      this.form.patchValue(this.employee);
    }
    // console.log(this.employee);
  }

  async save() {
    console.log(this.form.value);
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
    debugger
    try {
      const existingEmployee = await remult.repo(Employee).findFirst({
        user_id: this.userId!,
      });

      if (existingEmployee) {
        await remult.repo(Employee).save({ ...existingEmployee, ...formData });
        toast.success(
          `Employee with User ID ${this.userId!} updated successfully.`
        );
      } else {
        await remult.repo(Employee).insert({...formData, user_id: this.userId!});
        toast.success(
          `Employee with User ID ${this.userId!} created successfully.`
        );
        // this.form.reset();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

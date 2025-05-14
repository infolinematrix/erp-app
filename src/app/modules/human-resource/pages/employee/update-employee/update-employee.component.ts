import { NgClass, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
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
import { SidebarComponent } from 'src/app/modules/accounts/sidebar/sidebar.component';
import { Employee } from 'src/shared';
import { EmployeeQualificationComponent } from '../components/employee-qualification/employee-qualification.component';
import { EmployeeAdvanceComponent } from '../components/employee-advance/employee-advance.component';
import { EmployeeBankComponent } from '../components/employee-bank/employee-bank.component';
import { EmployeeInsuranceComponent } from '../components/employee-insurance/employee-insurance.component';
import { EmployeeLeaveComponent } from '../components/employee-leave/employee-leave.component';
import { EmployeeSalaryComponent } from '../components/employee-salary/employee-salary.component';
import { PickupSelectComponent } from 'src/app/shared/components/pickup-select/pickup-select.component';

@Component({
  selector: 'app-update-employee',
  imports: [
    NgClass,
    SidebarComponent,
    RouterLink,
    DatePipe,
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
    RouterOutlet,
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
    EmployeeAdvanceComponent, EmployeeBankComponent, EmployeeInsuranceComponent, EmployeeLeaveComponent, EmployeeSalaryComponent
  ],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],

})
export class UpdateEmployeeComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  
  ) {}

  employee?: Employee = new Employee();
  form! : FormGroup

  ngOnInit() {
    this.loadData();

    this.form = this.formBuilder.group({
      title:['', [Validators.required]],
      name:['Amit Sharma', [Validators.required]],
      gender:['', [Validators.required]],
      nationality:[''],
      dob:['', [Validators.required]],
      marital_status:['', [Validators.required]],
      religion:[''],
      employee_type:[''],
      phone:['', [Validators.required]],
      emmergency:[''],
      city:[''],
      address:[''],
      email:[''],
    });

    this.form.valueChanges.subscribe(value => {
     
      console.log('Employe  Changed :', value);
     
    });
  }

  async loadData() {
    const useId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    const data = await remult.repo(Employee).findFirst({ user_id: useId! });

    if(data){
      this.employee = data;
      console.log(data);
      
      this.form.patchValue(this.employee);
      console.log("Pre Form", this.form.value);
      // this.form.patchValue({
      //   genger: '14'
      // })
      
    }else{
      this.employee = new Employee();
      this.form.patchValue(this.employee);
    }

    console.log(this.employee);
  }

  save(){
    console.log(this.form.value);
  
  }
}

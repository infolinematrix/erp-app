
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';

import { PickupSelectComponent } from 'src/app/shared/components/pickup-select/pickup-select.component';
import { EmployeeAdvanceComponent } from '../employee-advance/employee-advance.component';
import { EmployeeBankComponent } from '../employee-bank/employee-bank.component';
import { EmployeeLeaveComponent } from '../employee-leave/employee-leave.component';
import { EmployeeQualificationComponent } from '../employee-qualification/employee-qualification.component';
import { EmployeeSalaryComponent } from '../employee-salary/employee-salary.component';
import { PickupService } from 'src/app/core/services/pickup.service';

@Component({
  selector: 'app-employee-insurance',
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
    ConfirmPopupModule
],
  templateUrl: './employee-insurance.component.html',
  styleUrls: ['./employee-insurance.component.css']
})
export class EmployeeInsuranceComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private pickupService: PickupService,
  ) { }

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      qualification: ['', [Validators.required]],
      institute: ['', [Validators.required]],
      year_of_passing: ['', [Validators.required]],
    })
  }

}

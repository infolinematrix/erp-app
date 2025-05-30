import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Router } from 'express';
import { PickupService } from '../../../../../../core/services/pickup.service';
import { EmployeeService } from '../../../../services/employee.service';
import { toast } from 'ngx-sonner';
import { AngularSvgIconModule } from 'angular-svg-icon';
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
import { remult } from 'remult';
import { Employee } from '../../../../../../../shared/Employee.entity';
import { User } from '../../../../../../../shared/User.entity';
import { EmployeeLeave } from '../../../../../../../shared/EmployeeLeave.entity';
import { EmployeeBank } from '../../../../../../../shared/EmployeeBank.entity';

@Component({
  selector: 'app-employee-bank',
  templateUrl: './employee-bank.component.html',
  styleUrls: ['./employee-bank.component.css'],
  imports: [
    ReactiveFormsModule,
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

    KeyFilterModule,
    MessageModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
  ],
})
export class EmployeeBankComponent implements OnInit {
  bankForm!: FormGroup;
  employee?: Employee;
  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {
    this.bankForm = this.formBuilder.group({
      bank_name: ['State Bank of India', [Validators.required]],
      branch_name: ['Siliguri Branch', [Validators.required]],
      account_no: ['1234567890', [Validators.required]],
      ifsc_code: ['SBIN645', [Validators.required]],
      account_type: ['Savings', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      const userId = Number(this.activeRoute.snapshot.paramMap.get('id'));
      if (isNaN(userId)) {
        toast.error('Invalid User ID.');
        return;
      }
      const user = await remult.repo(User).findId(userId);
      this.employee = await remult.repo(Employee).findFirst({ user: user! });

      const bankDetails = await remult.repo(EmployeeLeave).findFirst({
        employee: this.employee, 
      });
      if (bankDetails) {
        this.bankForm.patchValue(bankDetails);
      }

    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async saveBank() {
    if (this.bankForm.invalid) {
      toast.error('Please fill all required bank details.');
      return;
    }
    const formData = this.bankForm.value;
    try {
      const employeeBankRepo = remult.repo(EmployeeBank);
      let existingBankDetails = await employeeBankRepo.findFirst({ employee: this.employee });

      if (existingBankDetails) {
        await employeeBankRepo.update(existingBankDetails.id, formData);
        toast.success('Bank details updated successfully.');
      } else {
        await employeeBankRepo.insert({ ...formData, employee: this.employee });
        toast.success('Bank details saved successfully.');
      }

    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

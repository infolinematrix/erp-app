import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { remult, Validators } from 'remult';
import { PickupService } from '../../../../../../core/services/pickup.service';
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
import { toast } from 'ngx-sonner';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { EmployeeLeave } from '../../../../../../../shared/EmployeeLeave.entity';
import { Employee } from '../../../../../../../shared/Employee.entity';
import { User } from '../../../../../../../shared/User.entity';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
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
export class EmployeeLeaveComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private pickupService: PickupService
  ) {}

  leaveForm!: FormGroup;

  ngOnInit() {
    this.leaveForm = this.formBuilder.group({
      paternity: [1,[Validators.required]],
      sick: [1,[Validators.required]],
      casual: [1,[Validators.required]],
      maternity: [1,[Validators.required]],
      bereavement: [1,[Validators.required]],
    });

    this.loadData();
  }


async loadData(){
    const userId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (isNaN(userId)) {
      toast.error('Invalid User ID in route parameters.');
      return;
    }

    try {
      const user = await remult.repo(User).findId(userId);
      if (!user) {
        toast.error('User not found.');
        return;
      }

      const employee = await remult.repo(Employee).findFirst({ user: user! });
      if (!employee) {
        toast.info('No employee record found for this user. New leave allowances can be created.');
        return;
      }

      const employeeLeaveRepo = remult.repo(EmployeeLeave);
      const existingLeaveData = await employeeLeaveRepo.findFirst({ employee: { $id: employee.id } });

      if (existingLeaveData) {
        this.leaveForm.patchValue({
          paternity: existingLeaveData.paternity,
          sick: existingLeaveData.sick,
          casual: existingLeaveData.casual,
          maternity: existingLeaveData.maternity,
          bereavement: existingLeaveData.bereavement,
        });
        
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error('Error loading employee leave data:', error);
      toast.error(`Failed to load leave data: ${error.message}`);
    }
  }

  async saveLeave() {

    const userId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    const user = await remult.repo(User).findId(userId);
    const employee = await remult.repo(Employee).findFirst({
      user: user!,
    });

    if (!this.leaveForm.valid || !employee) {
      toast.error('Invalid form or employee not found!');
      return;
    }

    
    try {
      const formValues = this.leaveForm.value;
      const leaveData: Partial<EmployeeLeave> = {
        paternity: formValues.paternity,
        sick: formValues.sick,
        casual: formValues.casual,
        maternity: formValues.maternity,
        bereavement: formValues.bereavement,
      };

      const employeeLeaveRepo = remult.repo(EmployeeLeave);
      let record = await employeeLeaveRepo.findFirst({ employee: { $id: employee.id } });

      if (record) {
        // Update existing record
        await employeeLeaveRepo.save({ ...record, ...leaveData });
        toast.success('Employee leave allowances updated successfully!');
      } else {
        // Create new record
        await employeeLeaveRepo.insert({ employee, ...leaveData });
        toast.success('Employee leave allowances saved successfully!');
      }
      // this.form.markAsPristine();
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

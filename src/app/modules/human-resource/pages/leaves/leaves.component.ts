import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog, DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { PickupTitleComponent } from '../../../../shared/components/pickup-title/pickup-title.component';
import { LeaveRequestStatus, LeaveType } from '../../libs/constants';
import { remult } from 'remult';
import { toast } from 'ngx-sonner';
import { User } from '../../../../../shared/User.entity';
import { UserService } from '../../../user/user.service';
import { EmployeeLeaveRequests } from '../../../../../shared/EmployeLeaveRequest.entity';
import { Employee } from '../../../../../shared/Employee.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
  imports: [
    InputGroupModule,
    PanelModule,
    TreeModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    DialogModule,
    Dialog,
    CommonModule,
    FieldsetModule,
    DatePickerModule,
    SelectModule,
    SelectButtonModule,
    TabsModule,
    ButtonModule,
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
  ],
})
export class LeavesComponent implements OnInit {
  showRequestModal = false;
  form!: FormGroup;
  leaveTypes: any[] = [];
  leaveRequests: EmployeeLeaveRequests[] = [];
  requestStatus: any[] = [];
  authorisedUsers: User[] = [];
  employees?: Employee[] = [];
  request?:EmployeeLeaveRequests;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      employee: [''],
      startDate: [''],
      endDate: [''],
      reason: [''],
      leaveType: [''],
      status: [''],
    });
  }

  ngOnInit() {
    this.leaveTypes = Object.entries(LeaveType).map(([value, label]) => ({
      value,
      label,
    }));

    this.requestStatus = Object.entries(LeaveRequestStatus).map(
      ([value, label]) => ({
        value,
        label,
      })
    );

    this.getLeaveAuthorisedUsers();
    this.getEmployees();
    this.loadLeaveRequests();
  }

  async getEmployees() {
    try {
      this.employees = await remult.repo(Employee).find();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  leaveRequest() {
    this.showRequestModal = true;
  }

  saveRequest() {
    try {
      if (!this.form.valid) {
        toast.error('Please fill all the fields');
        return;
      }
      const requestData = this.form.value;
      const requestRepo = remult.repo(EmployeeLeaveRequests);

      console.log(requestData);

      // requestRepo.insert({
      //   employee: requestData.employee,
      //   leaveType: requestData.leaveType,
      //   startDate: requestData.startDate,
      //   endDate: requestData.endDate,
      //   approval_user: requestData.approval_user,
      //   reason: requestData.reason,
      //   status: 'pending',
      // });
    } catch (error: any) {
      toast.error(error.message);
    }
    this.showRequestModal = false;
  }

  async getLeaveAuthorisedUsers() {
    try {
      this.authorisedUsers = await this.userService.getUsersByPermission(
        'leave_approval'
      );
    } catch (error: any) {
      toast.error('Error fetching authorised users:', error);
    }
  }

  async loadLeaveRequests() {
    try {
      debugger;
      this.leaveRequests = await remult
        .repo(EmployeeLeaveRequests)
        .find({ include: { employee: true } });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async viewRequest(reg: any) {
    try {
      this.request = reg; //--assign
      this.form.patchValue({
        employee: reg.employee.name,
        startDate: reg.startDate,
        endDate: reg.endDate,
        reason: reg.reason,
        leaveType: reg.leave_type,
      });

      this.form.get('employee')?.disable();
      this.form.controls['startDate'].disable();
      this.form.controls['endDate'].disable();
      this.form.controls['reason'].disable();
      this.form.controls['leaveType'].disable();

      this.showRequestModal = true;
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async updateStatus(){
    try {
      debugger
      await remult.repo(EmployeeLeaveRequests).update(this.request?.id!,{status: this.form.controls['status'].value});
       this.showRequestModal = false;
       this.loadLeaveRequests();
    } catch (error:any) {
      toast.error(error.message);
       this.showRequestModal = false;
    }
  }
}

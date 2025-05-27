import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
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
import { EmployeeService } from '../../services/employee.service';
import { Roles, User } from '../../../../../shared/User.entity';
import { toast } from 'ngx-sonner';
import { Employee } from '../../../../../shared/Employee.entity';
import { remult } from 'remult';
import { employee_prefix, leaveType } from '../../libs/constants';
import { PickupTitleComponent } from '../../../../shared/components/pickup-title/pickup-title.component';
import { AttendanceData } from '../../libs/interface';

@Component({
  selector: 'app-attendence',
  imports: [
    InputGroupModule,
    PanelModule,

    TreeModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    DialogModule,
    // DatePipe,
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

    PickupTitleComponent,
  ],
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css'],
})
export class AttendenceComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      role: ['', [Validators.required]],
      attnDate: ['', [Validators.required]],
    });

    this.attendanceForm = this.formBuilder.group({
      records: this.formBuilder.array([]),
    });
  }

  form!: FormGroup;
  attendanceForm!: FormGroup;
  roles: Roles[] = [];
  employees: Employee[] = [];
  attendence: any[] = [];
  prefix = employee_prefix;

  leaveTypes = Object.entries(leaveType).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  ngOnInit() {
    this.loadRoles();
  }

  async loadRoles() {
    try {
      this.roles = await this.employeeService.getRoles();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  get records(): FormArray {
    return this.attendanceForm.get('records') as FormArray<FormGroup>;
  }

  async getAttendence() {
    try {

      if(this.form.invalid){
        toast.error("Invalid!")
        return;
      }
      const roleId = this.form.value.role.id;
      const attnDate = this.form.value.attnDate;

      this.attendence = await this.employeeService.getEmployeeAttendenceByRole({
        role: roleId,
        attnDate: attnDate,
      });

      const defaultInTime = (() => {
        const date = new Date();
        date.setHours(9, 30, 0, 0); // 9:30 AM
        // return date;
        return null;
      })();

      const defaultOutTime = (() => {
        const date = new Date();
        date.setHours(19, 30, 0, 0); // 7:30 PM
        // return date;
        return null;
      })();
      debugger;
      const formGroups = this.attendence.map((emp: any) =>
        this.formBuilder.group({
          employee_id: [emp.id],
          name: [emp.name],
          designation: [emp.designation],
          department: [emp.department],
          inTime: [emp.attendance?.inTime || defaultInTime],
          outTime: [emp.attendance?.outTime || defaultOutTime],
          status: [emp.attendance?.status],
          attnDate: [emp.attendance?.date],
        })
      );

      this.attendanceForm.setControl(
        'records',
        this.formBuilder.array(formGroups)
      );

      console.log(
        'Attendance Records:',
        this.attendanceForm.controls['records'].value
      );
    } catch (error: any) {
      toast.error(error.message || 'Error fetching attendance.');
    }
  }

  async updateAttendance(index: number) {
    const control = this.records.at(index);
    
    //  Validate inTime and status
  if (!control.value.inTime || !control.value.status) {
    toast.error('Both In Time and Status are required.');
    return;
  }

    try {
      const attnData: AttendanceData = {
        attnDate: this.form.value.attnDate,
        inTime: control.value.inTime,
        outTime: control.value.outTime,
        status: control.value.status,
      };

      await this.employeeService.updateAttendence(
        control.value.employee_id,
        attnData
      );

      toast.success('Attendance updated successfully.');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async onUpdateInTime(index: number) {
    debugger;
    const control = this.records.at(index);
    if (control instanceof FormGroup) {
      // console.log(control.value);
      //--Update Intime only
      try {
        await this.employeeService.updateInTime(
          control.value.id,
          this.form.value.attnDate,
          control.value.inTime
        );
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  }
}

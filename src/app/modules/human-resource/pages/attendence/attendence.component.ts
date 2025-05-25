import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { employee_prefix } from '../../libs/constants';
import { PickupTitleComponent } from '../../../../shared/components/pickup-title/pickup-title.component';

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

      PickupTitleComponent
    ],
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css']
})
export class AttendenceComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private readonly formBuilder: FormBuilder,
  ) { 
    this.form = this.formBuilder.group({
      role: ['', [Validators.required]],
      attnDate: [0, [Validators.required]],
      
    });
  }

  form!: FormGroup;
  roles:Roles[]=[];
  employees: Employee[]=[];
  attendence: any[]=[];
  prefix = employee_prefix;
  

  ngOnInit() {
    this.loadRoles();

    

  }

  async loadRoles(){
    try {
      this.roles = await this.employeeService.getRoles();
    } catch (error:any) {
      toast.error(error.message);
    }
  }

  async getAttendence(){
    try {
      console.log("sfsdf");
      
      debugger;
      this.attendence = await this.employeeService.getEmployeeAttendenceByRole({role:this.form.value.role,attnDate:this.form.value.attnDate});
     
      // console.log(attns);
      
    } catch (error:any) {
      toast.error(error.message);
    }
  }

}

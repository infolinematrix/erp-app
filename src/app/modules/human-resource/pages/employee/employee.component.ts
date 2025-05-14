import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgClass, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DatePickerModule } from 'primeng/datepicker';
// import { Dialog } from 'primeng/dialog';
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
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { SidebarComponent } from 'src/app/modules/accounts/sidebar/sidebar.component';
import { PageEvent } from 'src/app/core/types/PageEvent';
import { remult } from 'remult';
import { User } from 'src/shared';
import { UserTypes } from 'src/app/core/constants/enums';
import { Employee } from 'src/shared/Employee.entity';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-employee',
  imports: [
    NgClass,
    SidebarComponent,
    RouterLink,
    DatePipe,
    InputGroupModule,

    PanelModule,
    TreeModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    // Dialog,
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
  ],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private readonly employeeService: EmployeeService,
    private _router: Router
  ) { }

  totalRecords: number = 0;
  private currentRows: number = 10; // Initial rows, should match p-table [rows]
  private currentFirst: number = 0; // Initial first record index

  users:User[]=[]
  async ngOnInit() {
    await this.loadData();
  }

  async loadData(){
    const data = await remult.repo(User).find({
      where:{user_type:UserTypes.Employee}
    })
    
    this.users = data!;
  }

  onPageChange(event: PageEvent): void {
    this.currentFirst = event.first;
    this.currentRows = event.rows;
    this.loadData();
  }

  viewEmployee(user: User){
    

    if (user.user_type === UserTypes.Employee) {
      console.log('Navigating to update employee:', user.id);
      this._router.navigate(['/human-resource/employee/update', user.id])
        .then(() => {
          console.log('Navigation successful.');
        })
        .catch(error => {
          console.error('Navigation error:', error);
          toast.error('Error during navigation.');
        });
    } else {
      toast.error('User is not an Employee!');
      return;
    }
  }
  

}

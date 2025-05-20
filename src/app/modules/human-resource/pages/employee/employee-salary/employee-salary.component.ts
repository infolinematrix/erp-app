import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
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
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { toast } from 'ngx-sonner';
import { remult } from 'remult';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeSalaryHead } from '../../../../../../shared/EmployeeSalaryHead.entity';


@Component({
  selector: 'app-employee-salary',
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
    // RouterOutlet,
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
    ReactiveFormsModule,
  ],
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css'],
})
export class EmployeeSalaryComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly employeeService: EmployeeService,
  
  ) {
    this.formHead = this.formBuilder.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      calculation_type: ['', [Validators.required]],
      calculation_base_head: [0, [Validators.required]],
      value: [0, [Validators.required]],
    });
  }
  
  formHead!: FormGroup;
  visible: boolean = false;
  addtion_heads: EmployeeSalaryHead[] = [];
  deduction_heads: EmployeeSalaryHead[] = [];



  stateOptions: any[] = [
    { label: 'Addition', value: 'A' },
    { label: 'Deduction', value: 'D' },
  ];
  calculation_types: any[] = [
    { label: 'Fixed', value: 'Fixed' },
    { label: 'Percentage', value: 'Percentage' },
  ];
  


  async ngOnInit() {
    this.loadData();
  }

  showHeadCreateDialog() {
    this.visible = true;
  }

  async loadData(){
    this.addtion_heads = await this.employeeService.getSalaryHeads('A');
    this.deduction_heads = await this.employeeService.getSalaryHeads('D');
  }

  async createHead() {
    if (this.formHead.invalid) {
      toast.error('Invalid');
      return;
    }

    const headRepo = remult.repo(EmployeeSalaryHead);

    // Use findFirst to check if a head with the given name exists
    const existingHead = await headRepo.findFirst({ name: this.formHead.value.name });

    if (existingHead) {
      toast.success('Already exist!');
      return; 
    } else {
      const data = {
        type: this.formHead.value.type,
        name: this.formHead.value.name,
        calculation_type: this.formHead.value.calculation_type,
        calculation_base_head: this.formHead.value.calculation_base_head,
        value: this.formHead.value.value,
      }
      await this.employeeService.createHead(data);
      this.loadData();
      toast.success('Successfully saved!');
      this.visible = false;
      this.formHead.reset();
    }
  }
}

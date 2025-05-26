import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toast } from 'ngx-sonner';
import { remult } from 'remult';
import { EmployeeService } from '../../../services/employee.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
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
import { FieldsetModule } from 'primeng/fieldset';
import { Employee } from '../../../../../../shared/Employee.entity';
import { EmployeePayroll } from '../../../../../../shared/EmployeePayroll.entity';

@Component({
  selector: 'app-employee-payroll',
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
    FieldsetModule,
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
  templateUrl: './employee-payroll.component.html',
  styleUrls: ['./employee-payroll.component.css'],
})
export class EmployeePayrollComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.form = this.formBuilder.group({
      salary_head: [''],
      head_name: [''],
      type: [''],
      calculation_type: [''],
      calculation_base_head: [''],
      value: [''],
      employee_id:[0]
    });
  }

  selectedEmployee?: Employee;
  salary_heads: any[] = [];
  // addition_heads: any[] = [];
  // deduction_heads: any[] = [];
  // tax_deduction_heads: any[] = [];
  selectedHead: any;
  form!: FormGroup;

  ngOnInit() {
    this.loadData();

    this.form.controls['calculation_type'].disable;
    this.form.controls['calculation_base_head'].disable;
  }

  employee_addition_heads: any[] = [];
  employee_deduction_heads: any[] = [];
  employee_tax_deduction_heads: any[] = [];

  async loadData() {
    try {
      const userId = Number(this.activeRoute.snapshot.paramMap.get('id'));
      this.salary_heads = await this.employeeService.getSalaryHeads('');
      
      this.employee_addition_heads = await this.employeeService.getSalaryHeads('D');
      this.employee_deduction_heads = await this.employeeService.getSalaryHeads('D');
      this.employee_tax_deduction_heads = await this.employeeService.getSalaryHeads('T');

      if (!userId) {
        toast.error('as');
      }

      const employee = await remult
        .repo(Employee)
        .findFirst({ user_id: userId! });

      if (employee) {
        this.selectedEmployee = employee!;
        this.form.patchValue({
          employee_id: this.selectedEmployee.id,
        });
        

        this.employee_addition_heads =
          await this.employeeService.getSalaryHeadByEmployee(
            this.selectedEmployee.id,
            'A'
          );
        this.employee_deduction_heads =
          await this.employeeService.getSalaryHeadByEmployee(
            this.selectedEmployee.id,
            'D'
          );
          this.employee_tax_deduction_heads =
          await this.employeeService.getSalaryHeadByEmployee(
            this.selectedEmployee.id,
            'T'
          );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async onChangeHead() {
    this.selectedHead = await this.employeeService.findSalaryHead(
      this.form.value.salary_head
    );
    console.log(this.selectedHead);
    this.form.patchValue({
      head: this.selectedHead.id,
      head_name: this.selectedHead.name,
      type: this.selectedHead.type,
      calculation_type: this.selectedHead.calculation_type,
      calculation_base_head: this.selectedHead.calculation_base_head,
      value: this.selectedHead.value,
      employee_id: this.selectedEmployee?.id
    });

    if (this.form.controls['calculation_type'].value === 'Fixed') {
      this.form.controls['calculation_base_head'].disable();
    } else {
      this.form.controls['calculation_base_head'].enable();

      const base_head = await this.employeeService.findSalaryHead(
        this.form.value.calculation_base_head
      );
      this.form.patchValue({
        value: (base_head!.value * this.selectedHead.value) / 100,
      });
    }
  }

  onClickAdd() {
  
    if (this.form.invalid) {
      toast.error('Invalid form data');
      return;
    }

    const formData = this.form.value;
    const headValue = formData['salary_head'];
    const typeValue = formData['type'];
    const employeeId = formData['employee_id'];

    if (typeValue === 'A') {
      const headExists = this.employee_addition_heads.some(
        (head) => head.employee_id === employeeId && head.salary_head === headValue
      );
      if (headExists) {
        toast.error('Addition head already exists');
        this.form.reset();
        return;
      }
      this.employee_addition_heads.push(formData);
      this.form.reset();
    } 
    if (typeValue === 'D') {
      const headExists = this.employee_deduction_heads.some(
        (head) => head.employee_id === employeeId && head.salary_head === headValue
      );
      if (headExists) {
        toast.error('Deduction head already exists');
        this.form.reset();
        return;
      }
      this.employee_deduction_heads.push(formData);
      this.form.reset();
    }
    if (typeValue === 'T') {
      const headExists = this.employee_tax_deduction_heads.some(
        (head) => head.employee_id === employeeId && head.salary_head === headValue
      );
      if (headExists) {
        toast.error('Tax Deduction head already exists');
        this.form.reset();
        return;
      }
      this.employee_tax_deduction_heads.push(formData);
      this.form.reset();
    }
  }

  removeHead(headIndex: number, type: string) {
    if (type && type === 'A') {
      this.employee_addition_heads.splice(headIndex, 1);
    }
    if (type && type === 'D') {
      this.employee_deduction_heads.splice(headIndex, 1);
    }
    if (type && type === 'T') {
      this.employee_tax_deduction_heads.splice(headIndex, 1);
    }
  }

  async save() {
    try {
      const employeeIdToDelete = this.selectedEmployee?.id;
      console.log(
        'Attempting to delete payroll for employee ID:',
        employeeIdToDelete!
      );

      if (employeeIdToDelete) {
        try {
          const deletedResult = await remult.repo(EmployeePayroll).deleteMany({
            where: { employee_id: employeeIdToDelete },
          });
          console.log('Delete operation result:', deletedResult); // Inspect the result object
        } catch (deleteError: any) {
          console.error('Error during delete operation:', deleteError);
          toast.error(`Error during delete: ${deleteError.message}`);
          return; // Stop further execution if delete fails
        }
      } else {
        console.warn('No employee selected, skipping delete operation.');
      }

      //--Concate all head
      const payrollData = this.employee_addition_heads.concat(
        this.employee_deduction_heads, this.employee_tax_deduction_heads
      );

      const payrollDataToSave = payrollData.map((payrol) => ({
        salary_head: payrol.salary_head,
        head_name: payrol.head_name,
        type: payrol.type,
        employee_id: this.selectedEmployee?.id,
        calculation_type: payrol.calculation_type,
        calculation_base_head: payrol.calculation_base_head,
        value: payrol.value,
      }));

      console.log(payrollDataToSave);

      const savedResult = await remult
        .repo(EmployeePayroll)
        .save(payrollDataToSave);
      console.log('Save operation result:', savedResult);
      toast.success('Save operation');
    } catch (error: any) {
      console.error('Error during save operation:', error);
      toast.error(error.message);
    }
  }
}

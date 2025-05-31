import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule, Dialog } from 'primeng/dialog';
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
import { UserService } from '../../../user/user.service';
import { toast } from 'ngx-sonner';
import { remult } from 'remult';
import { HolidayMaster } from '../../../../../shared/HalidayMaster.entity';
import { HolidayTypes } from '../../libs/constants';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css'],
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
export class HolidayComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      holidayType: ['', [Validators.required]],
    });
    this.filterForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      holidayType: [''],
    });
  }

  ngOnInit() {
    this.holidayTypes = Object.entries(HolidayTypes).map(([value, label]) => ({
      value,
      label,
    }));
    this.holidayTypes.unshift({ label: 'All', value: '' });
  }

  showModal = false;
  form!: FormGroup;
  filterForm!: FormGroup;
  holidayTypes: any[] = [];
  data: HolidayMaster[] = [];



  async filterdData(){
   
    if (!this.filterForm.valid) {
      toast.error('Please fill all the fields');
      return;
    }
    const startDate = this.filterForm.controls['startDate'].value;
    const endDate = this.filterForm.controls['endDate'].value;

    if (startDate > endDate) {
      toast.error('Start date must be less than or equal to end date.');
      return;
    }

    try {

      const filterConditions: any = {
        startDate: { $gte: startDate }, // Greater than or equal to
        endDate: { $lte: endDate },   // Less than or equal to
      };

     const holidayTypeFilter = this.filterForm.controls['holidayType'].value;
      if (holidayTypeFilter && holidayTypeFilter !== '') {
        filterConditions.holidayType = holidayTypeFilter;
      }

      this.data = await remult.repo(HolidayMaster).find({
        where: filterConditions,
      });
     
      console.log(this.data);
      

    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async create() {
    debugger
    if (!this.form.valid) {
      toast.error('Please fill all the fields');
      return;
    }
    const startDate = this.form.controls['startDate'].value;
    const endDate = this.form.controls['endDate'].value;

    if (startDate > endDate) {
      toast.error('Start date must be less than or equal to end date.');
      return;
    }

    try {
      const formData = this.form.value;
      await remult.repo(HolidayMaster).insert({
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        holidayType: formData.holidayType,
      });
      toast.success('Created Successfully');
      this.showModal = false;
      this.form.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  async delete(id:number) {
    try {
      await remult.repo(HolidayMaster).delete(id);
      this.filterdData();
      toast.success('Deleted Successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  }


}

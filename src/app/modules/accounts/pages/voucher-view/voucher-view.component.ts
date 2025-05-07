import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
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
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { AccountsService } from '../../accounts.service';
import { scrollType, txnMode, voucherStatus } from 'src/app/core/constants/enums';
import { SelectItem } from 'primeng/api';
import { toast } from 'ngx-sonner';
import { TransactionMaster } from 'src/shared/TransactionMaster.entity';

@Component({
  selector: 'app-voucher-view',
  templateUrl: './voucher-view.component.html',
  styleUrls: ['./voucher-view.component.css'],
  imports: [
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
    Dialog,
    ToolbarModule,
    CommonModule,
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
})
export class VoucherViewComponent implements OnInit {
  form!: FormGroup;
  txnType = scrollType; //-enum
  vcStatus = voucherStatus; //-enum
  txnModeOptions: SelectItem[] = [];
  txnTypeOptions: SelectItem[] = [];
  voucherStatusOptions: SelectItem[] = [];
  transactions: TransactionMaster[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountsService
  ) {}

  ngOnInit() {
    this.txnTypeOptions = [
      { label: 'HC-Cash Credit', value: this.txnType.HC },
      { label: 'HD-Cash Debit', value: this.txnType.HD },
      { label: 'KD-Bank Debit', value: this.txnType.KD },
      { label: 'KC-Bank Credit', value: this.txnType.KC },
      { label: 'TC-Transfer Credit', value: this.txnType.TC },
      { label: 'TD-Transfer Debit', value: this.txnType.TD },
    ];

    this.voucherStatusOptions = [
      { label: 'Entry', value: this.vcStatus.Pending },
      { label: 'Authorised', value: this.vcStatus.Approved },
      { label: 'Cancelled', value: this.vcStatus.Cancelled },
    ];


    
    this.form = this.formBuilder.group({
      from_date : ['', [Validators.required]],
      to_date : ['', [Validators.required]],
      type : [''],
      mode : [''],
      status : [0],
    });
  }

  async onSubmitView(){
    if (this.form.invalid) {
      toast.error('Invalid Input');
      return;
    }

    if(this.form.controls['from_date'].value > this.form.controls['to_date'].value){
      toast.error('Invalid Date Range!');
      return;
    }

    try {
      this.transactions = await this.accountService.getTransactions(
        this.form.controls['from_date'].value, 
        this.form.controls['to_date'].value, 
        this.form.controls['type'].value);

      console.log(this.transactions);
    } catch (error) {
      toast.error('Something went wrong!');
    }

  }
}

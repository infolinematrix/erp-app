import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
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
import { SelectItem } from 'primeng/api';
import { toast } from 'ngx-sonner';
import { TransactionMaster } from '../../../../../shared/TransactionMaster.entity';
import { scrollType, txnMode, voucherStatus } from '../../constants';

// Interface for the PrimeNG PageEvent
interface PageEvent {
  first: number; // Index of the first record to display
  rows: number;  // Number of rows to display
  page?: number; // Current page number (0-indexed, optional from event)
  pageCount?: number; // Total number of pages (optional from event)
}

@Component({
  selector: 'app-voucher-view',
  templateUrl: './voucher-view.component.html',
  styleUrls: ['./voucher-view.component.css'],
  imports: [
    SidebarComponent,
    RouterLink,
    // DatePipe,
    Dialog,
    InputGroupModule,
    CommonModule,
    PanelModule,
    TreeModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    FieldsetModule,
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
  txnMode = txnMode; //-enum
  vcStatus = voucherStatus; //-enum

  txnModeOptions: SelectItem[] = [];
  txnTypeOptions: SelectItem[] = [];
  voucherStatusOptions: SelectItem[] = [];
  transactions: TransactionMaster[] = [];
  totalRecords: number = 0;
  showViewModal: boolean = false; showUpdateModal: boolean = false;

  private currentRows: number = 10; // Initial rows, should match p-table [rows]
  private currentFirst: number = 0; // Initial first record index


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountsService,
    
  ) {

    const today = new Date();
    const yesterday = new Date(); 
    yesterday.setDate(today.getDate() - 1);

    this.form = this.formBuilder.group({
      from_date : yesterday,
      to_date : new Date(),
      type : [''],
      mode : [''],
      status : [0],
    });
  }

  ngOnInit() {
    this.txnTypeOptions = [
      { label: 'HC-Cash Credit', value: this.txnType.HC },
      { label: 'HD-Cash Debit', value: this.txnType.HD },
      { label: 'KD-Bank Debit', value: this.txnType.KD },
      { label: 'KC-Bank Credit', value: this.txnType.KC },
      { label: 'TC-Transfer Credit', value: this.txnType.TC },
      { label: 'TD-Transfer Debit', value: this.txnType.TD },
    ];

    this.txnModeOptions = [
      { label: 'Cash Voucher', value: this.txnMode.Cash },
      { label: 'Bank Draft', value: this.txnMode.BankDraft },
      { label: 'Cheque', value: this.txnMode.Cheque },
      { label: 'Fund Transfer/Online', value: this.txnMode.FundTransfer },
    ];

    this.voucherStatusOptions = [
      { label: 'Entry', value: this.vcStatus.Pending },
      { label: 'Authorised', value: this.vcStatus.Approved },
      { label: 'Cancelled', value: this.vcStatus.Cancelled },
    ];
    
  }

  async onSubmitView(){

    this.currentFirst = 0;

    if (this.form.invalid) {
      toast.error('Invalid Input');
      return;
    }

    if(this.form.controls['from_date'].value > this.form.controls['to_date'].value){
      toast.error('Invalid Date Range!');
      return;
    }
    
    try {
      this.loadTransactions();

      console.log(this.transactions);
    } catch (error) {
      toast.error('Something went wrong!');
    }

  }

  loadTransactions(): void {
   
    // this.loading = true;
    const formValues = this.form.value;
    const page = (this.currentFirst / this.currentRows) + 1; // Calculate 1-based page index

    const fromDate = formValues.from_date ? new Date(formValues.from_date) : null;
    const toDate = formValues.to_date ? new Date(formValues.to_date) : null;

    if (!fromDate || !toDate) {
        toast.message("From date or To date is not set.");
        // this.loading = false;
        this.transactions = [];
        this.totalRecords = 0;
        return;
    }


    this.accountService.getTransactions(
      fromDate,
      toDate,
      formValues.mode, 
      formValues.status,
      this.currentRows,
      page
    ).then(response => {
      this.transactions = response.data;
      this.totalRecords = response.totalRecords;
      // this.loading = false;
    }).catch(error => {
      toast.message('Error fetching transactions:', error);
      this.transactions = [];
      this.totalRecords = 0;
      // this.loading = false;
    });

    
  }

  onPageChange(event: PageEvent): void {
    this.currentFirst = event.first;
    this.currentRows = event.rows;
    this.loadTransactions();
  }


  showVoucheViewModal(subsystem:string, scroll_no:number, scroll_slno: number){
    this.showViewModal = true;

    console.log(subsystem, scroll_no, scroll_slno);
    

  }
}

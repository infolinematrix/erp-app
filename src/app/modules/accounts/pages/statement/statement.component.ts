import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { AccountsService } from '../../accounts.service';
import { DatePickerModule } from 'primeng/datepicker';
import { remult } from 'remult';
import { FieldsetModule } from 'primeng/fieldset';
import { toast } from 'ngx-sonner';
import { TransactionMaster } from '../../../../../shared/TransactionMaster.entity';
import { isActive } from '../../../../core/constants/enums';
import { PageEvent } from '../../../../core/types/PageEvent';
import { GeneralLedger } from '../../../../../shared/GeneralLedger.entity';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css'],
  imports: [
    RouterLink,
    InputGroupModule,
    SelectModule,
    DatePipe,
    DatePickerModule,
    InputGroupAddonModule,
    CommonModule,
    CardModule,
    ToolbarModule,
    FieldsetModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    TextareaModule,
    AngularSvgIconModule,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class StatementComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountsService
  ) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    this.form = this.formBuilder.group({
      from_date: yesterday,
      to_date: new Date(),
      subsystem: ['', [Validators.required]],
      account: ['', [Validators.required]],
      clear_balance: [0],
      opening_balance: [0],
    });
  }

  form!: FormGroup;
  ledgers: any[] = [];
  accounts: any[] = [];
  transactions: TransactionMaster[] = [];

  selectedLedger: any;
  selectedAccount: any;

  totalRecords: number = 0;
  private currentRows: number = 10;
  private currentFirst: number = 0; // Initial first record index

  ngOnInit() {
    this.loadData();
    this.form.controls['clear_balance'].disable();
    this.form.controls['opening_balance'].disable();

    // Subscribe to valueChanges to emit on every change
    // this.form.valueChanges.subscribe((value) => {
    //   console.log('Data Info :', this.form.value);
    // });
  }

  async loadData() {
    // this.ledgers = await this.accountService.getLedgers().then((data) => data);
    this.ledgers = await remult
      .repo(GeneralLedger)
      .find({
        where: {
          subsystem: {
            $nin: ['CASH', 'BANK', 'SALE', 'PURCHASE'],
          },
        },
      })
      .then((data) => data);
  }

  async onChange_Subsytem() {
    this.form.controls['account'].reset();
    this.selectedLedger = this.form.get('subsystem')?.value;
    // console.log(this.selectedLedger);

    if (this.selectedLedger!.allow_account == isActive.No) {
      this.form.controls['account'].disable();
    } else {
      this.accounts = await this.accountService.findAccountsBySubsystem(
        this.selectedLedger!.subsystem
      );

      this.form.controls['account'].enable();
    }
  }

  async onChange_Account() {
    this.selectedAccount = this.form.get('account')?.value;
    const clear_balance = await this.accountService.getClearBalance({
      date: this.form.get('from_date')?.value,
      subsystem: this.selectedLedger!.subsystem,
      accountId: this.selectedAccount!.id,
    });
    this.form.controls['clear_balance'].patchValue(clear_balance);
  }

  async opening_balance() {
    const dt = this.form.controls['from_date'].value;
    console.log(dt);
    const opening_balance = await this.accountService.getClearBalance({
      subsystem: this.selectedLedger.subsystem,
      accountId: this.selectedAccount.id,
      date: this.form.controls['from_date'].value,
    });
    this.form.patchValue({
      opening_balance: opening_balance!,
    });
  }

  async onClick_Submit() {
    this.currentFirst = 0;
    if (this.form.invalid) {
      toast.error('Invalid Input');
      return;
    }

    if (
      this.form.controls['from_date'].value >
      this.form.controls['to_date'].value
    ) {
      toast.error('Invalid Date Range!');
      return;
    }

    try {
      await this.opening_balance();
      await this.loadTransactions();

      console.log(this.transactions);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }

  
  async loadTransactions(): Promise<void> {
    // this.loading = true;

    const formValues = this.form.value;
    const page = this.currentFirst / this.currentRows + 1; // Calculate 1-based page index

    const fromDate = formValues.from_date
      ? new Date(formValues.from_date)
      : null;
    const toDate = formValues.to_date ? new Date(formValues.to_date) : null;

    if (!fromDate || !toDate) {
      toast.message('From date or To date is not set.');
      // this.loading = false;
      this.transactions = [];
      this.totalRecords = 0;
      return;
    }

    try {
      await this.accountService
      .getStatement(
        this.selectedLedger.subsystem,
        this.selectedAccount.id,
        fromDate,
        toDate,
        formValues.mode,
        formValues.status,
        this.currentRows,
        page
      )
      .then((response) => {
        this.transactions = response.data;
        this.totalRecords = response.totalRecords;
        // this.loading = false;
      })
      .catch((error) => {
        toast.message('Error fetching transactions:', error);
        this.transactions = [];
        this.totalRecords = 0;
        // this.loading = false;
      });

      const opening_balance = this.form.controls['opening_balance'].value || 0;
      const txn:any =[]; var closing_balance = opening_balance;

      this.transactions.map((item: TransactionMaster)=> {

        if(['HD', 'TD', 'KD'].includes(item.scroll_type)){
          closing_balance = closing_balance - item.amount;
        }
        if(['HC', 'TC', 'KC'].includes(item.scroll_type)){
          closing_balance = closing_balance + item.amount;
        }

        txn.push(
          {
              ...item,
              closing_balance: closing_balance
          }
        )
      })
      this.transactions = txn;
      
    } catch (error:any) {
      toast.error(error.message)
    }
      
  }

  onPageChange(event: PageEvent): void {
    this.currentFirst = event.first;
    this.currentRows = event.rows;
    this.loadTransactions();
  }
}

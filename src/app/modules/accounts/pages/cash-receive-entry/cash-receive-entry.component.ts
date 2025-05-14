import { CommonModule, NgClass } from '@angular/common';
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

import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { MessageModule } from 'primeng/message';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { remult } from 'remult';
import { GeneralLedger } from 'src/shared/GeneralLedger.entity';
import { SelectModule } from 'primeng/select';
import { SelectItem } from 'primeng/api';
import { GeneralAccount } from 'src/shared';
import { AccountsService } from '../../accounts.service';
import { isActive, txnMode } from 'src/app/core/constants/enums';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-cash-receive-entry',
  templateUrl: './cash-receive-entry.component.html',
  styleUrls: ['./cash-receive-entry.component.css'],
  imports: [
    NgClass,
    SidebarComponent,
    InputGroupModule,
    PanelModule,
    TreeModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
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
    ConfirmPopupModule
],
})
export class CashReceiveEntryComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly accountService: AccountsService
  ) {}

  form!: FormGroup;
  ledgers: GeneralLedger[] = [];
  accounts: GeneralAccount[] = [];
  banks: GeneralAccount[] = [];
  selectedLedger: GeneralLedger | undefined;
  selectedAccount: GeneralAccount | undefined;
  selectedBank: GeneralAccount | undefined;

  txnMode = txnMode; //-enum
  txnModeOptions: SelectItem[] = [];

  ngOnInit() {
    this.form = this.formBuilder.group({
      ledger: ['', [Validators.required]],
      account: [0, [Validators.required]],
      clear_balance: [0],
      mode: [''],
      amount: [0, [Validators.required]],
      bank: [''],
      description: [''],
      narration: ['Amount received '],
    });

    this.loadLedger();
    this.loadBanks();

    this.txnModeOptions = [
      { label: 'Bank Draft', value: this.txnMode.BankDraft },
      { label: 'Cash', value: this.txnMode.Cash },
      { label: 'Cheque', value: this.txnMode.Cheque },
      { label: 'Online Transfer', value: this.txnMode.FundTransfer },
    ];

    //--Disable
    this.form.controls['clear_balance'].disable();

    // Subscribe to valueChanges to emit on every change
    this.form.valueChanges.subscribe((value) => {
      console.log('Data Info :', this.form.value);
    });
  }

  async loadLedger() {
    const dada = await remult.repo(GeneralLedger).find({
      where: {
        is_active: 'Yes',
        // subsystem:{
        //   $in:['INCOME','EXPENSES']
        // }
      },
    });
    console.log(dada);
    this.ledgers = dada;
  }

  async loadBanks(): Promise<void> {
    const banks = await this.accountService.getBanks();
    this.banks = banks;
  }

  async onChange_Subsytem() {
    this.selectedLedger = this.form.get('ledger')?.value;

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
      date: new Date(),
      subsystem: this.selectedLedger!.subsystem.toString(),
      accountId: Number(this.selectedAccount!.id),
    });
    this.form.controls['clear_balance'].patchValue(clear_balance);
  }

  async onChange_Mode() {
    const mode = this.form.get('mode')?.value;
    console.log('mode--------', mode);

    switch (mode) {
      case 'VC': //--cash
        this.form.controls['bank']?.patchValue('');
        this.form.controls['bank']?.disable();
        this.form.controls['description']?.disable();
        break;
      case 'FT': //--Fund Trft
        this.form.controls['bank']?.enable();
        this.form.controls['description']?.enable();
        break;
      case 'DD': //--Fund Trft
        this.form.controls['bank']?.enable();
        this.form.controls['description']?.enable();
        break;
      case 'CH': //--Fund Trft
        this.form.controls['bank']?.enable();
        this.form.controls['description']?.enable();
        break;

      default:
        break;
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const isValid = () => {
      if (this.form.controls['amount'].value <= 0) {
        toast.error('Please enter amount');
        return false;
      }

      if(
        this.form.controls['ledger'].value == '' ||
        this.form.controls['account'].value == 0 ||
        this.form.controls['mode'].value == ''
        
      ){
        toast.error('Invalid');
        return false}

      return true;
    };

    if (isValid()) {
      try {
        
        const scroll = await this.accountService.createTransactionReceive(this.form.value);
        const scrl = scroll.scroll_type +'/'+ scroll.scroll_no +'/'+   scroll.scroll_slno;
        this.form.reset();
        toast.success(`Successfully saved! Scroll:  ${scrl}` )
      } catch (error:any) {
        toast.error(error.message);
      }
    }
  }
}

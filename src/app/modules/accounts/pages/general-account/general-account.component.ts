import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { AccountsService } from '../../accounts.service';
import { DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { isActive } from 'src/app/core/constants/enums';
import { SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { GeneralLedger } from 'src/shared/GeneralLedger.entity';
import { remult } from 'remult';
import { KeyFilterModule } from 'primeng/keyfilter';
import { toast } from 'ngx-sonner';
import { GeneralAccount } from 'src/shared';

@Component({
  selector: 'app-general-account',
  templateUrl: './general-account.component.html',
  styleUrls: ['./general-account.component.css'],
  imports: [
    RouterLink,
    DatePipe, KeyFilterModule,
    SelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    Dialog,
    ToolbarModule,
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
export class GeneralAccountComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  accounts: any[] = [];
  ledgers: GeneralLedger[] = [];
  bsGroups: any[] = [];
  showCreateModal: boolean = false; showUpdateModal: boolean = false;
  form!: FormGroup;
  formUpdate!: FormGroup;

  isActive = isActive; //-enum
  isActiveOptions: SelectItem[] = [];
  selectedAccount: GeneralAccount | undefined;

  ngOnInit() {
    this.loadData();
    this.isActiveOptions = [
      { label: 'Yes', value: this.isActive.Yes },
      { label: 'No', value: this.isActive.No },
    ];

    this.form = this.fromBuilder.group({
      subsystem: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      allow_transfer: [false],
      allow_payment: [false],
      allow_receive: [false],
      is_active: [this.isActive.Yes],
      opening_balance: [0],
      bs_group: [0, [Validators.required]],
    });
    this.formUpdate = this.fromBuilder.group({
      subsystem: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      allow_transfer: [false],
      allow_payment: [false],
      allow_receive: [false],
      is_active: [this.isActive.Yes],
      opening_balance: [0],
      bs_group: [0, [Validators.required]],
    });

  }

  async loadData() {
    this.accounts = await this.accountsService.getAccounts();
    this.bsGroups = await this.accountsService.getBsGroups();
    this.ledgers = await remult.repo(GeneralLedger).find({
      where: {
        is_active:'Yes',
        allow_account: 'Yes'
      },
    });
    console.log(this.accounts);
    
  }

  async onChange_Subsytem(){
    console.log(this.form.value.subsystem);
    const ledger = await this.accountsService.findBySubsystem(this.form.value.subsystem);
    console.log(ledger);
    this.form.patchValue({
      bs_group: ledger!.bs_group,
    });

  }

  //--create/save
  async save() {
    // console.log(this.form.value);
    //--Validate
    if (this.form.invalid) {
      toast.error("Invalid input!");
      return;
    }

    try {
      //--Check aleary exist
      const isExist = await remult.repo(GeneralAccount).findFirst({
        name: this.form.value.name,
      });
      if (isExist) {
        toast.error("Already exist! try different name");
        return;
      }
      
      await remult.repo(GeneralAccount).insert({
        subsystem: this.form.value.subsystem,
        name: this.form.value.name,
        description: this.form.value.description,
        allow_transfer: this.form.value.allow_transfer ? isActive.Yes : isActive.No,
        allow_payment: this.form.value.allow_payment  ? isActive.Yes : isActive.No,
        allow_receive: this.form.value.allow_receive ? isActive.Yes : isActive.No,
        is_active: this.form.value.is_active ? isActive.Yes : isActive.No,
        opening_balance: this.form.value.opening_balance,
        bs_group: this.form.value.bs_group  
      });
      

      toast.success("Successfully saved.");
      this.form.reset();
      this.showCreateModal = false;
      this.loadData();
      return;

    } catch (error:any) {
      toast.error(error.message);
      return;
    }

  }

  //--
  async showUpdate(ledgerId: number) {
    this.showUpdateModal = true;
    this.selectedAccount = await this.accountsService.findAccount(ledgerId);

    this.formUpdate.patchValue({
      subsystem: this.selectedAccount!.subsystem,
      name: this.selectedAccount!.name,
      bs_group: this.selectedAccount!.bs_group,
      is_active: this.selectedAccount!.is_active,
      description: this.selectedAccount!.description,
      allow_transfer: this.selectedAccount!.allow_transfer === 'Yes' ? true : false,
      allow_payment: this.selectedAccount!.allow_payment === 'Yes' ? true : false,
      allow_receive: this.selectedAccount!.allow_receive === 'Yes' ? true : false,
      opening_balance: this.selectedAccount!.opening_balance
    });
    this.formUpdate.controls['subsystem'].disable();
  }

  async updateAcount() {
    if (this.formUpdate.valid && this.selectedAccount !== null) {
      const updatedAccountData = this.formUpdate.value;


      try {
        const updatedAccount = await this.accountsService.updateAccount(
          this.selectedAccount!.id,
          {
            ...updatedAccountData,
            allow_transfer: this.formUpdate.value.allow_transfer ? isActive.Yes : isActive.No,
            allow_payment:this.formUpdate.value.allow_payment ? isActive.Yes : isActive.No,
            allow_receive: this.formUpdate.value.allow_receive ? isActive.Yes : isActive.No,
          }
        );

        console.log('----------', updatedAccountData);
        
        if(updatedAccountData){
          toast.success('Ledger updated successfully:');
          this.showUpdateModal = false;
          this.loadData();
        }else{
          toast.success('Ledger ssfully:');
        }
        
      } catch (error:any) {
        toast.error(error.message);
      }
    } else {
      // Handle form validation errors
      toast.error('Form is invalid or no ledger selected.');
    }
  }


}

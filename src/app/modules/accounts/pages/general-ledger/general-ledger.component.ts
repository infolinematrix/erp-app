import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../accounts.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from 'express';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';
import { DatePickerModule } from 'primeng/datepicker';
import { DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectItem } from 'primeng/api';
import { isActive } from 'src/app/core/constants/enums';
import { toast } from 'ngx-sonner';
import { remult } from 'remult';
import { BalancesheetGroup, GeneralLedger } from 'src/shared';

@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css'],
  imports: [
    RouterLink,
    DatePipe,
    InputGroupModule,
    InputGroupAddonModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    Dialog,
    SelectModule,
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
export class GeneralLedgerComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private fromBuilder: FormBuilder,
    // private router: Router,
    private route: ActivatedRoute
  ) {}

  ledgers: any[] = [];
  bsGroups: any[] = [];
  showCreateModal: boolean = false;
  showUpdateModal: boolean = false;
  form!: FormGroup;
  formUpdate!: FormGroup;
  selectedLedger: GeneralLedger | undefined;

  isActive = isActive; //-enum
  isActiveOptions: SelectItem[] = [];

  ngOnInit() {
    this.loadData();
    this.isActiveOptions = [
      { label: 'Yes', value: this.isActive.Yes },
      { label: 'No', value: this.isActive.No },
    ];

    this.form = this.fromBuilder.group({
      subsystem: ['', [Validators.required]],
      name: ['', [Validators.required]],
      allow_account: ['No'],
      bs_group: ['', [Validators.required]],
      is_active: [this.isActive.Yes],
      description: [''],
    });

    this.formUpdate = this.fromBuilder.group({
      subsystem: ['', [Validators.required]],
      name: ['', [Validators.required]],
      allow_account: ['No'],
      bs_group: ['', [Validators.required]],
      is_active: [this.isActive.Yes],
      description: [''],
    });
  }

  async loadData() {
    this.ledgers = await this.accountsService.getLedgers();
    this.bsGroups = await this.accountsService.getBsGroups();
  }

  async save() {
    try {
      if (this.form.valid) {
        const subsystem = this.form.value.subsystem;
        const name = this.form.value.name;
        const dataExist = await remult.repo(GeneralLedger).findFirst({
          $or: [{ subsystem: subsystem }, { name: name }],
        });

        if (dataExist) {
          toast.error('Already exist! try different name or subsystem');
          return;
        }

        console.log(this.form.value);

        await remult.repo(GeneralLedger).insert({
          subsystem: subsystem,
          name: name,
          allow_account: this.form.value.allow_account,
          bs_group: this.form.value.bs_group,
          is_active: this.form.value.is_active,
          description: this.form.value.description,
        });

        toast.success('Successfully saved.');
        this.showCreateModal = false;
        this.loadData();
      } else {
        toast.error('Invalid!');
        return;
      }
    } catch (error: any) {
      toast.error(error.message);
      return;
    }

    // this.showCreateModal=false;
    // this.loadData();
  }

  async showUpdate(ledgerId: number) {
    this.showUpdateModal = true;
    this.selectedLedger = await this.accountsService.findLedger(ledgerId);

    this.formUpdate.patchValue({
      subsystem: this.selectedLedger!.subsystem,
      name: this.selectedLedger!.name,
      allow_account: this.selectedLedger!.allow_account,
      bs_group: this.selectedLedger!.bs_group,
      is_active: this.selectedLedger!.is_active,
      description: this.selectedLedger!.description,
    });

    this.formUpdate.controls['subsystem'].disable();
  }

  async updateLedger() {
    if (this.formUpdate.valid && this.selectedLedger !== null) {
      const updatedLedgerData = this.formUpdate.value;
      try {
        await this.accountsService.updateLedger(
          this.selectedLedger!.id,
          updatedLedgerData
        );
        toast.success('Ledger updated successfully:');
        this.showUpdateModal = false;
        this.loadData();
      } catch (error:any) {
        toast.error(error.message);
      }
    } else {
      // Handle form validation errors
      toast.error('Form is invalid or no ledger selected.');
    }
  }
}

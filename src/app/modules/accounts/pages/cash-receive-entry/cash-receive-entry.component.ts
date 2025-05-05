import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
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

@Component({
  selector: 'app-cash-receive-entry',
  templateUrl: './cash-receive-entry.component.html',
  styleUrls: ['./cash-receive-entry.component.css'],
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
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    TextareaModule, SelectModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    KeyFilterModule,
    MessageModule,ConfirmPopupModule
   
  ],
})
export class CashReceiveEntryComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  form!:FormGroup
  ledgers:GeneralLedger[]=[];

  ngOnInit() {
    this.form = this.formBuilder.group({
          subsystem: ['', [Validators.required]],
          account: ['', [Validators.required]],
          amount:[0, [Validators.required]],
          inst_type:[0, [Validators.required]],
          inst_no:[0, [Validators.required]],
          inst_date:[0, [Validators.required]],
          inst_description:[0, [Validators.required]],
          narration:['', [Validators.required]],
        });

        this.loadLedger();
  }

  async save(){

    this.form.reset();
  }

  async loadLedger(){
    const dada = await remult.repo(GeneralLedger).find({
      where:{
        // is_active:'Yes',
        // subsystem:{
        //   $ne:['CASH','BANK']
        // }
      }
    });
    console.log(dada);
    this.ledgers = dada;
  
  };

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from 'remult';
import { PickupService } from '../../../../../../core/services/pickup.service';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
  imports:[
    ReactiveFormsModule
  ]
})
export class EmployeeLeaveComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private pickupService: PickupService,
  ) { }

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
    //   qualification: ['', [Validators.required]],
    //   institute: ['', [Validators.required]],
    //   year_of_passing: ['', [Validators.required]],
    })
  }

}

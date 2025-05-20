import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'remult';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {

  constructor(
    // private formBuilder: FormBuilder,
    // private pickupService: PickupService,
  ) { }

  form!: FormGroup;

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   qualification: ['', [Validators.required]],
    //   institute: ['', [Validators.required]],
    //   year_of_passing: ['', [Validators.required]],
    // })
  }

}

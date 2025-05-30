import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [FormsModule, RouterLink, AngularSvgIconModule, ButtonComponent],
})
export class SignUpComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

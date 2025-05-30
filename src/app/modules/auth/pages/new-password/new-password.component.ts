import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  imports: [FormsModule, RouterLink, AngularSvgIconModule, ButtonComponent],
})
export class NewPasswordComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

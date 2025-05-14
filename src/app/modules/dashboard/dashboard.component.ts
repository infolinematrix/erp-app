import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { remult, withRemult } from 'remult';
import { SessionService } from 'src/app/core/services/session.service';
import { AuthController } from 'src/shared/controllers/AuthController';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [RouterOutlet],
    providers:[]
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly _sessionService: SessionService
  ) {}

  ngOnInit(): void {

    console.log(remult);
    
    withRemult (async ()=>{
      console.log('-----Dash', remult);
      // const sess = await this._sessionService.getSession();
      const sess = await this._sessionService.getSession();

        console.log('Dashboard User', sess!);
    })

    // const u = AuthController.getCurrentUser();

    
    
  }
}

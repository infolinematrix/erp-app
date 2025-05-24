import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { remult, withRemult } from 'remult';
import { SessionService } from '../../core/services/session.service';


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
      console.log('-----Dash', remult.user);
      // const sess = await this._sessionService.getSession();
      const sess = await this._sessionService.getSession();

        
    })

    // const u = AuthController.getCurrentUser();

    
    
  }
}

import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Pickups } from '../../../../shared/Pickup.entity';


@Component({
  selector: 'app-pickup-title',
  templateUrl: './pickup-title.component.html',
  styleUrls: ['./pickup-title.component.css']
})
export class PickupTitleComponent implements OnInit {

  @Input() pickupId: string | number = 0;
  
  pickupTitle:string = '';
  

  constructor() { }



  ngOnInit() {
    this.getName();
  }

  async getName(){
    const pickup = await remult.repo(Pickups).findId(Number(this.pickupId));
    this.pickupTitle = pickup?.title ?? '***';
  }

}
function Output(): (target: PickupTitleComponent, propertyKey: "titleLoaded") => void {
  throw new Error('Function not implemented.');
}


import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { Pickups } from 'src/shared/Pickup.entity';

@Injectable({
  providedIn: 'root'
})
export class PickupService {

constructor() { }

async getItemsByPickupCode(pickupCode: number): Promise<any[]> {

  const data = remult.repo(Pickups).find({
    where:{parent:pickupCode},
    orderBy:{title:'asc'}
  })

  if(data){
    return data;
  }

  return [];
}

}

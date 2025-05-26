import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { CenterMaster } from '../../../shared/CenterMaster.entity';

@Injectable({
  providedIn: 'root',
})
export class CenterService {
  constructor() {}

  async getAll() {
    return await remult.repo(CenterMaster).find({ where: { is_active: 1 } });
  }
  async find(id: number) {
    return await remult.repo(CenterMaster).findId(id);
  }
}

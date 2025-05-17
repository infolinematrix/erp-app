import { Injectable } from '@angular/core';
import { remult } from 'remult';
// import { Settings } from 'src/shared';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

constructor() { }

async getAll(){
  // return await remult.repo(Settings).find();

};
async findByCode(code:string){
  // return await remult.repo(Settings).find({where:{code}});
};

//TODO:
async updateByCode(code:string,data:any){

};
//TODO
async create(data:any){};
//TODO
async deleteByCode(code:string){};

}

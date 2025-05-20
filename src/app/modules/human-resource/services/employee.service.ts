import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { EmployeePayroll } from '../../../../shared/EmployeePayroll.entity';
import { EmployeeSalaryHead } from '../../../../shared/EmployeeSalaryHead.entity';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

constructor() { }

  async findSalaryHead(id: number){
    const head = await remult.repo(EmployeeSalaryHead).findId(id);
    return head;
  }
  async getSalaryHeads(type: string= ''){

    const whereClause: any = {};

    if (type && type.trim() !== '') {
      whereClause.type = type;
    }


    const heads = await remult.repo(EmployeeSalaryHead).find({
      
      
      where: whereClause,
      
      orderBy: {
        name: 'asc'
      }
    });
    return heads;
  }

  async createHead(data:any){
    const head = new EmployeeSalaryHead();
    await remult.repo(EmployeeSalaryHead).insert(data);
    return head;
  }

  
  async getSalaryHeadByEmployee(empId: number, type: string= 'A'){
    const heads = await remult.repo(EmployeePayroll).find({
      where: {
        employee_id: empId,
        type: type
      },
    });
    return heads;
  }
  
}

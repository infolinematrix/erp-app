import { Entity, Fields, Relations, remult, repo, Validators } from 'remult';

@Entity('employee_payroll', {
  allowApiCrud: true,
})
export class EmployeePayroll {
  @Fields.autoIncrement()
  id!: string;

  @Fields.integer()
  salary_head = 0;

  @Fields.string()
  head_name = '';
  
  @Fields.string()
  type = 'A';

  @Fields.integer()
  employee_id = 0;

  @Fields.string()
  calculation_type = '';

  @Fields.integer()
  calculation_base_head = 0;

  @Fields.integer()
  value = 0;
  
  
  @Fields.date() 
  created_on = new Date();
    
}
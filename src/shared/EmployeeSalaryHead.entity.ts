import { Entity, Fields } from 'remult';

@Entity('employee_salary_head', {
  allowApiCrud: true,
})
export class EmployeeSalaryHead {
  @Fields.autoIncrement()
  id!: number;
  
  @Fields.string()
  type = 'A';

  @Fields.string()
  name = '';

  @Fields.string()
  calculation_type = '';

  @Fields.integer()
  calculation_base_head = 0;

  @Fields.integer()
  value = 0;
  
  
  @Fields.date() 
  created_on = new Date();
    
}
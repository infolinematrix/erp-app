import { Entity, Fields, Validators, Allow, Relations } from 'remult';
import { Employee } from './Employee.entity';

@Entity('employee_leaves_allowances', {
  allowApiCrud: true,
  // allowApiCrud: Allow.authenticated, // Or more specific roles: (e.g., Allow.roles("hr-manager"))
  // You might want to define specific CRUD permissions:
  // allowApiRead: Allow.authenticated,
  // allowApiUpdate: Allow.roles("hr-manager"),
  // allowApiInsert: Allow.roles("hr-manager"),
  // allowApiDelete: Allow.roles("hr-manager"),
})
export class EmployeeLeave {
  @Fields.autoIncrement()
  id?: number;

  @Relations.toOne(() => Employee)
  employee?: Employee;

  @Fields.number({
    validate: [Validators.required, Validators.min(0)],
  })
  paternity: number = 0;

  @Fields.number({
    validate: [Validators.required, Validators.min(0)],
  })
  sick: number = 0;

  @Fields.number({
    validate: [Validators.required, Validators.min(0)],
  })
  casual: number = 0;

  @Fields.number({
    validate: [Validators.required, Validators.min(0)],
  })
  maternity: number = 0;

  @Fields.number({
    validate: [Validators.required, Validators.min(0)],
  })
  bereavement: number = 0;

  @Fields.createdAt()
  createdAt?: Date;

  @Fields.updatedAt()
  updatedAt?: Date;
}

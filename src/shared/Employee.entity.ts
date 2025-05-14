import { Entity, Fields, Relations, remult, repo, Validators } from 'remult';

@Entity('employee', {
  // allowApiCrud: remult.authenticated, // Only authenticated users can perform CRUD operations
  // allowApiDelete: Roles.admin, // Only admin users can delete
  // allowApiInsert: Roles.admin, // Only admin users can create new entries
  apiPrefilter: () => {
    // Defines a prefilter to restrict data access based on user roles
    // if (remult.isAllowed(Roles.admin)) return {}; // Admin can see all users
    // return {
    //   id: remult.user!.id, // Non-admin users can only access their own data
    // };
  },
})

export class Employee {
  @Fields.autoIncrement()
  id = 0;

  @Fields.integer()
    user_id=0;
  

  @Fields.string({ required: true })
  name = '';

  @Fields.integer({ required: true })
  gender = 0;

  @Fields.dateOnly({ required: true })
  dob = null;

  @Fields.dateOnly()
  joining_date = null;

  @Fields.dateOnly()
  leaving_date = null;

  @Fields.string()
  contact_no = '';

  @Fields.string()
  email = '';

  @Fields.string()
  address = '';

  @Fields.integer()
  marital_status = 0;

  @Fields.string()
  highest_qualification = '';
}

export class EmployeeDesignation {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string({ required: true })
  name = '';
}



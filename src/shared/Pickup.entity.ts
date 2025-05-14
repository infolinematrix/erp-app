import { Entity, Fields, Relations, remult, repo, Validators } from 'remult';

@Entity('pickups', {
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

  export class Pickups {
    @Fields.autoIncrement()
    id = 0;

    @Fields.integer()
    parent = 0;

    @Fields.string()
    title = '';
   
  }  
  
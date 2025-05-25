import { Entity, Fields, Relations, remult, repo, Validators } from 'remult';
import bcrypt from 'bcryptjs';
import { Employee } from './Employee.entity';

@Entity('users', {
  allowApiCrud: true,
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
export class User {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string({ required: true })
  name = '';

  @Fields.string({ required: true, validate: [Validators.unique] })
  username = '';

  @Fields.string() // Password field is not exposed in API responses
  password!: string;

  // Automatically hash password before insert
  // async $beforeInsert() {
  //   debugger;
  //   if (this.password) {
  //     this.password = await bcrypt.hash(this.password, 10);
  //   }
  // }

  // async $beforeUpdate() {
  //   // You may also want to hash here if password is updated
  //   if (this.password && !this.password.startsWith('$2b$')) {
  //     this.password = await bcrypt.hash(this.password, 10);
  //   }
  // }

  @Fields.string({ required: true })
  user_type = 'USER';

  @Fields.string()
  is_active = 'yes';


  @Fields.string({ includeInApi: false })
  refresh_token = '';

  @Fields.string()
  center_code = '';

  @Relations.toMany(() => UserRole)
  userRoles?: UserRole[];

  @Relations.toOne(() => Employee, { field: 'id', allowNull: false })
  employee?: Employee[];

  // @Fields.string<User>({
  //   // This field is used for updating the password without exposing the actual password column
  //   serverExpression: () => "***", // Hides the value when retrieved from the server
  //   saving: async (user, fieldRef, e) => {
  //     if (e.isNew || fieldRef.valueChanged()) {
  //       // If the user is new or the password has changed
  //       user.password = bcrypt.hashSync(user.password, 10);
  //     }
  //   },
  // })
  // updatePassword = ""; // Placeholder field for password updates, not persisted directly

  // @Fields.boolean({
  //   allowApiUpdate: Roles.admin, // Only admins can update this field
  // })
  // admin = false;
  
  @Fields.string()
  status = 'ACTIVE';

  @Fields.createdAt() // Automatically tracks when the user was created
  created_at = new Date();

  // @Fields.string({ includeInApi: Roles.admin }) // Only admins can see this
  // providerType: ProviderType = "credentials";

  // @Fields.string({ includeInApi: Roles.admin }) // Admins can see the OAuth provider (e.g., GitHub)
  // provider = "";

  // @Fields.string({ includeInApi: Roles.admin }) // Admins can see the user's provider account ID (e.g., GitHub user ID)
  // providerAccountId = "";

  // Creates demo users for testing purposes
  static async createDemoUsers() {
    // if ((await repo(User).count()) == 0)
    // If no users exist, insert these demo users
    // await repo(User).insert([
    //   {
    //     name: "Jane",
    //     updatePassword: "Jane123",
    //     admin: true, // Jane is an admin
    //     providerType: "credentials",
    //   },
    //   {
    //     name: "Steve",
    //     updatePassword: "Steve123",
    //     providerType: "credentials",
    //   },
    // ]);
  }
}

//-- Roles
@Entity('roles', {
  allowApiCrud: true,
})
export class Roles {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string()
  name = '';

  @Fields.string()
  description = '';

  @Fields.string()
  slug = '';

  @Fields.boolean()
  is_active = true;

  @Fields.boolean()
  is_system = false;

  @Fields.boolean()
  is_superadmin = false;

  @Relations.toMany(() => RolePermission, 'permission')
  permissions!: RolePermission[];

  @Fields.createdAt()
  created_at = new Date();
}

// //-- Permissions
@Entity('permissions', {
  allowApiCrud: true,
})
export class Permission {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string()
  name = '';

  @Fields.string()
  description = '';

  @Relations.toOne(() => Roles)
  roles?: Roles; // Assuming user_id is FK in User

}

//--role_permission
@Entity('role_permissions', {
  allowApiCrud: true,
})
export class RolePermission {
  
  @Fields.autoIncrement()
  id!: number;

  @Relations.toOne(() => Roles)
  role!: Roles;

  @Relations.toOne(() => Permission)
  permission!: Permission;

}

//--user-roles
@Entity('user_roles', {
  allowApiCrud: true,
})
export class UserRole {
  @Fields.autoIncrement()
  id? = 0;

  
  // Relationship to User
  @Relations.toOne(() => User)
  user?: User;

  // Relationship to Role
  @Relations.toOne(() => Roles)
  role?: Roles;
}

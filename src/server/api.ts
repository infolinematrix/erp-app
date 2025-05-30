import { createKnexDataProvider } from "remult/remult-knex";
import { remultExpress } from 'remult/remult-express'

import * as dotenv from 'dotenv';
dotenv.config();

// import { getUserFromRequest } from "./auth.js";

import { Task } from "../shared/Task.entity.js";

// import { getUserFromRequest } from "./auth_old.js";
import { TransactionMaster } from "../shared/TransactionMaster.entity.js";
import { AuthController } from "../shared/controllers/AuthController.js";
import { Permission, RolePermission, Roles, User, UserRole } from "../shared/User.entity.js";
import { BalancesheetGroup } from "../shared/BalanceseetCode.entity.js";
import { ClosingBalance } from "../shared/ClosingBalance.entity.js";
import { Employee } from "../shared/Employee.entity.js";
import { EmployeePayroll } from "../shared/EmployeePayroll.entity.js";
import { EmployeeSalaryHead } from "../shared/EmployeeSalaryHead.entity.js";
import { GeneralAccount } from "../shared/GeneralAccount.entity.js";
import { GeneralLedger } from "../shared/GeneralLedger.entity.js";
import { Pickups } from "../shared/Pickup.entity.js";
import { CenterMaster } from "../shared/CenterMaster.entity.js";
import { EmployeeAttendance } from "../shared/EmployeeAttendence.entity.js";
// import { AuthController } from "../shared/controllers/AuthController.js";
// import { getUserFromRequest } from "./auth.js";





  
export const api = remultExpress({
  // getUser: getUserFromRequest,
// getUser: (req) => req.session!['user'],
  
  
  // initApi: async () => {
  //   await User.createDemoUsers();
  // },

  

  dataProvider: createKnexDataProvider({
    client: "mysql2",
    connection: {
      host: process.env["MYSQL_HOST"],
      database: process.env["MYSQL_DATABASE"],
      user: process.env["MYSQL_USER"],
      password: process.env["MYSQL_PASSWORD"],
      port: process.env["MYSQL_PORT"] ? Number(process.env["MYSQL_PORT"]) : undefined,
    },
    
  }),
  admin: true,
  
  entities: [
    CenterMaster,
    Task,  User, Roles, Permission, UserRole,RolePermission, Pickups, 
    GeneralLedger, GeneralAccount, BalancesheetGroup, TransactionMaster, ClosingBalance,
    Employee, EmployeeSalaryHead, EmployeePayroll, EmployeeAttendance,
    
  ],
  controllers:[AuthController]
  
  
});
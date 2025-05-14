import { remultExpress } from "remult/remult-express";
import { createKnexDataProvider } from "remult/remult-knex";

import * as dotenv from 'dotenv';
dotenv.config();

// import { getUserFromRequest } from "./auth.js";

import { Task } from "../shared/Task.entity.js";
import { Permission, RolePermission, Roles, User, UserRole } from "../shared/User.entity.js";
import { BalancesheetGroup,GeneralLedger,GeneralAccount, ClosingBalance,Employee, Pickups } from "../shared/index.js";

// import { getUserFromRequest } from "./auth_old.js";
import { TransactionMaster } from "../shared/TransactionMaster.entity.js";
import { AuthController } from "../shared/controllers/AuthController.js";
import { getUserFromRequest } from "./auth_old.js";

// import { AuthController } from "./auth/auth.controller.js";



  
export const api = remultExpress({
  // getUser: getUserFromRequest,
// getUser(request) {
  
// },
  
  
  initApi: async () => {
    // await User.createDemoUsers();
  },

  

  dataProvider: createKnexDataProvider({
    client: "mysql2",
    connection: {
      host: process.env["MYSQL_HOST"],
      database: process.env["MYSQL_DATABASE"],
      user: process.env["MYSQL_USER"],
      password: process.env["MYSQL_PASSWORD"],
      port: process.env["MYSQL_PORT"] ? Number(process.env["MYSQL_PORT"]) : undefined,
      // timezone: 'Asia/Kolkata' 
    },
  }),
  admin: true,
  
  entities: [
    Task, User, Roles, Permission, UserRole,RolePermission,
    GeneralLedger, GeneralAccount, BalancesheetGroup, TransactionMaster, ClosingBalance,
    Employee, Pickups, 
  ],
  controllers:[AuthController]
  
  
});
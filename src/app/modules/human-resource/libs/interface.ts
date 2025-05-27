import { RolePermission, Roles } from "../../../../shared/User.entity";


export interface AttendanceData {
  attnDate: string; // yyyy-mm-dd format
  inTime: Date;    // optional
  outTime?: Date;   // optional
  status: string;   // optional
}

export interface GetAttendanceParams {
  role: number; // Role can be a string (ID) or a Roles object
  attnDate: Date ; // Attendance date
}
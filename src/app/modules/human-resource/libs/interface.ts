import { Roles } from "../../../../shared/User.entity";

export interface GetAttendanceParams {
  role: string | Roles; // Role can be a string (ID) or a Roles object
  attnDate: Date ; // Attendance date
}
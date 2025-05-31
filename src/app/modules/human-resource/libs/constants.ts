export const employee_prefix = 'HREM';
export const work_hours = 10;

export enum attendanceType{
    LWP = "Leave with Pay",
    LOP = "Leave without Pay",
    ABN = "Absent",
    PRE = "Present",
    LTE = "Late",
    HDL = "Half Day Leave",
}

export enum LeaveType{
    PaternityLeave = "Paternity Leave",
    SickLeave ="Sick Leave",
    CasualLeave = "Casual Leave",
    MaternityLeave = "Maternity Leave",
    BereavementLeave = "Bereavement Leave",
}

export enum LeaveRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

export enum HolidayTypes {
  Full = 'Full Day',
  Half = 'Half Day',
}
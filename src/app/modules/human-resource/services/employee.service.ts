import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { EmployeePayroll } from '../../../../shared/EmployeePayroll.entity';
import { EmployeeSalaryHead } from '../../../../shared/EmployeeSalaryHead.entity';
import { Roles, User, UserRole } from '../../../../shared/User.entity';
import { GetAttendanceParams } from '../libs/interface';
import { Employee } from '../../../../shared/Employee.entity';
import { EmployeeAttendance } from '../../../../shared/EmployeeAttendence.entity';
import { AttendanceData } from '../libs/interface';
import { EmployeeLeaveRequests } from '../../../../shared/EmployeLeaveRequest.entity';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  async findSalaryHead(id: number) {
    const head = await remult.repo(EmployeeSalaryHead).findId(id);
    return head;
  }
  async getSalaryHeads(type: string = '') {
    const whereClause: any = {};

    if (type && type.trim() !== '') {
      whereClause.type = type;
    }

    const heads = await remult.repo(EmployeeSalaryHead).find({
      where: whereClause,

      orderBy: {
        name: 'asc',
      },
    });
    return heads;
  }

  async createHead(data: any) {
    const head = new EmployeeSalaryHead();
    await remult.repo(EmployeeSalaryHead).insert(data);
    return head;
  }

  async getSalaryHeadByEmployee(empId: number, type: string = 'A') {
    const heads = await remult.repo(EmployeePayroll).find({
      where: {
        employee_id: empId,
        type: type,
      },
    });
    return heads;
  }

  async deletePayrollHead(id: number) {
    await remult.repo(EmployeeSalaryHead).delete(id);
  }

  async getRoles(): Promise<Roles[]> {
    const roles = await remult.repo(Roles).find();
    return roles;
  }

  async getAllByRole(): Promise<Employee[]> {
    const employees = await remult.repo(Employee).find({
      orderBy: {
        name: 'asc',
      },
    });

    return employees;
  }

  async getEmployeeAttendenceByRole(
    params: GetAttendanceParams
  ): Promise<any[]> {
    const employeeRepo = remult.repo(Employee);
    const attendanceRepo = remult.repo(EmployeeAttendance);

    const role = params.role;
    const attnDate = params.attnDate;

    // Get all employees
    const userRoles = await remult.repo(UserRole).find({
      where: { role: { $id: role } },
      include: {
        user: true,
      },
    });

    const userIds = userRoles.map((r) => r.user!.id as number).filter((u) => u);

    const users = userIds.map((r) => r);

    const employees = await remult.repo(Employee).find({
      where: {
        isActive: true,
        user: {
          $id: {
            $in: users,
          },
        },
      },
    });

    // Get all attendance records for the given date
    const attendanceMap = new Map<number, EmployeeAttendance>();

    const attendances = await attendanceRepo.find({
      where: { date: params.attnDate },
      include: {
        employee: true,
      },
    });

    // Create a map of employeeId -> attendance
    for (const attendance of attendances) {
      if (attendance.employee?.id !== undefined) {
        attendanceMap.set(attendance.employee.id, attendance);
      }
    }

    // Merge: For each employee, attach their attendance if found
    const result = employees.map((employee) => {
      const attendance = attendanceMap.get(employee.id);
      return {
        ...employee,
        attendance: attendance || {
          id: 0,
          date: params.attnDate,
          employee,
          attendance_type: '',
          inTime: null,
          outTime: null,
          remark: '',
          absent_type: '',
          is_editable: false,
          created_at: new Date(),
          updated_at: null,
        },
      };
    });

    return result;
  }



  //--Update Attendence
  async updateAttendence(employeeId: number, attendanceData: AttendanceData) {
    const { attnDate, inTime, outTime, status } = attendanceData;

    // Find existing record by employeeId and attnDate
    const existing = await remult.repo(EmployeeAttendance).findOne({
      where: {
        employee: { $id: employeeId },
        date: new Date(attnDate),
      },
    });

    if (existing) {
      // Update only fields provided
      if (inTime !== undefined)
        existing.inTime = new Date(inTime).toISOString();
      if (outTime !== undefined)
        existing.outTime = new Date(outTime).toISOString();
      if (status !== undefined) existing.status = status;
      

      await remult.repo(EmployeeAttendance).save(existing);
    } else {
      // Insert new record, include only fields that exist
      const inTimeDate = inTime ? new Date(inTime).toISOString() : null;
      const outTimeDate = outTime ? new Date(outTime).toISOString() : null;
      const employee = await remult.repo(Employee).findId(employeeId);

      const newRecord = remult.repo(EmployeeAttendance).create({
        employee: employee!,
        date: new Date(attnDate),
        inTime: inTimeDate!,
        outTime: outTimeDate!,
        status: status,
      });
      await remult.repo(EmployeeAttendance).insert(newRecord);
    }

    return true;
  }

    //--Update In Time
  async updateInTime(empId: number, date: Date, inTime: Date) {
    return true;
  }

  //--Leave Register
  async leaveRegister(){
    const register = await remult.repo(EmployeeLeaveRequests).find({include:{employee:true}})
    const data:any[]=[];
    register.forEach((reg:EmployeeLeaveRequests)  =>  {
      // const employee = remult.repo(Employee).findFirst({id: reg.employee.id})
      
    });
  }
}

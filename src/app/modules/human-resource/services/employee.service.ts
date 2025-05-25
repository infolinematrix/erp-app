import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { EmployeePayroll } from '../../../../shared/EmployeePayroll.entity';
import { EmployeeSalaryHead } from '../../../../shared/EmployeeSalaryHead.entity';
import { Roles } from '../../../../shared/User.entity';
import { GetAttendanceParams } from '../libs/interface';
import { Employee } from '../../../../shared/Employee.entity';
import { EmployeeAttendance } from '../../../../shared/EmployeeAttendence.entity';

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
      include: {
        roles: true,
      },
    });

    return employees;
  }

  async getEmployeeAttendenceByRole(
    params: GetAttendanceParams
  ): Promise<any[]> {
    const employeeRepo = remult.repo(Employee);
    const attendanceRepo = remult.repo(EmployeeAttendance);
 debugger;
    // Get all employees
    const employees = await employeeRepo.find({ where: { isActive: true } });

    // Get all attendance records for the given date
    const attendanceMap = new Map<number, EmployeeAttendance>();

    // const attendances = await attendanceRepo.find({
    //   where: { date: params.attnDate },
    //   include: {
    //     employee: true,
    //   },
    // });
    const attendances = await attendanceRepo.find();

    // Create a map of employeeId -> attendance
    for (const attendance of attendances) {
      if (attendance.employee?.id !== undefined) {
        attendanceMap.set(attendance.employee.id, attendance);
      }
    }

    const defaultInTime: Date = new Date(new Date().setHours(9, 30, 0, 0));
  const defaultOutTime: Date = new Date(new Date().setHours(19, 30, 0, 0));

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
          inTime: 'In Time',
          outTime: 'Out Time',
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
}

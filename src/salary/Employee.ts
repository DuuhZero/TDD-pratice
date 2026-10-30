import { Role } from './Role';

export class Employee {
  readonly name: string;
  readonly email: string;
  readonly baseSalary: number;
  readonly role: Role;

  constructor(name: string, email: string, baseSalary: number, role: Role) {
    this.name = name;
    this.email = email;
    this.baseSalary = baseSalary;
    this.role = role;
  }
}

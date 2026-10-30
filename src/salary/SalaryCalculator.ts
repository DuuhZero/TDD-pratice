import { Employee } from './Employee';
import { Role } from './Role';


export class SalaryCalculator {
  private static readonly RULES: Record<
    Role,
    { threshold: number; highRate: number; lowRate: number }
  > = {
    [Role.DESENVOLVEDOR]: { threshold: 3000, highRate: 0.2, lowRate: 0.1 },
    [Role.DBA]: { threshold: 2000, highRate: 0.25, lowRate: 0.15 },
    [Role.TESTADOR]: { threshold: 2000, highRate: 0.25, lowRate: 0.15 },
    [Role.GERENTE]: { threshold: 5000, highRate: 0.3, lowRate: 0.2 }
  };

  calculateNetSalary(employee: Employee): number {
    const rule = SalaryCalculator.RULES[employee.role];
    if (!rule) {
      throw new Error(`Cargo inválido: ${employee.role}`);
    }

    const discount =
      employee.baseSalary >= rule.threshold ? rule.highRate : rule.lowRate;

    return employee.baseSalary * (1 - discount);
  }
}

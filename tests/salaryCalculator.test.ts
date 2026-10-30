import { Employee } from '../src/salary/Employee';
import { Role } from '../src/salary/Role';
import { SalaryCalculator } from '../src/salary/SalaryCalculator';

describe('Exercício 3 - SalaryCalculator', () => {
  const calculator = new SalaryCalculator();
  const employee = (role: Role, baseSalary: number): Employee =>
    new Employee('Fulano de Tal', 'fulano@example.com', baseSalary, role);

  describe('DESENVOLVEDOR', () => {
    it('CT1 - aplica 20% de desconto para salário >= 3.000,00', () => {
      expect(calculator.calculateNetSalary(employee(Role.DESENVOLVEDOR, 3000)))
        .toBeCloseTo(2400, 2);
      expect(calculator.calculateNetSalary(employee(Role.DESENVOLVEDOR, 5000)))
        .toBeCloseTo(4000, 2);
    });

    it('CT2 - aplica 10% de desconto para salário < 3.000,00', () => {
      expect(calculator.calculateNetSalary(employee(Role.DESENVOLVEDOR, 2999)))
        .toBeCloseTo(2699.1, 2);
    });
  });

  describe('DBA', () => {
    it('CT3 - aplica 25% de desconto para salário >= 2.000,00', () => {
      expect(calculator.calculateNetSalary(employee(Role.DBA, 2000)))
        .toBeCloseTo(1500, 2);
    });

    it('CT4 - aplica 15% de desconto para salário < 2.000,00', () => {
      expect(calculator.calculateNetSalary(employee(Role.DBA, 1000)))
        .toBeCloseTo(850, 2);
    });
  });

  describe('TESTADOR', () => {
    it('CT5 - aplica 25% de desconto para salário >= 2.000,00', () => {
      expect(calculator.calculateNetSalary(employee(Role.TESTADOR, 2500)))
        .toBeCloseTo(1875, 2);
    });

    it('CT6 - aplica 15% de desconto para salário < 2.000,00', () => {
      expect(calculator.calculateNetSalary(employee(Role.TESTADOR, 1999)))
        .toBeCloseTo(1699.15, 2);
    });
  });

  describe('GERENTE', () => {
    it('CT7 - aplica 30% de desconto para salário >= 5.000,00', () => {
      expect(calculator.calculateNetSalary(employee(Role.GERENTE, 5000)))
        .toBeCloseTo(3500, 2);
    });

    it('CT8 - aplica 20% de desconto para salário < 5.000,00', () => {
      expect(calculator.calculateNetSalary(employee(Role.GERENTE, 4000)))
        .toBeCloseTo(3200, 2);
    });
  });

  describe('Cargo inválido', () => {
    it('CT9 - lança erro para um cargo desconhecido', () => {
      const invalid = employee('INVALIDO' as Role, 1000);
      expect(() => calculator.calculateNetSalary(invalid)).toThrow(
        'Cargo inválido'
      );
    });
  });
});

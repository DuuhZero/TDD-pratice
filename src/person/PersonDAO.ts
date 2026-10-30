import { Person } from './Person';


export const PersonValidationErrors = {
  NAME_MIN_PARTS: 'O nome deve ser composto por ao menos 2 partes',
  NAME_ONLY_LETTERS: 'O nome deve ser composto apenas por letras',
  AGE_RANGE: 'A idade deve estar no intervalo [1, 200]',
  EMAIL_REQUIRED: 'A pessoa deve ter pelo menos um Email associado',
  emailInvalid: (name: string): string =>
    `O Email "${name}" deve estar no formato _____@____._____`
} as const;


export class PersonDAO {
  private readonly people: Person[] = [];


  isValidToInclude(p: Person): string[] {
    const errors: string[] = [];

    if (!PersonDAO.hasValidName(p.name)) {
      if (PersonDAO.nameParts(p.name).length < 2) {
        errors.push(PersonValidationErrors.NAME_MIN_PARTS);
      }
      if (!PersonDAO.isOnlyLetters(p.name)) {
        errors.push(PersonValidationErrors.NAME_ONLY_LETTERS);
      }
    }

    if (!PersonDAO.isValidAge(p.age)) {
      errors.push(PersonValidationErrors.AGE_RANGE);
    }

    if (!p.emails || p.emails.length === 0) {
      errors.push(PersonValidationErrors.EMAIL_REQUIRED);
    } else {
      for (const email of p.emails) {
        if (!email.isValid()) {
          errors.push(PersonValidationErrors.emailInvalid(email.name));
        }
      }
    }

    return errors;
  }

  /**
   * Persiste a pessoa apenas se ela for válida para inclusão.
   */
  save(p: Person): void {
    const errors = this.isValidToInclude(p);
    if (errors.length > 0) {
      throw new Error(`Person inválida: ${errors.join('; ')}`);
    }
    this.people.push(p);
  }

  findAll(): Person[] {
    return this.people;
  }

  private static hasValidName(name: string): boolean {
    return (
      PersonDAO.nameParts(name).length >= 2 && PersonDAO.isOnlyLetters(name)
    );
  }

  private static nameParts(name: string): string[] {
    if (!name) {
      return [];
    }
    return name.trim().split(/\s+/).filter((part) => part.length > 0);
  }

  private static isOnlyLetters(name: string): boolean {
    if (!name) {
      return false;
    }
    return PersonDAO.nameParts(name).every((part) =>
      /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(part)
    );
  }

  private static isValidAge(age: number): boolean {
    return Number.isInteger(age) && age >= 1 && age <= 200;
  }
}

import { Email } from '../src/person/Email';
import { Person } from '../src/person/Person';
import { PersonDAO, PersonValidationErrors } from '../src/person/PersonDAO';

const validPerson = (): Person =>
  new Person(1, 'John Doe', 30, [new Email(1, 'john.doe@example.com')]);

describe('Exercício 2 - PersonDAO.isValidToInclude', () => {
  let dao: PersonDAO;

  beforeEach(() => {
    dao = new PersonDAO();
  });

  it('CT1 - retorna lista vazia para uma pessoa válida', () => {
    expect(dao.isValidToInclude(validPerson())).toEqual([]);
  });

  describe('Nome', () => {
    it('CT2 - exige ao menos 2 partes', () => {
      const p = new Person(1, 'John', 30, [new Email(1, 'john@example.com')]);
      expect(dao.isValidToInclude(p)).toContain(
        PersonValidationErrors.NAME_MIN_PARTS
      );
    });

    it('CT3 - rejeita nomes que não sejam apenas letras', () => {
      const p = new Person(1, 'John 123', 30, [
        new Email(1, 'john@example.com')
      ]);
      expect(dao.isValidToInclude(p)).toContain(
        PersonValidationErrors.NAME_ONLY_LETTERS
      );
    });

    it('CT4 - rejeita nome vazio acumulando os dois erros de nome', () => {
      const p = new Person(1, '', 30, [new Email(1, 'john@example.com')]);
      const errors = dao.isValidToInclude(p);
      expect(errors).toContain(PersonValidationErrors.NAME_MIN_PARTS);
      expect(errors).toContain(PersonValidationErrors.NAME_ONLY_LETTERS);
    });

    it('CT5 - aceita nomes com acentuação', () => {
      const p = new Person(1, 'José Antônio', 30, [
        new Email(1, 'jose@example.com')
      ]);
      expect(dao.isValidToInclude(p)).toEqual([]);
    });
  });

  describe('Idade', () => {
    it('CT6 - rejeita idade menor que 1', () => {
      const p = new Person(1, 'John Doe', 0, [new Email(1, 'john@example.com')]);
      expect(dao.isValidToInclude(p)).toContain(
        PersonValidationErrors.AGE_RANGE
      );
    });

    it('CT7 - rejeita idade maior que 200', () => {
      const p = new Person(1, 'John Doe', 201, [
        new Email(1, 'john@example.com')
      ]);
      expect(dao.isValidToInclude(p)).toContain(
        PersonValidationErrors.AGE_RANGE
      );
    });

    it('CT8 - aceita os limites 1 e 200', () => {
      const min = new Person(1, 'John Doe', 1, [
        new Email(1, 'john@example.com')
      ]);
      const max = new Person(2, 'John Doe', 200, [
        new Email(1, 'john@example.com')
      ]);
      expect(dao.isValidToInclude(min)).toEqual([]);
      expect(dao.isValidToInclude(max)).toEqual([]);
    });
  });

  describe('Email', () => {
    it('CT9 - exige pelo menos um email associado', () => {
      const p = new Person(1, 'John Doe', 30, []);
      expect(dao.isValidToInclude(p)).toContain(
        PersonValidationErrors.EMAIL_REQUIRED
      );
    });

    it('CT10 - exige pelo menos um email quando a lista não é informada', () => {
      const p = new Person(1, 'John Doe', 30);
      expect(dao.isValidToInclude(p)).toContain(
        PersonValidationErrors.EMAIL_REQUIRED
      );
    });

    it('CT11 - rejeita email fora do formato _____@____._____', () => {
      const p = new Person(1, 'John Doe', 30, [new Email(1, 'johndoe.com')]);
      expect(dao.isValidToInclude(p)).toContain(
        PersonValidationErrors.emailInvalid('johndoe.com')
      );
    });

    it('CT12 - rejeita email sem domínio de topo', () => {
      const p = new Person(1, 'John Doe', 30, [new Email(1, 'john@example')]);
      expect(dao.isValidToInclude(p)).toContain(
        PersonValidationErrors.emailInvalid('john@example')
      );
    });

    it('CT13 - valida todos os emails e acumula os erros', () => {
      const p = new Person(1, 'John Doe', 30, [
        new Email(1, 'valido@example.com'),
        new Email(2, 'invalido')
      ]);
      expect(dao.isValidToInclude(p)).toEqual([
        PersonValidationErrors.emailInvalid('invalido')
      ]);
    });
  });

  describe('Acumulação de múltiplos erros', () => {
    it('CT14 - retorna todos os erros de uma pessoa totalmente inválida', () => {
      const p = new Person(1, 'X', 500, []);
      const errors = dao.isValidToInclude(p);
      expect(errors).toContain(PersonValidationErrors.NAME_MIN_PARTS);
      expect(errors).toContain(PersonValidationErrors.AGE_RANGE);
      expect(errors).toContain(PersonValidationErrors.EMAIL_REQUIRED);
    });
  });

  describe('save', () => {
    it('CT15 - persiste uma pessoa válida', () => {
      const p = validPerson();
      dao.save(p);
      expect(dao.findAll()).toContain(p);
    });

    it('CT16 - lança erro ao tentar salvar uma pessoa inválida', () => {
      const p = new Person(1, 'John', 30, []);
      expect(() => dao.save(p)).toThrow();
    });
  });
});

describe('Exercício 2 - Email.isValid', () => {
  it('CT17 - aceita formatos válidos', () => {
    expect(new Email(1, 'a@b.c').isValid()).toBe(true);
  });

  it('CT18 - rejeita formatos inválidos', () => {
    expect(new Email(1, 'a@b').isValid()).toBe(false);
    expect(new Email(1, '@b.c').isValid()).toBe(false);
    expect(new Email(1, 'a@.c').isValid()).toBe(false);
    expect(new Email(1, 'a@b.').isValid()).toBe(false);
  });
});

import { Triangle, TriangleType } from '../src/triangle/Triangle';

describe('Exercício 1 - Triângulo', () => {
  describe('Triângulo escaleno válido', () => {
    it('CT1 - classifica (3, 4, 5) como ESCALENO', () => {
      expect(new Triangle(3, 4, 5).classify()).toBe(TriangleType.ESCALENO);
    });

    it('CT2 - classifica (7, 8, 10) como ESCALENO', () => {
      expect(new Triangle(7, 8, 10).classify()).toBe(TriangleType.ESCALENO);
    });
  });

  describe('Triângulo isósceles válido', () => {
    it('CT3 - classifica (7, 7, 4) como ISOSCELES', () => {
      expect(new Triangle(7, 7, 4).classify()).toBe(TriangleType.ISOSCELES);
    });
  });

  describe('Triângulo equilátero válido', () => {
    it('CT4 - classifica (4, 4, 4) como EQUILATERO', () => {
      expect(new Triangle(4, 4, 4).classify()).toBe(TriangleType.EQUILATERO);
    });
  });

  describe('Isósceles válido - permutação dos mesmos valores {5, 5, 3}', () => {
    it('CT5 - classifica (5, 5, 3) como ISOSCELES', () => {
      expect(new Triangle(5, 5, 3).classify()).toBe(TriangleType.ISOSCELES);
    });

    it('CT6 - classifica (5, 3, 5) como ISOSCELES', () => {
      expect(new Triangle(5, 3, 5).classify()).toBe(TriangleType.ISOSCELES);
    });

    it('CT7 - classifica (3, 5, 5) como ISOSCELES', () => {
      expect(new Triangle(3, 5, 5).classify()).toBe(TriangleType.ISOSCELES);
    });
  });

  describe('Um valor zero', () => {
    it('CT8 - retorna INVALIDO para (0, 4, 5)', () => {
      expect(new Triangle(0, 4, 5).classify()).toBe(TriangleType.INVALIDO);
    });
  });

  describe('Um valor negativo', () => {
    it('CT9 - retorna INVALIDO para (-1, 4, 5)', () => {
      expect(new Triangle(-1, 4, 5).classify()).toBe(TriangleType.INVALIDO);
    });
  });

  describe('A soma de 2 lados é igual ao terceiro - todas as permutações de {2, 3, 5}', () => {
    it('CT10 - retorna INVALIDO para (2, 3, 5)', () => {
      expect(new Triangle(2, 3, 5).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT11 - retorna INVALIDO para (2, 5, 3)', () => {
      expect(new Triangle(2, 5, 3).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT12 - retorna INVALIDO para (3, 2, 5)', () => {
      expect(new Triangle(3, 2, 5).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT13 - retorna INVALIDO para (3, 5, 2)', () => {
      expect(new Triangle(3, 5, 2).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT14 - retorna INVALIDO para (5, 2, 3)', () => {
      expect(new Triangle(5, 2, 3).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT15 - retorna INVALIDO para (5, 3, 2)', () => {
      expect(new Triangle(5, 3, 2).classify()).toBe(TriangleType.INVALIDO);
    });
  });

  describe('A soma de 2 lados é menor que o terceiro - todas as permutações de {2, 3, 6}', () => {
    it('CT16 - retorna INVALIDO para (2, 3, 6)', () => {
      expect(new Triangle(2, 3, 6).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT17 - retorna INVALIDO para (2, 6, 3)', () => {
      expect(new Triangle(2, 6, 3).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT18 - retorna INVALIDO para (3, 2, 6)', () => {
      expect(new Triangle(3, 2, 6).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT19 - retorna INVALIDO para (3, 6, 2)', () => {
      expect(new Triangle(3, 6, 2).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT20 - retorna INVALIDO para (6, 2, 3)', () => {
      expect(new Triangle(6, 2, 3).classify()).toBe(TriangleType.INVALIDO);
    });

    it('CT21 - retorna INVALIDO para (6, 3, 2)', () => {
      expect(new Triangle(6, 3, 2).classify()).toBe(TriangleType.INVALIDO);
    });
  });

  describe('Os três valores iguais a zero', () => {
    it('CT22 - retorna INVALIDO para (0, 0, 0)', () => {
      expect(new Triangle(0, 0, 0).classify()).toBe(TriangleType.INVALIDO);
    });
  });

  describe('Método estático isValid', () => {
    it('CT23 - é verdadeiro para um triângulo válido (3, 4, 5)', () => {
      expect(Triangle.isValid(3, 4, 5)).toBe(true);
    });

    it('CT24 - é falso quando a soma de dois lados é igual ao terceiro (2, 3, 5)', () => {
      expect(Triangle.isValid(2, 3, 5)).toBe(false);
    });

    it('CT25 - é falso quando a soma de dois lados é menor que o terceiro (2, 3, 6)', () => {
      expect(Triangle.isValid(2, 3, 6)).toBe(false);
    });
  });
});

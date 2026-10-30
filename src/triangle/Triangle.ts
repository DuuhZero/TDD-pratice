export enum TriangleType {
  EQUILATERO = 'EQUILATERO',
  ISOSCELES = 'ISOSCELES',
  ESCALENO = 'ESCALENO',
  INVALIDO = 'INVALIDO'
}


export class Triangle {
  readonly a: number;
  readonly b: number;
  readonly c: number;

  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }


  classify(): TriangleType {
    const { a, b, c } = this;

    if (!Triangle.isValid(a, b, c)) {
      return TriangleType.INVALIDO;
    }

    if (a === b && b === c) {
      return TriangleType.EQUILATERO;
    }

    if (a === b || a === c || b === c) {
      return TriangleType.ISOSCELES;
    }

    return TriangleType.ESCALENO;
  }

  static isValid(a: number, b: number, c: number): boolean {
    if (a <= 0 || b <= 0 || c <= 0) {
      return false;
    }
    return a + b > c && a + c > b && b + c > a;
  }
}


export class Email {
  private static readonly EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  readonly id: number;
  readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }


  isValid(): boolean {
    return Email.EMAIL_REGEX.test(this.name);
  }
}

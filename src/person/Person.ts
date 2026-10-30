import { Email } from './Email';

/**
 * Exercício 2 - Person.
 *
 * Modelo: Person(id:int, name:String, age:int) com associação 1 - 1,N Email.
 */
export class Person {
  readonly id: number;
  readonly name: string;
  readonly age: number;
  readonly emails: Email[];

  constructor(id: number, name: string, age: number, emails: Email[] = []) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.emails = emails;
  }
}

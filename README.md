# Exercícios de TDD — TypeScript + Jest

Resolução dos três exercícios de Test Driven Development em **TypeScript**, com os
testes escritos em **Jest** e evidências de cobertura de código por teste.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (testado com Node 24)
- npm 9 ou superior (testado com npm 11)

## Estrutura do projeto

```
tdd/
├── src/
│   ├── triangle/
│   │   └── Triangle.ts          # Exercício 1 - classificação de triângulos
│   ├── person/
│   │   ├── Email.ts             # Exercício 2 - Email
│   │   ├── Person.ts            # Exercício 2 - Person
│   │   └── PersonDAO.ts         # Exercício 2 - isValidToInclude / save
│   └── salary/
│       ├── Role.ts              # Exercício 3 - cargos
│       ├── Employee.ts          # Exercício 3 - funcionário
│       └── SalaryCalculator.ts  # Exercício 3 - cálculo do salário líquido
├── tests/
│   ├── triangle.test.ts
│   ├── personDAO.test.ts
│   └── salaryCalculator.test.ts
├── jest.config.js
├── tsconfig.json
└── package.json
```

## Build

Compila os arquivos TypeScript de `src/` para JavaScript em `dist/`:

```bash
npm install          # instala as dependências
npm run build        # executa o compilador TypeScript (tsc)
```

Verificação de tipos sem gerar arquivos:

```bash
npx tsc --noEmit
```

## Execução dos testes

```bash
npm test                 # executa toda a suíte (Jest)
npm run test:watch       # modo watch
npm run test:coverage    # executa e gera o relatório de cobertura
npm run coverage:html    # gera o relatório HTML em coverage/lcov-report/index.html
```

> **Observação sobre o ambiente:** neste ambiente o npm está configurado com
> `omit=dev`. Caso `npm install` não instale as dependências de desenvolvimento,
> use `npm install --include=dev`.

## Convenção de numeração dos casos de teste (CT)

Cada bloco `it(...)` do Jest é **um caso de teste (CT)** e seu título começa com o
identificador `CT{n}`, numerado sequencialmente dentro de cada exercício. Assim é
possível contar e localizar cada CT diretamente na saída do `npm test`.

Para executar apenas o arquivo de um exercício:

```bash
npx jest tests/triangle.test.ts            # CT1 .. CT25
npx jest tests/personDAO.test.ts           # CT1 .. CT18
npx jest tests/salaryCalculator.test.ts    # CT1 .. CT9
```

| Exercício | Arquivo de teste | Qtd. de CTs |
|-----------|------------------|-------------|
| 1 - Triângulo | `tests/triangle.test.ts` | 25 (CT1-CT25) |
| 2 - Person / Email | `tests/personDAO.test.ts` | 18 (CT1-CT18) |
| 3 - Calculadora de salário | `tests/salaryCalculator.test.ts` | 9 (CT1-CT9) |
| **Total** | | **52** |

## Evidências de cobertura de código

Saída de `npm run test:coverage` (`jest --coverage`):

```
PASS tests/triangle.test.ts
PASS tests/salaryCalculator.test.ts
PASS tests/personDAO.test.ts
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |     100 |      100 |     100 |     100 |
 person               |     100 |      100 |     100 |     100 |
  Email.ts            |     100 |      100 |     100 |     100 |
  Person.ts           |     100 |      100 |     100 |     100 |
  PersonDAO.ts        |     100 |      100 |     100 |     100 |
 salary               |     100 |      100 |     100 |     100 |
  Employee.ts         |     100 |      100 |     100 |     100 |
  Role.ts             |     100 |      100 |     100 |     100 |
  SalaryCalculator.ts |     100 |      100 |     100 |     100 |
 triangle             |     100 |      100 |     100 |     100 |
  Triangle.ts         |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 100% ( 81/81 )
Branches     : 100% ( 40/40 )
Functions    : 100% ( 21/21 )
Lines        : 100% ( 80/80 )
================================================================================

Test Suites: 3 passed, 3 total
Tests:       52 passed, 52 total
```

---

## Exercício 1 — Triângulo

> O programa lê três valores inteiros que representam os lados de um triângulo e
> informa se formam um triângulo **isósceles**, **escaleno** ou **equilátero**.
> Condição: a soma de dois lados tem que ser maior que o terceiro lado.

### Esqueleto da classe

`Triangle` recebe os três lados e expõe `classify()`, que retorna o enum
`TriangleType` (`EQUILATERO`, `ISOSCELES`, `ESCALENO` ou `INVALIDO`).

Regras de classificação:

1. Se algum lado for `<= 0` ou a soma de dois lados não for estritamente maior
   que o terceiro → `INVALIDO`.
2. Três lados iguais → `EQUILATERO`.
3. Dois lados iguais → `ISOSCELES`.
4. Todos diferentes → `ESCALENO`.

### Casos de teste (`tests/triangle.test.ts`)

| CT | Situação | Entrada | Resultado esperado |
|----|----------|---------|--------------------|
| CT1 | Triângulo escaleno válido | (3, 4, 5) | `ESCALENO` |
| CT2 | Triângulo escaleno válido | (7, 8, 10) | `ESCALENO` |
| CT3 | Triângulo isósceles válido | (7, 7, 4) | `ISOSCELES` |
| CT4 | Triângulo equilátero válido | (4, 4, 4) | `EQUILATERO` |
| CT5 | Isósceles válido — permutação de {5, 5, 3} | (5, 5, 3) | `ISOSCELES` |
| CT6 | Isósceles válido — permutação de {5, 5, 3} | (5, 3, 5) | `ISOSCELES` |
| CT7 | Isósceles válido — permutação de {5, 5, 3} | (3, 5, 5) | `ISOSCELES` |
| CT8 | Um valor zero | (0, 4, 5) | `INVALIDO` |
| CT9 | Um valor negativo | (-1, 4, 5) | `INVALIDO` |
| CT10 | Soma de 2 lados **igual** ao terceiro | (2, 3, 5) | `INVALIDO` |
| CT11 | Soma de 2 lados **igual** ao terceiro | (2, 5, 3) | `INVALIDO` |
| CT12 | Soma de 2 lados **igual** ao terceiro | (3, 2, 5) | `INVALIDO` |
| CT13 | Soma de 2 lados **igual** ao terceiro | (3, 5, 2) | `INVALIDO` |
| CT14 | Soma de 2 lados **igual** ao terceiro | (5, 2, 3) | `INVALIDO` |
| CT15 | Soma de 2 lados **igual** ao terceiro | (5, 3, 2) | `INVALIDO` |
| CT16 | Soma de 2 lados **menor** que o terceiro | (2, 3, 6) | `INVALIDO` |
| CT17 | Soma de 2 lados **menor** que o terceiro | (2, 6, 3) | `INVALIDO` |
| CT18 | Soma de 2 lados **menor** que o terceiro | (3, 2, 6) | `INVALIDO` |
| CT19 | Soma de 2 lados **menor** que o terceiro | (3, 6, 2) | `INVALIDO` |
| CT20 | Soma de 2 lados **menor** que o terceiro | (6, 2, 3) | `INVALIDO` |
| CT21 | Soma de 2 lados **menor** que o terceiro | (6, 3, 2) | `INVALIDO` |
| CT22 | Os três valores iguais a zero | (0, 0, 0) | `INVALIDO` |
| CT23 | Método estático `isValid` — válido | (3, 4, 5) | `true` |
| CT24 | Método estático `isValid` — soma igual | (2, 3, 5) | `false` |
| CT25 | Método estático `isValid` — soma menor | (2, 3, 6) | `false` |

## Exercício 2 — Person / Email / PersonDAO

> Implementar `isValidToInclude(Person): string[]`. O método retorna uma lista de
> erros com base no objeto `Person` recebido.

### Modelo

- `Person(id: number, name: string, age: number, emails: Email[])`
- `Email(id: number, name: string)`
- `PersonDAO` — `save(p: Person): void` e `isValidToInclude(p: Person): string[]`
- Relacionamento **Person 1 — 1,N Email**

### Regras de validação

1. O nome deve ter ao menos **2 partes** e ser composto **apenas por letras**.
2. A idade deve estar no intervalo **[1, 200]**.
3. A pessoa deve ter **pelo menos um Email** associado.
4. O `Email` deve estar no formato `_____@____._____`, com ao menos um caractere
   em cada parte.

O método **acumula** todos os erros encontrados (não para no primeiro) e retorna
uma lista vazia quando o objeto é válido. `save()` lança exceção se houver erros.

### Casos de teste (`tests/personDAO.test.ts`)

- **CT1** — Pessoa válida → lista de erros vazia.
- **CT2** — Nome com apenas uma parte → erro de quantidade mínima de partes.
- **CT3** — Nome com dígitos (`John 123`) → erro de "apenas letras".
- **CT4** — Nome vazio → acumula os dois erros de nome.
- **CT5** — Nome com acentuação (`José Antônio`) → válido.
- **CT6** — Idade `0` → erro de intervalo.
- **CT7** — Idade `201` → erro de intervalo.
- **CT8** — Idade nos limites `1` e `200` → válidos.
- **CT9** — Sem e-mails (lista vazia) → erro de e-mail obrigatório.
- **CT10** — Sem e-mails (parâmetro omitido) → erro de e-mail obrigatório.
- **CT11** — E-mail fora do formato (`johndoe.com`) → erro de formato.
- **CT12** — E-mail sem domínio de topo (`john@example`) → erro de formato.
- **CT13** — Vários e-mails: valida cada um e acumula apenas os inválidos.
- **CT14** — Pessoa totalmente inválida → todos os erros retornados juntos.
- **CT15** — `save()` persiste uma pessoa válida.
- **CT16** — `save()` lança erro para pessoa inválida.
- **CT17** — `Email.isValid` aceita formato válido (`a@b.c`).
- **CT18** — `Email.isValid` rejeita formatos inválidos.

## Exercício 3 — Calculadora de salário

> Um funcionário contém **nome, e-mail, salário-base e cargo**. O desconto aplicado
> ao salário líquido depende do cargo.

### Modelo

- `Role` (enum): `DESENVOLVEDOR`, `DBA`, `TESTADOR`, `GERENTE`
- `Employee(name, email, baseSalary, role)`
- `SalaryCalculator.calculateNetSalary(employee): number`

### Regras de desconto

| Cargo | Salário | Desconto |
|-------|---------|----------|
| DESENVOLVEDOR | `>= 3.000,00` | 20% |
| DESENVOLVEDOR | `< 3.000,00` | 10% |
| DBA | `>= 2.000,00` | 25% |
| DBA | `< 2.000,00` | 15% |
| TESTADOR | `>= 2.000,00` | 25% |
| TESTADOR | `< 2.000,00` | 15% |
| GERENTE | `>= 5.000,00` | 30% |
| GERENTE | `< 5.000,00` | 20% |

### Casos de teste (`tests/salaryCalculator.test.ts`)

- **CT1** — DESENVOLVEDOR `>= 3.000,00`: 3.000 → 2.400; 5.000 → 4.000.
- **CT2** — DESENVOLVEDOR `< 3.000,00`: 2.999 → 2.699,10.
- **CT3** — DBA `>= 2.000,00`: 2.000 → 1.500.
- **CT4** — DBA `< 2.000,00`: 1.000 → 850.
- **CT5** — TESTADOR `>= 2.000,00`: 2.500 → 1.875.
- **CT6** — TESTADOR `< 2.000,00`: 1.999 → 1.699,15.
- **CT7** — GERENTE `>= 5.000,00`: 5.000 → 3.500.
- **CT8** — GERENTE `< 5.000,00`: 4.000 → 3.200.
- **CT9** — Cargo inválido → lança exceção.

---

export class Consumidor {

    private _nome: string;
    private _idade: number;
    private _email: string;

    constructor(nome: string, idade: number, email: string) {
        this.validarIdade(idade);
        this.validarEmail(email);
        this._nome = nome;
        this._idade = idade;
        this._email = email;
    }

    private validarIdade = (idade: number): void => {
        if (idade < 0 || idade > 150) {
            throw new Error(`Idade inválida: ${idade}. O valor deve estar entre 0 e 150.`);
        }
    }

    private validarEmail = (email: string): void => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            throw new Error(`Email inválido: ${email}`);
        }
    }

    public get nome(): string {
        return this._nome;
    }

    public get idade(): number {
        return this._idade;
    }

    public get email(): string {
        return this._email;
    }

    public apresentar = (): string => {
        return `Consumidor: ${this._nome} (${this._idade} anos) - ${this._email}`;
    }

    public editarNome = (nome: string): void => {
        this._nome = nome;
    }

    public editarEmail = (email: string): void => {
        this.validarEmail(email);
        this._email = email;
    }

    public static calcularMediaIdade = (consumidores: Consumidor[]): number => {
        if (consumidores.length === 0) return 0;
        const somaIdades = consumidores.reduce((acc, c) => acc + c.idade, 0);
        return somaIdades / consumidores.length;
    }

    public static obterExtremosIdade = (consumidores: Consumidor[]): { maisVelho: Consumidor | undefined; maisNovo: Consumidor | undefined } => {
        let maisVelho: Consumidor | undefined = consumidores[0];
        let maisNovo: Consumidor | undefined = consumidores[0];

        if (maisVelho != undefined && maisNovo != undefined) {
            for (const c of consumidores) {
                if (c.idade > maisVelho.idade) maisVelho = c;
                if (c.idade < maisNovo.idade) maisNovo = c;
            }
        }

        return { maisVelho, maisNovo };
    }
}

export class PUUID {

    private readonly value: string;

    private constructor(value: string) {

        if (!PUUID.isValid(value)) {

            throw new Error('invalid PUUID value: ${value}')
        }

        this.value = value
    }

    static of(value: string): PUUID {

        return new PUUID(value)
    }

    static isValid(value: string): boolean {

        return true // TODO some validations
    }

    getValue() {

        return this.value
    }

    toString() {

        return this.value
    }
}
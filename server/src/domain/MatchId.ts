export class MatchId {

    private readonly value: string;

    private constructor(value: string) {

        if (!MatchId.isValid(value)) {

            throw new Error('invalid MatchId value: ${value}')
        }

        this.value = value
    }

    static of(value: string): MatchId {

        return new MatchId(value)
    }

    static isValid(value: string): boolean {

        return true // TODO some validations
    }
}
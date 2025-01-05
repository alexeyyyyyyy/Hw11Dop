export default class StudentDto {
    readonly _id: number;
    private readonly _name: string;
    private readonly _password: string;
    private readonly _scores:Record<string, number>;


    constructor(id: number, name: string, password: string, scores: Record<string, number>) {
        this._id = id;
        this._name = name;
        this._password = password;
        this._scores = scores;


    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
    get password(): string {
        return this._password;
    }

    get scores(): Record<string, number> {
        return this._scores;
    }


}
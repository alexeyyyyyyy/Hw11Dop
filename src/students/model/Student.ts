export default class Student {
    readonly _id : number;
    _name: string;
    _password:string;
    private _scores: Record<string, number>;


    constructor(id: number, name: string, password: string, scores: Record<string, number>) {
        this._id = id;
        this._name = name;
        this._password = password;
        this._scores = scores;
    }

    set name(value: string) {
        this._name = value;
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

    set password(value: string) {
        this._password = value;
    }
    get scores(): Record<string, number> {
        return this._scores;
    }

    set scores(value: Record<string, number>) {
        this._scores = value;
    }


    addScore(examName:string,score:number):void {
        this._scores[examName]=score;
    }
}
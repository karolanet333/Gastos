export class SaldoEfectivo {
    constructor(
        public $key: string,
        public saldo: string,
    ){}

    static fromJson($key){
        return new SaldoEfectivo($key.$key, $key.saldo);
    }

    static fromJsonArray(json: any[]): SaldoEfectivo[]{
        return json.map(SaldoEfectivo.fromJson);
    }
}

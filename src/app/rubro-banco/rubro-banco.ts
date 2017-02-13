export class RubroBanco {
    constructor(
        public $key: string,
        public rubro: string,
        public rubro_lower: string
    ){}

    static fromJson($key){
        return new RubroBanco($key.$key, $key.rubro, $key.rubro_lower);
    }

    static fromJsonArray(json: any[]): RubroBanco[]{
        return json.map(RubroBanco.fromJson);
    }
}

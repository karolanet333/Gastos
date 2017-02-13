export class RubroEfectivo {
    constructor(
        public $key: string,
        public rubro: string,
        public rubro_lower: string
    ){}

    static fromJson($key){
        return new RubroEfectivo($key.$key, $key.rubro, $key.rubro_lower);
    }

    static fromJsonArray(json: any[]): RubroEfectivo[]{
        return json.map(RubroEfectivo.fromJson);
    }
}

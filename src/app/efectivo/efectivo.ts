import {GeneralHelper} from 'app/general-helper';
export class Efectivo {

    constructor(
        public $key: string,
        public rubro: string, //key del rubro-efectivo
        public efectivo: string,
        public fechaIngreso: string,
        public fechaMov: string,
        public monto: number,
        public signo: string,
        public saldo: number
    ){}

    static fromJson($key){

        //var fechaMov = GeneralHelper.getDateFromStr($key.fechaMov);

        return new Efectivo(
            $key.$key, 
            $key.rubro, 
            $key.efectivo, 
            $key.fechaIngreso, 
            $key.fechaMov, 
            $key.monto,
            $key.signo,
            $key.saldo
        );
    }

    static fromJsonArray(json: any[]): Efectivo[]{
        return json.map(Efectivo.fromJson);
    }
}

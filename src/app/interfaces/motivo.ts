// To parse this data:
//
//   import { Convert, Motivo } from "./file";
//
//   const motivo = Convert.toMotivo(json);

export interface Motivo {
    motivo:     number;
    des_motivo: string;
    estado:     string;
    tipo:       string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMotivo(json: string): Motivo {
        return JSON.parse(json);
    }

    public static motivoToJson(value: Motivo): string {
        return JSON.stringify(value);
    }
}

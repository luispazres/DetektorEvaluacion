export interface Motivo {
    id:         number;
    des_motivo: string;
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

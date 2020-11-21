import { Motivo } from '../interfaces/motivo';

export class MotivoModel implements Motivo {
    motivo:     number;
    des_motivo: string;
    estado:     string;
    tipo:       string;
}
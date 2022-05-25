import { Portador } from 'src/entities/Portador';

interface IPortadorRepository {
    create(entity: Partial<Portador>): Promise<Portador>;
    findByCpf(cpf: string): Promise<any>;
}

export { IPortadorRepository }

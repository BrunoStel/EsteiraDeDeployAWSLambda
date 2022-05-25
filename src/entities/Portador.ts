import { Document } from 'dynamoose/dist/Document'

export interface Portador extends Document  {
    portadorId?: string
    name: string
    cpf: string
    createdAt?: Date
    updatedAt?: Date
}
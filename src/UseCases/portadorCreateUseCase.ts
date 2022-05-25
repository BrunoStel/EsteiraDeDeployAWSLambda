import { IPortadorRepository } from '@repositories/Repository/IPortadorRepository';
import { cpf as cpfvalidator } from 'cpf-cnpj-validator';
import { SNS } from 'dynamoose/node_modules/aws-sdk';
import { AppError } from 'src/errors/AppError';
import { inject, injectable } from 'tsyringe';


@injectable()
class PortadorCreateUseCase {

    constructor(
        @inject("PortadorRepository")
        private portadorRepository: IPortadorRepository
    ) { }

    async execute(cpf: string, name: string): Promise<any> {

        console.log("Execute Use Case")

        const cpfValido = cpfvalidator.isValid(cpf)

        if (!cpfValido) {
            throw new AppError("Cpf invalid!")
        } 

        const cpfformatado = cpfvalidator.format(cpf)

        const portador = await this.portadorRepository.findByCpf(cpfformatado)


        if (portador) {
            throw new AppError("Portador already exists!")
        }

        await this.portadorRepository.create({ cpf: cpfformatado, name: name })

        await this.snsService(cpfformatado)

        return true
    }

    private async snsService(cpf: string): Promise<boolean> {
        let success = false
        try {
            const sns = new SNS()
            const msg = { cpf }
              await sns.publish({
                TopicArn: `arn:aws:sns:us-east-2:532362042466:create-account`,
                Subject: 'Create Account',
                Message: `${JSON.stringify(msg)}`
            }).promise()
            success = true
        } catch (error) {
            console.log(error)
        }
        return true;
    }
}

export { PortadorCreateUseCase }
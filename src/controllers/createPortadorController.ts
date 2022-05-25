import { ICreatePortadorDTO } from '@repositories/DTO/ICreatePortadorDTO'
import { AppError } from 'src/errors/AppError';
import { PortadorCreateUseCase } from 'src/UseCases/portadorCreateUseCase';
import { treatError } from 'src/utils/errors';
import { schemaCreatePortador } from 'src/utils/joiValidation';
import { container } from 'tsyringe';

class CreatePortadorController {
    
    async handler(event: any): Promise<any> {

        try {
            const { cpf, name, lastName }  = JSON.parse(event.body) as ICreatePortadorDTO
             
            const { error } = schemaCreatePortador.validate({ cpf: cpf, name: name, lastName: lastName })
            
            if (error) {
                throw new AppError(error.message)
            }

            const portadorCreateUseCase = container.resolve(PortadorCreateUseCase);

            const response = await portadorCreateUseCase.execute(cpf, `${name} ${lastName}`)

            return {
                statusCode: 201,
                body: JSON.stringify({ succes: response }),
                headers: { "Content-type": "application/json" },
            }

        } catch (err) {
            return treatError(err)
        }

    }
}

export { CreatePortadorController }
import "reflect-metadata";
import { CreatePortadorController } from 'src/controllers/createPortadorController';
import "../containers/index";

export const handler = async (event) => {

    const createPortadorController = new CreatePortadorController()
    const response = createPortadorController.handler(event)

    return response

};
import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvidaer = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();


const createUserUserCase = new CreateUserUseCase(
    postgresUsersRepository,
    mailtrapMailProvidaer
)

const createUserController = new CreateUserController(createUserUserCase);

export {createUserController, createUserUserCase}
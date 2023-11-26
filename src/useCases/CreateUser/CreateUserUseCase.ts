import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from './CreateUserDTO'
export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) { }
    async execute(data: ICreateUserRequestDTO) {

        const userAlreadyExist = await this.usersRepository.findByEmail(data.email);

        console.log('user: ', userAlreadyExist)

        if (userAlreadyExist) {
            throw new Error('User already exists.')
        }

        const user = new User(data);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
             from: {
                name: 'Equipe teste',
                email: 'equipe@email.com'
             },
             subject: 'Seja bem-vindo à plataforma',
             body: `<p> Você já pode fazer login na plataforma.</p>`
        })

        await this.usersRepository.save(user);
    }
}
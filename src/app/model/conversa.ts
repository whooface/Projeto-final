import { Mensagem } from '../model/mensagem'

export class Conversa {
    idConversa:string
    idDog:string
    users:Array<string> = []
    mensagens:Array<Mensagem> = []
}

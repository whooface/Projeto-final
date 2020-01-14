import { Mensagem } from '../model/mensagem'

export class Conversa {
    idConversa:number
    idDog:string
    users:Array<string>
    mensagens:Array<Mensagem> = []
}

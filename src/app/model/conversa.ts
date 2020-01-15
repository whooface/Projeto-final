import { Mensagem } from '../model/mensagem'

export class Conversa {
    idDog:string
    users:string[] = []
    mensagens:Array<Mensagem>
}

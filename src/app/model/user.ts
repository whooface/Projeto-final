import {Chat} from '../model/chat'
import {Notificacao} from '../model/notificacao'
export class User {

    nome:string;
    email:string;
    senha:string;
    foto:string;
    ativo:boolean = true;
    contatos:Array<Chat> = [];
    notificacoes:Array<Notificacao> = [];
    lat:number;
    lng:number;
    
}

import {Conversa} from '../model/conversa'
import {Notificacao} from '../model/notificacao'
export class User {

    nome:string;
    email:string;
    senha:string;
    foto:string;
    ativo:boolean = true;
    interessado:Array<string> = [] 
    conversas:Array<Conversa> = [];
    notificacoes:Array<Notificacao> = [];
    lat:number;
    lng:number;
    
}

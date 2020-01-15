const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
let conversas = []
io.on('connection',(io)=>{
    console.log(`Novo usuario conectado ${io.id}`)
    
    io.on('enviarMensagem',([msg,idConversa])=>{
       io.broadcast.in(idConversa).emit('mensagem', msg);
       resultado = conversas.find(obj => obj.idConversa == idConversa)
       resultado.mensagens.push(msg)
        //console.log(resultado.mensagens)

    })
    io.on('entrarSala', (idConversa)=>{
        io.join(idConversa)
        console.log(`${io.id} Entrou na sala ${idConversa}`)
    })
    io.on('sairSala', (idConversa)=>{
        io.leave(idConversa);
        console.log(`${io.id} Saiu da sala ${idConversa}`)
    })
    io.on('criarConversa',(conversa)=>{
          conversas.push(conversa)
          console.log(conversas)
          io.join(conversa.idConversa)
        })
    
    io.on('getMyConversas',(idUser)=>{
        
        resultado = conversas.filter(obj => obj.users[0] === idUser || obj.users[1] === idUser)
        console.log(resultado)
        
        io.emit('myConversas', resultado);
        
    })

    })
    

http.listen(3000,function(){
    console.log("Server Iniciado...")
})
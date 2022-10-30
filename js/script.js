let nome;
entrarNoChat();
carregarChat();
setInterval(carregarChat,3000);
setInterval(usuarioAtivo, 5000);
function carregarChat(){
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(function(resposta){
        
        let mensagens = resposta.data;
        let normais = document.querySelector('.pai-normais');
        let entraSai = document.querySelector('.pai-entra-sai');
        let divMensagens = document.querySelector('.mensagens');
        divMensagens.innerHTML= '';
        for(i=0; i< mensagens.length;i++){
            const tempoAtual = new Date();

            mensagem = mensagens[i];
            tempo = `<div class="tempo">(${tempoTransformado()})</div>`

            if(mensagem.text === 'sai da sala...' || mensagem.text === 'entra na sala...' ){
                divMensagens.innerHTML += `<div class="entra-sai">
                                            ${tempo}
                                            <div class="acao"> <b>${mensagem.from}</b> ${mensagem.text}</div>  
                                        </div>`;
            }
            else if(mensagem.to === "Todos"){
                divMensagens.innerHTML += `<div class="normais">
                                            ${tempo}
                                            <div class="acao"> <b>${mensagem.from}</b> para <b> ${mensagem.to}</b>: ${mensagem.text}</div>
                                        </div>`;
            }else if(nome === mensagem.to){
                divMensagens.innerHTML += `<div class="reservadamente">
                                                ${tempo}
                                                <div class="acao"> <b>${mensagem.from}</b> reservadamente para <b>${mensagem.to}</b>: ${mensagem.text}</div>  
                                            </div>`;
            }
            if(i === mensagens.length - 1){
                divMensagens.innerHTML += `<div class="margin"></div>`;
            }
        }

        document.querySelector('.margin').scrollIntoView(); 
    });

}

function logar(Msg){
    nome = prompt(Msg);
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', {name: nome})
        .then(function(resposta){
            
        })
        .catch(function(erro){
            
           logar('digite outro nome, pois este já está em uso'); 
        });
}
function entrarNoChat(){
    logar("Qual é o seu nome?");
    
}
function usuarioAtivo(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name:nome})
        .then(function(){
            
        });
    
}
function enviarMensagem(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
        from: nome,
	    to: "Todos",
	    text: document.querySelector('input').value,
	    type: "message"
    })
    .then(function(resposta)  {
        document.querySelector('input').value = "";
        carregarChat();
    })
    .catch(()=>window.location.reload());
}
function tempoTransformado(){
    let current = new Date();
    return( 
        ((current.getHours() < 10)?"0":"") + current.getHours() +
        ":" + ((current.getMinutes() < 10)?"0":"") + current.getMinutes() +
        ":" + ((current.getSeconds() < 10)?"0":"") + current.getSeconds()
        );
}

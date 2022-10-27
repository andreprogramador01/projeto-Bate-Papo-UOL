
entrarNoChat();
carregarChat();
// setInterval(carregarChat,3000);
function carregarChat(){
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(function(resposta){
        console.log(resposta.data);
        let mensagens = resposta.data;
        let normais = document.querySelector('.pai-normais');
        let entraSai = document.querySelector('.pai-entra-sai');
        let divMensagens = document.querySelector('.mensagens');
        divMensagens,innerHTML= '';
        for(i=0; i< mensagens.length;i++){
            const tempoAtual = new Date();

            mensagem = mensagens[i];
            tempo = `<div class="tempo">(${tempoAtual.getHours()}:${tempoAtual.getMinutes()}:${tempoAtual.getSeconds()})</div>`

            if(mensagem.text === 'sai da sala...' || mensagem.text === 'entra na sala...' ){
                divMensagens.innerHTML += `<div class="entra-sai">
                                            ${tempo}
                                            <div class="acao"> <b>${mensagem.from}</b> ${mensagem.text}</div>  
                                        </div>`;
            }
            else if(mensagem.to === "Todos"){
                divMensagens.innerHTML += `<div class="normais">
                                            ${tempo}
                                            <div class="acao"> <b>${mensagem.from}</b> para <b> ${mensagem.to}</b>: Bom dia</div>
                                        </div>`;
            }else{
                divMensagens.innerHTML += `<div class="reservadamente">
                                                ${tempo}
                                                <div class="acao"> <b>${mensagem.from}</b> reservadamente para <b>${mensagem.to}</b>: ${mensagem.text}</div>  
                                            </div>`;
            }
        }
        document.querySelector('body').scrollIntoView({block: "end"});
    });

}
function logar(){
    let nome = prompt("Qual é o seu nome?");
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', {name: nome})
        .then(function(resposta){
            console.log('novo');
        })
        .catch(function(erro){
            console.log('já esta logado por favor insira outro nome');
           logar(); 
        });
}
function entrarNoChat(){
    logar();
    
}

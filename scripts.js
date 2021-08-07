const URL_MESSAGES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages";
const URL_PARTICIPANTS = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants";
const URL_STATUS = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status";

let nickName;

entrarComNome()
buscarDados();

  function entrarComNome(){
    nickName = prompt('Qual o seu lindo nickname?');
    const data = {
      name: nickName
    };
    const promise = axios.post(URL_PARTICIPANTS, data);
    promise.then(tratarSucesso);
    promise.catch(tratarErro);
  }

  function manterLogado(){
    const name = {
      name: nickName
    }
    const promise = axios.post(URL_STATUS, name);
    promise.then(tratarSucesso);
  }setInterval(manterLogado, 5000);

  function tratarErro(resposta){
    if (resposta.response.status === 400){
     nickName = prompt("Usuário já existe! \nInsira outro nickname lindão:\n");
                   
     const data = {
      name: nickName
    };
    const promise = axios.post(URL_PARTICIPANTS, data);
    promise.then(tratarSucesso);
    promise.catch(tratarErro);
    }
  }

  function tratarSucesso(resposta){
    if(resposta.status === 200){
    }
  }

  function buscarDados(){
      const promise = axios.get(URL_MESSAGES);
      promise.then(renderizarMensagens);    
    }
    setInterval(buscarDados, 3000);
        
    function renderizarMensagens(resposta){
      let corpoDoChat = document.querySelector(".messages");
      let mensagem;
      corpoDoChat.innerHTML = " ";
      
      for(let i=0; i<resposta.data.length; i++){
        
        let time = resposta.data[i].time;
        let from = resposta.data[i].from;
        let to = resposta.data[i].to;
        let text = resposta.data[i].text;
      
        if(resposta.data[i].type === "status"){
          mensagem = `<p class="fundo-cinza"><time>(${time})</time> 
        <strong class="from">&nbsp${from}</strong>&nbsp${text}</p>`

        } if (resposta.data[i].type === "message"){
          mensagem = `<p class="fundo-branco"><time>(${time})</time> 
        <strong class="from">&nbsp${from}</strong>&nbsppara&nbsp 
        <strong class="to">${to}:&nbsp&nbsp</strong>
        ${text}</p>`

        } if (resposta.data[i].type === "private_message" && resposta.data[i].to === nickName){
          mensagem = `<p class="fundo-rosa"><time>(${time})</time> 
        <strong class="from">&nbsp${from}</strong>&nbspreservadamente para&nbsp 
        <strong class="to">${to}:&nbsp&nbsp</strong>
        ${text}</p>`
        } else{
        }
        corpoDoChat.innerHTML += mensagem  
      }
      scrollAteFinal();
    }
     

  function scrollAteFinal(){
  const pegarUltima = document.querySelector(".fim-das-mensagens");
  pegarUltima.scrollIntoView();
  }


  function enviarMensagem() {
    const minhaMensagem = document.querySelector("input").value;
  
    const mensagem = {
      from: nickName,
      to: "Todos",
      text: minhaMensagem,
      type: "message" // ou "private_message" para o bônus
    }
  
    let campoInput = document.querySelector("input");
    campoInput.value = "";  
    
    const promise = axios.post(URL_MESSAGES, mensagem);
        
    promise.then(tratarSucessoResposta);
    promise.catch(tratarErroResposta);
  }

  function tratarSucessoResposta(enviada){
    if(enviada.status === 200){
      buscarDados();
    }
  }
  function tratarErroResposta(naoEnviada){
    document.location.reload(true);
  }
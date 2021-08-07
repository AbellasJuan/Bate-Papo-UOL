
const URL_MESSAGES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages";
const URL_PARTICIPANTS = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants";
const URL_STATUS = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status";

let nickName;


buscarDados();
entrarComNome()

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
      corpoDoChat.innerHTML = " ";
      for(let i=0; i<resposta.data.length; i++){
  
        let time = resposta.data[i].time;
        let from = resposta.data[i].from;
        let to = resposta.data[i].to;
        let text = resposta.data[i].text;
      
        const mensagem = `<p><time>(${time})</time> 
        <strong class="from">&nbsp${from}</strong>&nbsppara&nbsp 
        <strong class="to">${to}:&nbsp&nbsp</strong>
        ${text}</p>`

        corpoDoChat.innerHTML += mensagem  
      }
      scrollAteFinal();
    }
     

  function scrollAteFinal(){
  const pegarUltima = document.querySelector(".fim-das-mensagens");
  pegarUltima.scrollIntoView();
  }


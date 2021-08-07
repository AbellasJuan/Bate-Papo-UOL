
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







// dar status online a cada .length.length.length. segundos
// fazer commit logo


// //mudar cores da mensagem

// if innerHTML contains entrar na sala ou saiu da sala classList.buscarDados("fundo-cinza")]

// .fundo-cinza{
//   background-color:
// }
//==================Primeira validação, criando campo login dinamicamente==================//

//Capturando os inputs com os ids necessários para resolução das verificações
let nome = document.getElementById("nome");
let sobrenome = document.getElementById("sobrenome");
let login = document.getElementById("login");

// Função para gerar o campo login com as validações solicitadas
function geraCampoLogin() {
  //Capturando o valor digitado nos campos nome e sobrenome
  let username = nome.value;
  let surname = sobrenome.value;

  //Atribuindo a variável 'Login auxiliar' a junção do nome e do sobrenome os separando por ponto,
  //utilizando a função trim() para retirar os espaços em branco caso o usuário digite nos campos.
  let loginAux = username.trim() + "." + surname.trim();

  //Atribuindo ao valor do campo login o resultado da string montada anteriormente e passando tudo
  //para o minúsculo, utilizando a função toLowerCase()
  login.value = loginAux.toLowerCase();
}

//Capturando os eventos de alteração dos inputs de nome e sobrenome e fazendo o preenchimento
//automático do valor do input 'login'
nome.addEventListener("input", geraCampoLogin);
sobrenome.addEventListener("input", geraCampoLogin);



//==================Segunda validação, preenchendo os dados de cep automaticamente==================//

//Capturando todos os inputs que serão utilizados para realizar esse processo de preenchimento
//automático
let cepErro = document.getElementById("cep-erro");
let numeroDeCaracteresCep = document.getElementById("cep-caracteres");
let endereco = document.getElementById("endereco");
let complemento = document.getElementById("complemento");
let bairro = document.getElementById("bairro");
let cidade = document.getElementById("cidade");
let estado = document.getElementById("estado");

//Função para permitir somente números e para aplicar uma máscara no campo do cep
function validarNumerosCep(input) {
  //Pegando o valor informado pelo usuário
  let numeroDoCep = input.value;

  //Aplicando máscara ao campo do cep
  //O primeiro valor entre os ( ) correspondem ao $1, o mesmo serve pro segundo.
  //no primeiro defino que o primeiros 5 dígitos devem ser números.
  //os três últimos devem dever ser números, porém o valor pode variar de 0 a 3.
  //Depois eu quebro essa string ao meio e adiciono o "-" entre as duas strings
  let cepComMascara = numeroDoCep.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");

  //Atualiza o valor do input do cep com apenas os números e o traço adicionado na etapa acima,
  //e permito apenas números e o caractere "-" dentro do input
  input.value = cepComMascara.replace(/[^\d-]/g, "");

  //Retira a máscara -> o caractere '-' colocado anteriormente
  let cepSoComNumeros = cepComMascara.replace(/\D/g, "");

  //Condição que verifica se o usuário digitou os 8 números do cpf
  if (cepSoComNumeros.length === 8) {
    //Fazendo chamada a API da viacep passando o cep digitado pelo usuário já tratado
    fetch(`https://viacep.com.br/ws/${cepSoComNumeros}/json/`)
      .then((response) => response.json())
      .then((data) => {
        //Caso o cep passando seja inválido, a API retorna um {data.erro: true}, nesse caso,
        //eu verifico se o data.erro for diferente de true, carrego as informações nos inputs,
        //e também adiciono a classe "d-none" a string do erro do cep, e do numero de caracteres.
        if (!data.erro) {
          input.value = cepComMascara;
          cepErro.classList.add("d-none");
          numeroDeCaracteresCep.classList.add("d-none");
          endereco.value = data.logradouro;
          complemento.value = data.complemento;
          bairro.value = data.bairro;
          cidade.value = data.localidade;
          estado.value = data.uf;
        } else {
          //Caso o data.erro retorne true, eu limpo os campos e removo a classe "d-none" ficando
          //ficando aparente ao usuário os problemas que tiveram no processo
          input.value = "";
          cepErro.classList.remove("d-none");
          endereco.value = "";
          complemento.value = "";
          bairro.value = "";
          cidade.value = "";
          estado.value = "";
        }
      })
      //Exceção que é lançada caso dê algum problema na API
      .catch((error) => {
        alert("Erro ao buscar os dados da API: " + error);
      });
    //Caso o cep passado tenha menos de 8 números, eu removo a classe "d-none", fazendo com que
    //o texto "digite 8 caracteres" fique aparente para o usuário
  } else if (cepSoComNumeros.length <= 7) {
    numeroDeCaracteresCep.classList.remove("d-none");
  }
}



//==================Terceira validação, habilitando checkbox pós rolagem==================//

//Captando os inputs do textarea e do checkbox para fazer as verificações
let textarea = document.getElementById("textarea");
let checkbox = document.getElementById("termos");

//Capturando o evento de scroll do textarea
textarea.addEventListener("scroll", () => {
  //Nesse if eu verifico se se o scroll chegou até o fim da rolagem
  //o textarea.scrollTop verifica a posição atual do topo da barra de rolagem;
  //o textarea.clientHeight retorna o tamanho do textarea, esse valor é fixo;
  //o textarea.scrollHeight é o valor total do scroll, e esse valor é alcançado somando
  // a posição atual do topo do scroll, junto com o tamanho do textarea que está visível
  // para o usuário.
  if (textarea.scrollTop + textarea.clientHeight >= textarea.scrollHeight) {
    //O usuário tendo rolado a barra até o fim, removo o atributo disabled
    //acrescentado no HTML anteriormente, para que possa ficar clicável
    checkbox.removeAttribute("disabled");
  }
});



//==================Quarta validação, carregando informações na outra tabela==================//

//Captando os campos necessários
let tabelaDados = document.getElementById("tabela-dados");
let formulario = document.getElementById("formulario");
let academia = document.getElementById("academia");
let professor = document.getElementById("professor");

//Esse código roda após o formulário for enviado, 
formulario.addEventListener("submit", (event) => {
  //Evita o comportamento padrão de formulários quando são enviados, que no caso é o recarregamento
  //da página.
  event.preventDefault;

  //Capturando o textContent dos campos de destino, e passando os valores informados pelo usuários
  document.getElementById("t-nome").textContent = document.getElementById("nome").value;
  document.getElementById("t-sobrenome").textContent = document.getElementById("sobrenome").value;
  document.getElementById("t-email").textContent = document.getElementById("email").value;
  document.getElementById("t-login").textContent = document.getElementById("login").value;
  document.getElementById("t-senha").textContent = document.getElementById("senha").value;
  document.getElementById("t-cep").textContent = document.getElementById("cep").value;
  document.getElementById("t-endereco").textContent = document.getElementById("endereco").value;
  document.getElementById("t-complemento").textContent = document.getElementById("complemento").value;
  document.getElementById("t-bairro").textContent = document.getElementById("bairro").value;
  document.getElementById("t-estado").textContent = document.getElementById("estado").value;
  document.getElementById("t-cidade").textContent = document.getElementById("cidade").value;
  document.getElementById("t-github").textContent = 'github.com/' + document.getElementById("github").value;
  //Este é um pouco diferente por ser um select, onde primeiro navego pelas opções do select
  //e depois consigo capiturar o text do index selecionado
  document.getElementById("t-academia").textContent = academia.options[academia.selectedIndex].text;
  document.getElementById("t-professor").textContent = professor.options[professor.selectedIndex].text;
  //Aqui utilizei o operador ternário, que funciona bem parecido com um if. Caso o usuário tenha selecinado
  //será impresso 'Sim', senão será impresso 'Não'.
  document.getElementById("t-termos").textContent = document.getElementById("termos").checked ? 'Sim' : 'Não';
  document.getElementById("t-info").textContent = document.getElementById("info-sim").checked ? 'Sim' : 'Não';

  //Limpo os dados do formulário
  formulario.reset();
  //Removo a classe que tira a visibilidade da tabela com todos os dados
  tabelaDados.classList.remove("d-none");

  //seto um timer de 100 milissegundos para redirecionar o usuário para a tabela com os dados
  //após o envio do formulário
  setTimeout(() => {
    tabelaDados.scrollIntoView();
  }, 100);
});

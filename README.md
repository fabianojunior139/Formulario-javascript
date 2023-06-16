 <h1 align="center">📃 Formulário com HTML, CSS com Bootstrap e Javascript</h1>

## ❔ Descrição do exercício

Nesse exercício estamos simulando o envio de um formulário.
Os campos requeridos já estão tratados diretamente no HTML com a propriedade "required" no input e serão testados pelo navegador no momento em que o submit for acionado.
Porém, algumas ações/modificações precisam ocorrer durante o preenchimento. Utilize JavaScript para que isso aconteça:

- O campo "Login" deve ser gerado automaticamente, em letras minúsculas, conforme o nome e o sobrenome da pessoa, no exato momento em que cada caractere for digitado (Login: nome.sobrenome).
- Os dados do endereço devem ser preenchidos automaticamente após o usuário informar o seu CEP. Caso o CEP informado seja inválido, o usuário precisa ser avisado (uma DIV com a mensagem de erro já está no HTML com o identificador "cep-erro").

A simulação do envio acontece assim que os dados preenchidos pelo usuário forem exibidos em uma tabela ao final da página (uma sessão com identificador "tabela-dados" e a própria tabela já estão criados no HTML).
Assim que submit do formulário for capturado pelo JavaScript e a tabela for preenchida com os dados dos inputs, o usuário deve receber um alerta de que as informações foram salvas. Nesse momento o formulário deve ser limpo para que possa ser reiniciado o ciclo da simulação.

Dicas:
* Utilize a função "addEventListener" (https://developer.mozilla.org/pt-BR/docs/Web/API/EventTarget/addEventListener)
* Webservice gratuito para consulta do CEP: https://viacep.com.br/
* Nesse trabalho não estão restritas as edições dos arquivos HTML e CSS. Se julgar necessário, o Bootstrap está aplicado ao projeto, o uso das classes e componentes do framework facilitarão o seu trabalho (https://getbootstrap.com/docs/5.3/getting-started/introduction/).

Bônus:
* Impeça que espaços em banco façam parte do login.
* Habilite o checkbox "Eu li e concordo os termos descritos acima" somente após a barra de rolagem chegar ao final do textarea.

## 🖥 Preview
https://tabela-periodica-two.vercel.app/

// Este arquivo é intencionalmente quase vazio.
// Ele precisa existir para que o navegador possa registrar o service worker para o Firebase Cloud Messaging.

// Scripts do Firebase serão importados e configurarão tudo o que for necessário.
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

// A configuração do Firebase será fornecida pelo navegador quando a página for carregada.
// O Firebase procurará um objeto de configuração aqui.
// Esta configuração é obtida de forma segura a partir do seu objeto de configuração do lado do cliente.
// **NÃO COLOQUE SUAS CREDENCIAIS DIRETAMENTE AQUI.**

// A inicialização é tratada pelo SDK do Firebase. Ele espera que a configuração
// seja passada para ele ou que ele a encontre. No nosso caso, o cliente a fornecerá.

self.addEventListener('fetch', () => {
  // Este ouvinte de fetch vazio (ou qualquer outro) garante que o service worker
  // seja considerado "ativo" e não seja encerrado pelo navegador.
});

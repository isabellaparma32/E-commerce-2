
// DECLARAÇÃO DE VARIÁVEIS 

let carrinho = [];

const precosProdutos = {
    'Terço São Bento': 70.00,
    'Bíblia Pastoral': 45.67,
    'Vela Santa Luzia': 9.90,
    'Imagem Nossa Senhora das Dores': 293.76,
    'Medalha Milagrosa': 29.90,
    'Crucifixo': 39.90,
    'Incenso Nossa Senhora Aparecida': 122.80,
    'Terço Santa Rita de Cassia': 69.70,
    'Bíblia Ave Maria': 95.84,
    'Catecismo da Igreja Catolica': 73.71,
    'Livro do tratado da verdadeira devoção À Santíssima Virgem': 16.73,
    'Camiseta Sagrado Coração': 49.90,
    'Chaveiro Emborrachado Imaculado Coração de Maria': 2.90,
    'Porta água benta DIVINO ESPIRITO SANTO': 137.90,
    'Camiseta de São José': 60.00,
    'Terço São Miguel Arcanjo': 79.90,
    'Terço Santa Teresinha': 57.00,
    'Terço São Jorge':  79.90,
    'Coroa Nossa Senhora das Lágrimas': 21.90,
    'Santo Antônio': 357.90,
    'Sagrado coração de JESUS E MARIA': 259.90,
    'Padre Pio de Pietrelcina': 274.90,
    'NOSSA SENHORA DE GUARDALUPE': 119.90,
    'São Bento': 250.00,

};


// 2. INICIALIZAÇÃO DA PÁGINA 

window.addEventListener('DOMContentLoaded', function () {
    // Liga a busca direto, sem barreiras
    configurarFiltroBusca();
    
    // Roda as outras funções do sistema
    try { gerenciarUsuario(); } catch(e) { console.log(e); }
    try { configurarCliqueCarrinho(); } catch(e) { console.log(e); }
});

// CONTROLE VISUAL DO CARRINHO (ABRIR/FECHAR)

function configurarCliqueCarrinho() {
    const botaoCarrinho = document.querySelector('.btn-carrinho');
    const janelaCarrinho = document.querySelector('.carrinho');

    if (botaoCarrinho && janelaCarrinho) {
        botaoCarrinho.addEventListener('click', function () {
            janelaCarrinho.classList.toggle('ativo');
        });
    }
}

// FUNÇÃO ADICIONAR PRODUTO 

function add(nomeProduto) {
    const itemExistente = carrinho.find(item => item.nome === nomeProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nomeProduto,
            preco: precosProdutos[nomeProduto] || 0.00,
            quantidade: 1
        });
    }

    // Abre o carrinho visualmente na tela
    const janelaCarrinho = document.querySelector('.carrinho');
    if (janelaCarrinho) {
        janelaCarrinho.classList.add('ativo');
    }

    atualizarInterfaceCarrinho();
    alert(nomeProduto + " adicionado ao carrinho!");
}


// FUNÇÃO REMOVER PRODUTO

function removerItem(nomeProduto) {
    const itemIndex = carrinho.findIndex(item => item.nome === nomeProduto);

    if (itemIndex !== -1) {
        carrinho[itemIndex].quantidade -= 1;
        if (carrinho[itemIndex].quantidade === 0) {
            carrinho.splice(itemIndex, 1);
        }
    }
    atualizarInterfaceCarrinho();
}


// ATUALIZAR A TELA DO CARRINHO

function atualizarInterfaceCarrinho() {
    const listaHtml = document.getElementById('lista');
    const totalHtml = document.getElementById('total');
    const contadorHtml = document.getElementById('contador');

    if (!listaHtml || !totalHtml || !contadorHtml) return;

    listaHtml.innerHTML = '';
    let totalGeral = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;
        totalItens += item.quantidade;

        const li = document.createElement('li');
        li.style.color = '#ffffff';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';

        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong> <span style="color: var(--laranja, #ff9900);">x${item.quantidade}</span>
                <br><small>R$ ${subtotal.toFixed(2).replace('.', ',')}</small>
            </div>
            <button onclick="removerItem('${item.nome}')" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 14px;">❌</button>
        `;
        listaHtml.appendChild(li);
    });

    totalHtml.textContent = `Total: R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
    contadorHtml.textContent = totalItens;
}


//  FINALIZAR COMPRA

function finalizar() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Obrigado por sua compra!");
    carrinho = [];
    atualizarInterfaceCarrinho();

    const janelaCarrinho = document.querySelector('.carrinho');
    if (janelaCarrinho) janelaCarrinho.classList.remove('ativo');
}


// GERENCIAMENTO DE USUÁRIO 

function gerenciarUsuario() {
    const nomeUserSpan = document.getElementById('nomeUser');
    if (!nomeUserSpan) return;

    // Padronizado para usar apenas a chave 'usuarioAtivo'
    const usuarioLogado = localStorage.getItem('usuarioAtivo');

    if (usuarioLogado) {
        nomeUserSpan.textContent = `Olá, ${usuarioLogado}`;
    } else {
        nomeUserSpan.textContent = "Olá, visitante";
    }
}

function sair() {
    localStorage.removeItem('usuarioAtivo');
    alert("Você saiu da sua conta.");
    window.location.reload();
}


//  SISTEMA DE CADASTRO E LOGIN

let modoLogin = false;

function acaoPrincipal() {
    if (modoLogin) {
        login();
    } else {
        cadastrar();
    }
}

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if (nome === "" || email === "" || senha === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    alert("Cadastro realizado com sucesso! Faça seu login.");
    trocarModo();
}

function login() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let emailSalvo = localStorage.getItem("email");
    let senhaSalva = localStorage.getItem("senha");
    let nomeSalvo = localStorage.getItem("nome");

    if (email === emailSalvo && senha === senhaSalva) {
        alert("Login realizado!");
        localStorage.setItem("usuarioAtivo", nomeSalvo || "Usuário");
        window.location.href = "index.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

function trocarModo() {
    const titulo = document.getElementById("titulo");
    const botao = document.getElementById("btnPrincipal");
    const link = document.getElementById("linkModo");
    const campoNome = document.getElementById("nome");

    modoLogin = !modoLogin;

    if (modoLogin) {
        titulo.textContent = "Login - Fogo da Fé";
        botao.textContent = "Entrar";
        link.textContent = "Criar uma conta";
        if (campoNome) campoNome.style.display = "none";
    } else {
        titulo.textContent = "Cadastro - Fogo da Fé";
        botao.textContent = "Criar conta";
        link.textContent = "Já tenho uma conta";
        if (campoNome) campoNome.style.display = "block";
    }
}


// TELA DE APRESENTAÇÃO E NAVEGAÇÃO

function entrarNaLoja() {
    const splash = document.getElementById('tela-apresentacao');
    const conteudo = document.getElementById('conteudo-principal');

    if (!splash || !conteudo) return;

    splash.style.transition = "opacity 0.8s ease";
    splash.style.opacity = "0";

    setTimeout(() => {
        splash.style.display = "none";
        conteudo.style.display = "block";
        conteudo.style.animation = "fadeIn 1s";
    }, 800);
}

function mostrar(categoria) {
    const tercos = document.getElementById("tercos");
    const santos = document.getElementById("santos");

    if (tercos) tercos.classList.remove("ativa");
    if (santos) santos.classList.remove("ativa");

    const alvo = document.getElementById(categoria);
    if (alvo) alvo.classList.add("ativa");
}


//   BARRA DE PESQUISA

function configurarFiltroBusca() {
    const barraPesquisa = document.getElementById('busca');
    const blocosProdutos = document.querySelectorAll('.card');

    console.log("Barra de pesquisa encontrada:", barraPesquisa);
    console.log("Quantidade de cards de produtos achados:", blocosProdutos.length);

    if (!barraPesquisa) {
        console.error("Erro: O JavaScript não encontrou o campo com id='busca'.");
        return;
    }

    if (blocosProdutos.length === 0) {
        console.warn("Aviso: O JavaScript não encontrou nenhum elemento com a classe '.card'.");
    }

    barraPesquisa.addEventListener('input', function () {
        const termoPesquisa = barraPesquisa.value.toLowerCase().trim();
        console.log("Digitando termo de busca:", termoPesquisa); 
        blocosProdutos.forEach(produto => {
            const tagNome = produto.querySelector('h3');
            
            if (tagNome) {
                const nomeProduto = tagNome.textContent.toLowerCase();

                if (nomeProduto.includes(termoPesquisa)) {
                    produto.style.setProperty('display', '', 'important'); 
                } else {
                    produto.style.setProperty('display', 'none', 'important');
                }
            }
        });
    });
}

// SISTEMA DE AVALIAÇÃO

mostrarAvaliacao();

function avaliarProduto() { 
    let avaliacao = Number(document.getElementById("avaliacao").value); 
 
    if (avaliacao > 5 || avaliacao < 0 || isNaN(avaliacao) || document.getElementById("avaliacao").value === "") { 
        document.getElementById("resultado").textContent = "Nota inválida! Digite um número entre 0 e 5."; 
        return; 
    } 
    localStorage.setItem("nota", avaliacao); 
 
    mostrarAvaliacao(); 
} 

function mostrarAvaliacao() { 
    let mostrarNota = localStorage.getItem("nota"); 
    
    // Se não houver nota salva, deixa o campo vazio
    if (mostrarNota === null) {
        document.getElementById("resultado").textContent = "";
        return;
    }

    let contador = 0; 
    let estrelas = ""; 
 
    while (contador < Number(mostrarNota)) { 
        estrelas += "🌟"; 
        contador++; 
    } 
    document.getElementById("resultado").textContent = estrelas; 
} 

function resetarAvaliacao() { 
    localStorage.removeItem("nota"); 
    document.getElementById("resultado").textContent = ""; 
    document.getElementById("avaliacao").value = ""; // Limpa o campo de input
}

// window.onload: É o evento que espera a
// página inteira carregar (HTML, CSS, imagens e scripts)
//  antes de rodar o seu código.

//addEventListener: É o "ouvinte" de eventos.
// Ele fica vigiando um elemento HTML e executa uma função sempre
//  que o usuário faz alguma ação (como clicar, digitar ou passar o mouse).

// classList é a propriedade que te dá acesso à lista de classes CSS de um elemento HTML.


//splash.style.transition: É a forma do JavaScript acessar a propriedade transition do CSS daquele elemento.

//opacity": Diz ao navegador que o efeito suave deve ser aplicado especificamente na propriedade
// de opacidade (visibilidade/transparência) do elemento.

//0.8s: Define o tempo de duração que esse efeito vai levar para acontecer (0.8 segundos).

//ease: Define o ritmo da animação. O valor ease faz com que o efeito comece mais lento, acelere no meio e termine lento novamente, deixando o movimento mais natural.

//splash.style.opacity = "0";
// Muda a opacidade do elemento para zero.
// Como a linha de cima foi ativada,
// o elemento splash começa a ficar transparente gradativamente durante 0.8 segundos.

//setTimeout(() => { ... }, 800);
// É uma função que espera um tempo
// determinado antes de rodar o código que está lá dentro.
// O 800 no final representa 800 milissegundos
// (exatamente os mesmos 0.8 segundos que a animação de cima demora para terminar).

//splash.style.display = "none";
//O que faz: Esconde o elemento splash por completo e o remove
// do espaço da tela. Mesmo invisível (com opacidade 0),
// ele ainda ocupava espaço; com display = "none", ele "deixa de existir" para o layout da página.

//conteudo.style.display = "block";
//O que faz: Faz o conteúdo principal da sua página
// (a loja) aparecer na tela, mudando o estado dele para visível.

//conteudo.style.animation = "fadeIn 1s";
//O que faz: Dispara uma animação CSS chamada fadeIn
//  (que deve estar criada no seu arquivo CSS) para fazer com que o conteúdo
// da loja também surja na tela de forma suave durante 1 segundo, em vez de aparecer de estalo.

//localStorage.getItem
//  é um método do JavaScript usado para buscar
// (ler) um dado que foi salvo anteriormente no navegador do usuário.


//O DOMContentLoaded é um evento do
// JavaScript que avisa quando o
// documento HTML da página foi totalmente carregado e processado pelo navegador.

//carrinho.forEach: Passa de item em item dentro
// da lista do carrinho para processar um produto por vez.

//subtotal: Multiplica o preço do produto
// pela quantidade dele para descobrir o valor total daquele item específico.

//totalGeral e totalItens: Somam o subtotal e
//  a quantidade de cada item a variáveis globais para,
// no final, sabermos o valor total da compra inteira e quantos produtos foram levados.

//document.createElement('li'): Cria um novo item de lista
// (<li>) na memória do JavaScript, que será usado para exibir o produto.

//li.style.color = '#ffffff':
// Aplica a cor branca diretamente no texto
// desse item para garantir que ele fique visível no layout escuro do site.

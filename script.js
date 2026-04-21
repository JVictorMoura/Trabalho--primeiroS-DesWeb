// Dados dos personagens
const personagens = {
  stark: { 
    nome: "Tony Stark", 
    descricao: "Gênio bilionário e inventor.",
    descricaoLonga: "Tony Stark é um gênio bilionário que usa sua inteligência e recursos para criar a armadura de Homem de Ferro. Brilhante, arrogante e inovador, ele nunca desiste de encontrar soluções tecnológicas para os maiores desafios do mundo. Sua criatividade e determinação o tornam insubstituível nos momentos de crise.",
    imagem: "imagens/stark.jpg",
    pontos: 0 
  },
  rogers: { 
    nome: "Steve Rogers", 
    descricao: "Líder justo e disciplinado.",
    descricaoLonga: "Steve Rogers é o Capitão América, um líder nascido em tempos de guerra que acredita nos princípios de justiça e honra. Com uma moral inabalável e lealdade inquestionável, ele inspira confiança em todos ao seu redor. Sua capacidade de liderar e fazer sacrifícios pessoais pelo bem comum o torna um herói verdadeiro.",
    imagem: "imagens/rogers.jpg",
    pontos: 0 
  },
  thor: { 
    nome: "Thor", 
    descricao: "Deus do trovão e guerreiro corajoso.",
    descricaoLonga: "Thor é o Deus Nórdico do trovão, um guerreiro poderoso de Asgard com força incomparável. Corajoso, protetor e dedicado, ele não hesita em enfrentar qualquer inimigo para proteger aqueles que ama. Sua conexão com seu povo e sua força bruta o tornam um guerreiro lendário.",
    imagem: "imagens/thor.jpg",
    pontos: 0 
  }
};

// Perguntas e respostas
const perguntas = [
  {
    texto: "Como você resolve problemas?",
    opcoes: [
      { texto: "Com estratégia", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Com justiça", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Agindo na hora", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "Qual é sua maior força?",
    opcoes: [
      { texto: "Inteligência", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Liderança", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Força bruta", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "Em uma crise, seu instinto é:",
    opcoes: [
      { texto: "Pensar numa solução", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Liderar o grupo", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Agir protetor", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "Como você lida com fracassos?",
    opcoes: [
      { texto: "Vejo como desafio para melhorar", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Aprendo e sigo adiante", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Fico bravo, mas insisto", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "O que mais te motiva?",
    opcoes: [
      { texto: "Inovação", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Ajudar as pessoas", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Liberdade", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "Como você se relaciona com regras?",
    opcoes: [
      { texto: "Sigo meu próprio caminho", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Respeito muito", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Não me importo muito", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "Que tipo de trabalho te atrai?",
    opcoes: [
      { texto: "Projetos desafiadores", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Ajudar a comunidade", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Atividades práticas", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "Como você trata seus amigos?",
    opcoes: [
      { texto: "Amigável mas arrogante", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Leal e honesto", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Protetor e dedicado", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "Seu maior medo?",
    opcoes: [
      { texto: "Ser irrelevante", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Trair meus princípios", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Não proteger quem amo", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  },
  {
    texto: "Se tivesse superpoder, seria?",
    opcoes: [
      { texto: "Criar qualquer tecnologia", pontos: { stark: 3, rogers: 1, thor: 1 } },
      { texto: "Ter sabedoria infinita", pontos: { stark: 1, rogers: 3, thor: 1 } },
      { texto: "Força infinita", pontos: { stark: 1, rogers: 1, thor: 3 } }
    ]
  }
];

// Variáveis de controle
let perguntaAtual = 0;
let respostaSelecionada = false;

// Função para começar o quiz
function comcarQuiz() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  mostrarPergunta();
}

// Função para mostrar a pergunta
function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  
  document.getElementById('numeroPergunta').textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
  document.getElementById('pergunta').textContent = pergunta.texto;
  
  const containerOpcoes = document.getElementById('opcoes');
  containerOpcoes.innerHTML = '';
  
  pergunta.opcoes.forEach((opcao, index) => {
    const botao = document.createElement('div');
    botao.className = 'opcao';
    botao.textContent = opcao.texto;
    botao.onclick = () => selecionarOpcao(index, botao);
    containerOpcoes.appendChild(botao);
  });
  
  respostaSelecionada = false;
  document.getElementById('btnProximo').disabled = true;
}

// Função para selecionar uma opção
function selecionarOpcao(index, elemento) {
  // Remove classe de todos
  document.querySelectorAll('.opcao').forEach(opt => opt.classList.remove('selecionada'));
  
  // Adiciona na opção clicada
  elemento.classList.add('selecionada');
  
  // Adiciona pontos
  const opcao = perguntas[perguntaAtual].opcoes[index];
  for (let id in opcao.pontos) {
    personagens[id].pontos += opcao.pontos[id];
  }
  
  respostaSelecionada = true;
  document.getElementById('btnProximo').disabled = false;
}

// Função próxima pergunta
function proxima() {
  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    mostrarPergunta();
  } else {
    finalizarQuiz();
  }
}

// Função para finalizar o quiz
function finalizarQuiz() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('resultado').style.display = 'block';
  
  // Encontra o personagem com mais pontos
  let vencedor = null;
  let maiorPontos = -1;
  
  for (let id in personagens) {
    if (personagens[id].pontos > maiorPontos) {
      maiorPontos = personagens[id].pontos;
      vencedor = personagens[id];
    }
  }
  
  document.getElementById('imagemResultado').src = vencedor.imagem;
  document.getElementById('nomeResultado').textContent = vencedor.nome;
  document.getElementById('descricaoResultado').textContent = vencedor.descricaoLonga;
  document.getElementById('pontuacaoResultado').textContent = `Pontuação: ${maiorPontos}`;
}

// Função para refazer o quiz
function refazer() {
  // Reseta pontos
  for (let id in personagens) {
    personagens[id].pontos = 0;
  }
  
  perguntaAtual = 0;
  respostaSelecionada = false;
  
  document.getElementById('resultado').style.display = 'none';
  document.getElementById('inicio').style.display = 'block';
}

// ==================== CLASSE PERSONAGEM ====================
class Personagem {
  constructor(nome, descricao, descricaoLonga, imagem) {
    this.nome = nome;
    this.descricao = descricao;
    this.descricaoLonga = descricaoLonga;
    this.imagem = imagem;
    this.pontos = 0;
  }

  adicionarPontos(pontos) {
    this.pontos += pontos;
  }

  resetarPontos() {
    this.pontos = 0;
  }
}

// ==================== CLASSE OPÇÃO ====================
class Opcao {
  constructor(texto, pontuacoes) {
    this.texto = texto;
    this.pontuacoes = pontuacoes; // { stark: 3, rogers: 1, thor: 1 }
  }

  obterPontuacao(personagemId) {
    return this.pontuacoes[personagemId] || 0;
  }
}

// ==================== CLASSE PERGUNTA ====================
class Pergunta {
  constructor(texto, opcoes) {
    this.texto = texto;
    this.opcoes = opcoes; // Array de objetos Opcao
  }

  obterOpcao(index) {
    return this.opcoes[index];
  }

  obterTotalOpcoes() {
    return this.opcoes.length;
  }
}

// ==================== CLASSE QUIZ ====================
class Quiz {
  constructor(personagens, perguntas) {
    this.personagens = personagens; // { stark: Personagem, rogers: Personagem, ... }
    this.perguntas = perguntas; // Array de Pergunta
    this.perguntaAtual = 0;
    this.respostaSelecionada = false;
  }

  iniciar() {
    this.perguntaAtual = 0;
    this.respostaSelecionada = false;
    this.resetarPontos();
  }

  resetarPontos() {
    for (let id in this.personagens) {
      this.personagens[id].resetarPontos();
    }
  }

  obterPerguntaAtual() {
    return this.perguntas[this.perguntaAtual];
  }

  obterNumeroPergunta() {
    return `Pergunta ${this.perguntaAtual + 1} de ${this.perguntas.length}`;
  }

  selecionarOpcao(indexOpcao) {
    const pergunta = this.obterPerguntaAtual();
    const opcao = pergunta.obterOpcao(indexOpcao);

    for (let id in this.personagens) {
      const pontos = opcao.obterPontuacao(id);
      this.personagens[id].adicionarPontos(pontos);
    }

    this.respostaSelecionada = true;
  }

  proximaPergunta() {
    if (this.perguntaAtual < this.perguntas.length - 1) {
      this.perguntaAtual++;
      this.respostaSelecionada = false;
      return false; // Ainda há perguntas
    }
    return true; // Quiz finalizado
  }

  obterVencedor() {
    let vencedor = null;
    let maiorPontos = -1;

    for (let id in this.personagens) {
      const personagem = this.personagens[id];
      if (personagem.pontos > maiorPontos) {
        maiorPontos = personagem.pontos;
        vencedor = personagem;
      }
    }

    return { personagem: vencedor, pontos: maiorPontos };
  }
}

// ==================== CLASSE UI MANAGER ====================
class UIManager {
  constructor(quiz) {
    this.quiz = quiz;
  }

  mostrarTela(telaId) {
    document.querySelectorAll('.tela').forEach(tela => {
      tela.style.display = 'none';
    });
    document.getElementById(telaId).style.display = 'block';
  }

  mostrarPergunta() {
    const pergunta = this.quiz.obterPerguntaAtual();

    document.getElementById('numeroPergunta').textContent = this.quiz.obterNumeroPergunta();
    document.getElementById('pergunta').textContent = pergunta.texto;

    const containerOpcoes = document.getElementById('opcoes');
    containerOpcoes.innerHTML = '';

    pergunta.opcoes.forEach((opcao, index) => {
      const botao = document.createElement('div');
      botao.className = 'opcao';
      botao.textContent = opcao.texto;
      botao.onclick = () => this.selecionarOpcao(index, botao);
      containerOpcoes.appendChild(botao);
    });

    this.quiz.respostaSelecionada = false;
    document.getElementById('btnProximo').disabled = true;
  }

  selecionarOpcao(index, elemento) {
    document.querySelectorAll('.opcao').forEach(opt => opt.classList.remove('selecionada'));
    elemento.classList.add('selecionada');

    this.quiz.selecionarOpcao(index);
    document.getElementById('btnProximo').disabled = false;
  }

  mostrarResultado() {
    const resultado = this.quiz.obterVencedor();
    const personagem = resultado.personagem;
    const pontos = resultado.pontos;

    document.getElementById('imagemResultado').src = personagem.imagem;
    document.getElementById('nomeResultado').textContent = personagem.nome;
    document.getElementById('descricaoResultado').textContent = personagem.descricaoLonga;
    document.getElementById('pontuacaoResultado').textContent = `Pontuação: ${pontos}`;
  }
}

// ==================== INICIALIZAÇÃO ====================

// Criando personagens
const personagens = {
  stark: new Personagem(
    "Tony Stark",
    "Gênio bilionário e inventor.",
    "Tony Stark é um gênio bilionário que usa sua inteligência e recursos para criar a armadura de Homem de Ferro. Brilhante, arrogante e inovador, ele nunca desiste de encontrar soluções tecnológicas para os maiores desafios do mundo. Sua criatividade e determinação o tornam insubstituível nos momentos de crise.",
    "imagens/stark.jpg"
  ),
  rogers: new Personagem(
    "Steve Rogers",
    "Líder justo e disciplinado.",
    "Steve Rogers é o Capitão América, um líder nascido em tempos de guerra que acredita nos princípios de justiça e honra. Com uma moral inabalável e lealdade inquestionável, ele inspira confiança em todos ao seu redor. Sua capacidade de liderar e fazer sacrifícios pessoais pelo bem comum o torna um herói verdadeiro.",
    "imagens/rogers.jpg"
  ),
  thor: new Personagem(
    "Thor",
    "Deus do trovão e guerreiro corajoso.",
    "Thor é o Deus Nórdico do trovão, um guerreiro poderoso de Asgard com força incomparável. Corajoso, protetor e dedicado, ele não hesita em enfrentar qualquer inimigo para proteger aqueles que ama. Sua conexão com seu povo e sua força bruta o tornam um guerreiro lendário.",
    "imagens/thor.jpg"
  )
};

// Criando perguntas e opções
const perguntas = [
  new Pergunta("Como você resolve problemas?", [
    new Opcao("Com estratégia", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Com justiça", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Agindo na hora", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("Qual é sua maior força?", [
    new Opcao("Inteligência", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Liderança", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Força bruta", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("Em uma crise, seu instinto é:", [
    new Opcao("Pensar numa solução", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Liderar o grupo", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Agir protetor", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("Como você lida com fracassos?", [
    new Opcao("Vejo como desafio para melhorar", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Aprendo e sigo adiante", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Fico bravo, mas insisto", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("O que mais te motiva?", [
    new Opcao("Inovação", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Ajudar as pessoas", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Liberdade", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("Como você se relaciona com regras?", [
    new Opcao("Sigo meu próprio caminho", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Respeito muito", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Não me importo muito", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("Que tipo de trabalho te atrai?", [
    new Opcao("Projetos desafiadores", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Ajudar a comunidade", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Atividades práticas", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("Como você trata seus amigos?", [
    new Opcao("Amigável mas arrogante", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Leal e honesto", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Protetor e dedicado", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("Seu maior medo?", [
    new Opcao("Ser irrelevante", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Trair meus princípios", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Não proteger quem amo", { stark: 1, rogers: 1, thor: 3 })
  ]),
  new Pergunta("Se tivesse superpoder, seria?", [
    new Opcao("Criar qualquer tecnologia", { stark: 3, rogers: 1, thor: 1 }),
    new Opcao("Ter sabedoria infinita", { stark: 1, rogers: 3, thor: 1 }),
    new Opcao("Força infinita", { stark: 1, rogers: 1, thor: 3 })
  ])
];

// Instanciando Quiz e UIManager
const quiz = new Quiz(personagens, perguntas);
const ui = new UIManager(quiz);

// ==================== FUNÇÕES GLOBAIS (Para compatibilidade com HTML) ====================

function comcarQuiz() {
  quiz.iniciar();
  ui.mostrarTela('quiz');
  ui.mostrarPergunta();
}

function proxima() {
  const quizFinalizado = quiz.proximaPergunta();
  
  if (quizFinalizado) {
    ui.mostrarTela('resultado');
    ui.mostrarResultado();
  } else {
    ui.mostrarPergunta();
  }
}

function refazer() {
  ui.mostrarTela('inicio');
}

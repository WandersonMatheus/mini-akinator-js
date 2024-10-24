async function carregarDados() {
    const personagens = await fetch('personagens.json').then(response => response.json());
    const perguntas = await fetch('perguntas.json').then(response => response.json());
    
    return { personagens, perguntas };
  }
  
  async function iniciarJogo() {
    let { personagens, perguntas } = await carregarDados();
    let personagensRestantes = personagens;
  
    for (let pergunta of perguntas) {
      // Pergunta ao usuário
      let resposta = prompt(pergunta + " (sim/não)").toLowerCase();
  
      // Verifica se a resposta é válida (sim ou não)
      while (resposta !== "sim" && resposta !== "não") {
        resposta = prompt("Por favor, responda apenas 'sim' ou 'não':").toLowerCase();
      }
  
      // Converte a resposta para booleano
      let boolResposta = resposta === "sim";
  
      // Filtra os personagens com base na resposta do usuário
      personagensRestantes = personagensRestantes.filter(personagem => personagem.caracteristicas[pergunta] === boolResposta);
  
      // Se restar apenas um personagem, o jogo pode adivinhar
      if (personagensRestantes.length === 1) {
        alert(`Você está pensando em ${personagensRestantes[0].nome}!`);
        return;
      }
    }
  
    // Se não restar nenhum personagem, ou restar mais de um, mas o jogo não adivinhar
    if (personagensRestantes.length === 0) {
      alert("Não consegui adivinhar o personagem.");
    } else {
      alert("Ainda não consegui determinar o personagem com essas perguntas.");
    }
  }
  
  window.onload = function() {
    iniciarJogo();
  };
  
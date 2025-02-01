// Cores para as prioridades
const corVermelha = "#CF3F3F"; // Para Alta
const corLaranja = "#FFBD3D"; // Para Média
const corVerde = "#72C240"; // Para Baixa

// Seleção do formulário e da lista de tarefas
const formTarefa = document.getElementById("formTarefa");
const taskList = document.querySelector(".contents");

// Função para gerar o HTML da nova tarefa
function createTaskElement(titulo, descricao, prioridade) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("containerTask");

    // Estrutura da tarefa
    taskElement.innerHTML = `
        <div class="informationTask">
            <div class="priorityLevel${prioridade}">${prioridade}</div>
            <time datetime="2025-01-31" class="date">31/01/2025</time>
            <div class="name">${titulo}</div>
        </div>
        <div class="nameDescriptionTask">
            <h2 class="title">${titulo}</h2>
            <div class="linha"></div>
            <p class="description">${descricao}</p>
        </div>
    `;

    // Retorna o elemento da nova tarefa
    return taskElement;
}

// Função que altera a cor de fundo de acordo com a prioridade
function setPriorityColor(taskElement) {
    const priorityElement = taskElement.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa");
    const priorityText = priorityElement.textContent.trim(); // Pega o texto da prioridade

    if (priorityText === "Alta") {
        priorityElement.style.backgroundColor = corVermelha; // Cor para "Alta"
    } else if (priorityText === "Média") {
        priorityElement.style.backgroundColor = corLaranja; // Cor para "Média"
    } else if (priorityText === "Baixa") {
        priorityElement.style.backgroundColor = corVerde; // Cor para "Baixa"
    }
}

// Função para ordenar as tarefas com base na prioridade
function sortTasksByPriority() {
    // Pega todas as tarefas da lista
    const tasks = document.querySelectorAll(".containerTask");

    // Função que atribui um valor para cada prioridade (1, 2 ou 3)
    const getPriorityValue = (taskElement) => {
        const priorityText = taskElement.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa").textContent.trim();
        if (priorityText === "Alta") return 1;
        if (priorityText === "Média") return 2;
        return 3; // Baixa
    };

    // Ordena as tarefas de acordo com a prioridade (Alta, Média, Baixa)
    const taskArray = Array.from(tasks);
    taskArray.sort((a, b) => getPriorityValue(a) - getPriorityValue(b));

    // Reorganiza as tarefas na lista
    taskArray.forEach(task => taskList.appendChild(task)); // Re-append as tasks em ordem correta
}

// Evento de envio do formulário (quando o usuário adicionar uma nova tarefa)
formTarefa.addEventListener("submit", (e) => {
    e.preventDefault(); // Previne o envio do formulário

    // Pega os valores do formulário
    const titulo = document.getElementById("tituloTarefa").value;
    const descricao = document.getElementById("descricaoTarefa").value;
    const prioridade = document.getElementById("prioridadeTarefa").value;

    // Cria o novo elemento da tarefa
    const newTask = createTaskElement(titulo, descricao, prioridade);

    // Adiciona a nova tarefa na lista
    taskList.appendChild(newTask);

    // Aplica a cor da prioridade à nova tarefa
    setPriorityColor(newTask);

    // Ordena a lista de tarefas com base na prioridade
    sortTasksByPriority();

    // Limpa os campos do formulário
    formTarefa.reset();
});

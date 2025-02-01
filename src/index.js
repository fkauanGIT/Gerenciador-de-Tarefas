const corVermelha = "#CF3F3F"
const corLaranja = "#FFBD3D"
const corVerde = "#72C240"

// Seleção do formulário e da lista de tarefas
const formTarefa = document.getElementById("formTarefa");
const taskList = document.querySelector(".contents");

//Criar a li da ul dinamicamente com base no que o usuário digita
function createHtmlLi(priority, date, name, titlle, description){
    const li = document.createElement("li")
    li.classList.add = ("containerTask")

    li.innerHTML = 
        `
            <li class="containerTask">
                <div class="informationTask">
                    <div class="priorityLevel${priority}">${priority}</div>
                    <time datetime="2012-12-12" class="${date}">${date}</time>
                    <div class="${name}">${name}</div>
                </div>
                <div class="nameDescriptionTask">
                    <h2 class="${titlle}">${titlle}</h2>
                    <div class="linha"></div>
                    <p class="${description}">${description}</p>
                </div>
            </li>
        `

    return li
}

// Função que altera a cor de fundo de acordo com a prioridade
function setPriorityColor(taskElement) {
    const priorityElement = taskElement.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa")
    const priorityText = priorityElement.textContent.trim()

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
    // Vai pegar todas as tarefas da lista
    const tasks = document.querySelectorAll(".containerTask")

    // Função que atribui um valor para cada prioridade (1, 2 ou 3)
    const getPriorityValue = (taskElement) => {
        const priorityText = taskElement.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa")
        const priorityElement = priorityText.textContent.trim()

        if(priorityElement === "Alta") return 1
        if(priorityElement === "Média") return 2
        return 3
    }

    //Ordenar do acordo com o nível de prioridade (Alta, Media, Baixa)
    const taskArray = Array.from(tasks)
    taskArray.sort((a,b) => {getPriorityValue(a) - getPriorityValue(b)})
    // Consequentemente pego os indices (1,2,3) e reordeno do menor para o maior 
    taskArray.forEach(task => taskList.appendChild(task))
    
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
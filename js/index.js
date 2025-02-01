const corVermelha = "#CF3F3F";
const corLaranja = "#FFBD3D";
const corVerde = "#72C240";

// Seleciona a lista de tarefas
const taskList = document.querySelector(".contents");

// Função que altera a cor de fundo de acordo com a prioridade
function setPriorityColor(taskElement) {
    const priorityElement = taskElement.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa");
    if (!priorityElement) return;

    const priorityText = priorityElement.textContent.trim();

    if (priorityText === "Alta") {
        priorityElement.style.backgroundColor = corVermelha;
    } else if (priorityText === "Média") {
        priorityElement.style.backgroundColor = corLaranja;
    } else if (priorityText === "Baixa") {
        priorityElement.style.backgroundColor = corVerde;
    }
}

// Função para ordenar as tarefas com base na prioridade
function sortTasksByPriority() {
    const tasks = document.querySelectorAll(".containerTask");

    const getPriorityValue = (taskElement) => {
        const priorityText = taskElement.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa");
        if (!priorityText) return 3;

        const priorityElement = priorityText.textContent.trim();

        if (priorityElement === "Alta") return 1;
        if (priorityElement === "Media") return 2;
        return 3;
    };

    const taskArray = Array.from(tasks);
    taskArray.sort((a, b) => getPriorityValue(a) - getPriorityValue(b));

    taskArray.forEach(task => taskList.appendChild(task));
}

// Aplica a cor e ordena as tarefas assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    // Para cada tarefa existente, altera a cor de fundo com base na prioridade
    const tasks = document.querySelectorAll(".containerTask");
    tasks.forEach(task => setPriorityColor(task));

    // Ordena as tarefas pela prioridade
    sortTasksByPriority();
});

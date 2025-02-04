const corVermelha = "#CF3F3F";
const corLaranja = "#FFBD3D";
const corVerde = "#72C240";

// Seleciona a lista de tarefas
const taskList = document.querySelector(".contents");
const tasks = document.querySelectorAll(".containerTask");

// Função que altera a cor de fundo de acordo com a prioridade
function setPriorityColor(taskElement) {
    const priorityElement = taskElement.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa");

    if (priorityElement) {
        const priority = priorityElement.textContent.trim();  // Obtém a prioridade do texto

        if (priority === "Alta") {
            priorityElement.style.backgroundColor = corVermelha;
        } else if (priority === "Média") {
            priorityElement.style.backgroundColor = corLaranja;
        } else if (priority === "Baixa") {
            priorityElement.style.backgroundColor = corVerde;
        }
    }
}

// Função para converter data de formato DD/MM/YYYY para o formato YYYY-MM-DD
function convertToDateFormat(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}

// Função para organizar as tarefas por prioridade e data
function arrangeAccordingToOrder() {
    // Converter a NodeList de tarefas para um array para poder usar o sort()
    const taskArray = Array.from(tasks);  // 'tasks' já contém todos os elementos de tarefa

    // Função para converter o texto de prioridade em um valor numérico
    function getPriorityValue(priorityText) {
        if (priorityText === "Alta") return 1;   // Alta = 1
        if (priorityText === "Média") return 2;  // Média = 2
        if (priorityText === "Baixa") return 3;  // Baixa = 3
        return 4;  // Caso a prioridade não seja reconhecida
    }

    // Função de comparação para ordenar as tarefas
    taskArray.sort((a, b) => {
        // Obtém o texto da prioridade para cada tarefa
        const priorityA = a.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa").textContent.trim();
        const priorityB = b.querySelector(".priorityLevelAlta, .priorityLevelMedia, .priorityLevelBaixa").textContent.trim();
        
        // Converte as prioridades em valores numéricos
        const priorityValueA = getPriorityValue(priorityA);
        const priorityValueB = getPriorityValue(priorityB);

        // Primeiro, compara as prioridades
        if (priorityValueA !== priorityValueB) {
            return priorityValueA - priorityValueB; // Ordena por prioridade
        }

        // Se as prioridades forem iguais, organiza por data
        const dateA = convertToDateFormat(a.querySelector(".date").textContent.trim());
        const dateB = convertToDateFormat(b.querySelector(".date").textContent.trim());

        // Ordena por data (ascendente)
        return dateA - dateB;  
    });

    // Agora que as tarefas estão ordenadas, reposiciona no DOM
    taskArray.forEach(task => taskList.appendChild(task)); // Reorganiza a lista de tarefas no DOM
}






// ser forms !!!!!

// Chame a função para organizar as tarefas quando necessário
document.addEventListener("DOMContentLoaded", function() {
    arrangeAccordingToOrder();  // Ordena as tarefas ao carregar a página
});

// Para cada tarefa existente, altera a cor de fundo com base na prioridade
tasks.forEach(task => setPriorityColor(task));


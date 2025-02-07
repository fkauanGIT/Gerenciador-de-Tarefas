export const setPriorityColor = (taskElement) => {
    const corVermelha = "#CF3F3F";
    const corLaranja = "#FFBD3D";
    const corVerde = "#72C240";

    const priorityElement = taskElement.querySelector(".priority");

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

export const arrangeAccordingToOrder = () => {
    const taskList = document.querySelector(".contents");
    const tasks = document.querySelectorAll(".containerTask");
    const taskArray = Array.from(tasks);
    const priorityMap = {"Alta": 1, "Média": 2, "Baixa": 3};

    taskArray.sort((a, b) => {
        const priorityA = a.querySelector(".priority").textContent.trim();
        const priorityB = b.querySelector(".priority").textContent.trim();

        const priorityValueA = priorityMap[priorityA];
        const priorityValueB = priorityMap[priorityB];

        if (priorityValueA !== priorityValueB) {
            return priorityValueA - priorityValueB; // Ordem crescente das prioridades
        }

        const dateA = a.querySelector(".date").textContent.trim();
        const dateB = b.querySelector(".date").textContent.trim();

        // Comparar datas, melhor fazer a conversão para formato de data
        const dateAParsed = new Date(dateA.split('/').reverse().join('-'));
        const dateBParsed = new Date(dateB.split('/').reverse().join('-'));

        return dateAParsed - dateBParsed; // Ordem crescente das datas
    });

    // Reorganiza as tarefas com a nova ordem
    taskArray.forEach(task => taskList.appendChild(task));
}

document.addEventListener('DOMContentLoaded', () => {
    // Chama as funções assim que o DOM estiver pronto

    // Obtém todas as tarefas (containerTask)
    const tasks = document.querySelectorAll('.div_containerTask');

    // Aplica a cor a cada tarefa
    tasks.forEach(task => {
        setPriorityColor(task);  // Passa cada task individualmente
    });

    // Organiza as tarefas por prioridade e data
    arrangeAccordingToOrder();
});

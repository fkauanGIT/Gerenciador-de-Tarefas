// Seleciona a lista de tarefas
const taskList = document.querySelector(".contents");
const tasks = document.querySelectorAll(".containerTask");



// Função que altera a cor de fundo de acordo com a prioridade
export const setPriorityColor = (taskElement) => {
    const corVermelha = "#CF3F3F";
    const corLaranja = "#FFBD3D";
    const corVerde = "#72C240";

    const priorityElement = taskElement.querySelectorAll(".priority");

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

    // Para cada tarefa existente, altera a cor de fundo com base na prioridade
    return tasks.forEach(task => setPriorityColor(task));
}

// Função para organizar as tarefas por prioridade e data
export const arrangeAccordingToOrder = () => {
    const taskArray = Array.from(tasks);
    const priorityMap = {"Alta": 1, "Média": 2, "Baixa": 3}

    taskArray.sort((a, b) => {
        //Pegar os nomes Alta, Média ou  baixa
        const priorityA = a.querySelector(".priority".textContent.trim())
        const priorityB = b.querySelector(".priority".textContent.trim())

        //Converter o obejeto em número
        const priorityValueA = priorityMap[priorityA]
        const priorityValueB = priorityMap[priorityB]

        //comparação de acordo com a prioridade
        if(priorityValueA !== priorityValueB) {
            return priorityA - priorityB
        }

        //Se prioridades iguais compara entre datas
        const dateA = a.querySelector(".date".textContent.trim())
        const dateB = b.querySelector(".date".textContent.trim())

        return dateA - dateB
    })

    return taskArray.forEach(task => taskList.appendChild(task))
}




let taskLi = []

//Função para organizar por cor
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

//Função para organizar por prioridade, data e criar o li
export const arrangeAccordingToOrder = () => {
    const taskList = document.querySelector(".contents");
    

    taskLi.sort((a, b) => {
        const priorityMap = {"Alta": 1, "Média": 2, "Baixa": 3};
        const priorityA = priorityMap[a.priority]
        const priorityB = priorityMap[b.priority]

        if (priorityA !== priorityB) {
            return priorityA - priorityB; // Ordem crescente das prioridades
        }

        const dateAParsed = new Date(a.date)
        const dateBParsed = new Date(b.date)

        return dateAParsed - dateBParsed; // Ordem crescente das datas
    });

    // Reorganiza as tarefas com a nova ordem
    taskList.innerHTML = ''
    taskLi.forEach(task => {
        const Task = document.createElement("li");
        Task.classList.add("containerTask");
        Task.innerHTML = `
        <div class="div_containerTask">
            <div class="informationTask">
                <div class="priority priority-${task.priority.toLowerCase()}">${task.priority}</div>
                <div class="date">${task.date}</div>
                <ul class="responsabilitys">
                    ${task.responsabilities.map(responsible => `<li class="name">${responsible}</li>`).join('')}
                </ul>
            </div>
            <div class="nameDescriptionTask">
                <h2 class="title">${task.title}</h2>
                <p class="description">${task.description}</p>
            </div>
        </div>
        `;

        taskList.appendChild(Task);
    })

    document.querySelectorAll(".containerTask").forEach(setPriorityColor)
}

//Função de criar fomulário
export const createFormAdd = () => {
    const title_form = document.getElementById("title_form").value;
    const priority = document.getElementById("priority").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    const responsabilitys = [];
    const checkboxes = document.querySelectorAll("input[name='responsability']:checked");
    checkboxes.forEach(checkbox => {
        responsabilitys.push(checkbox.value);
    });

    const newTask = {
        title: title_form,
        priority: priority,
        date: date,
        description: description,
        responsabilities: responsabilitys,
    };
    
    taskLi.push(newTask);

    arrangeAccordingToOrder()
};
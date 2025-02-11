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
        const priorityMap = { "Alta": 1, "Média": 2, "Baixa": 3 };
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
        Task.setAttribute("data-id", task.id);

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

        <div class="trash">
                <svg class="delete-task bi bi-trash3" data-id="${task.id}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
        </div>
        `;

        taskList.appendChild(Task);
    })

    document.querySelectorAll(".delete-task").forEach(trash => {
        trash.addEventListener("click", (event) => {
            const taskElement = event.target.closest(".containerTask"); 
            const taskId = taskElement.getAttribute("data-id");
    
            if (taskElement) {
                taskElement.remove(); 
            }
    
            taskLi = taskLi.filter(task => task.id !== taskId); 
        });
    });

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
        id: crypto.randomUUID(),
        title: title_form,
        priority: priority,
        date: date,
        description: description,
        responsabilities: responsabilitys,
    };

    taskLi.push(newTask);

    arrangeAccordingToOrder()
};
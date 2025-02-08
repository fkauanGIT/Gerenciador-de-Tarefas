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

        // Reformatando as datas para o formato 'YYYY-MM-DD'
        const [dayA, monthA, yearA] = dateA.split('/');
        const [dayB, monthB, yearB] = dateB.split('/');
        
        const dateAParsed = new Date(`${yearA}-${monthA}-${dayA}`);
        const dateBParsed = new Date(`${yearB}-${monthB}-${dayB}`);

        return dateAParsed - dateBParsed; // Ordem crescente das datas
    });

    // Reorganiza as tarefas com a nova ordem
    taskArray.forEach(task => taskList.appendChild(task));
}

export const createFormAdd = () => {
    const taskList = document.querySelector(".contents");
    const title_form = document.getElementById("title_form").value;
    const priority = document.getElementById("priority").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    const responsabilitys = [];
    const checkboxes = document.querySelectorAll("input[name='responsability']:checked");
    checkboxes.forEach(checkbox => {
        responsabilitys.push(checkbox.value);
    });

    const Task = document.createElement("li");
    Task.classList.add("containerTask");

    Task.innerHTML = `
    <div class="div_containerTask">
        <div class="informationTask">
            <div class="priority priority-${priority.toLowerCase()}">${priority}</div>
            <div class="date">${date}</div>
            <ul class="responsabilitys">
                    ${responsabilitys.map(responsible => `<li class="name">${responsible}</li>`).join('')}
            </ul>
        </div>
        <div class="nameDescriptionTask">
            <h2 class="title">${title_form}</h2>
            <p class="description">${description}</p>
        </div>
    </div>
    `;
    
    taskList.appendChild(Task);
};
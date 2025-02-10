import { setPriorityColor, arrangeAccordingToOrder, createFormAdd } from './constantes.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();  

        createFormAdd(); // Cria e adiciona a tarefa ao array

        e.target.reset(); // Reseta o formulário
    });
});

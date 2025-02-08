import { setPriorityColor, arrangeAccordingToOrder, createFormAdd } from './constantes.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();  

        createFormAdd(); 

        document.querySelectorAll(".containerTask").forEach(setPriorityColor);
        arrangeAccordingToOrder(); 

        e.target.reset(); 
    });
});

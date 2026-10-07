let contador = 0;

const botao = document.querySelector("button#botao");
const botao2 = document.querySelector("button#botao2");
const area = document.querySelector("#area");
const texto = document.querySelector("#texto");
const texto1 = document.querySelector("#texto1");
const contadorElemento = document.querySelector("#contador");

// CLICK
botao.addEventListener("click", function() {
    texto.textContent = "Clicaste no botão!";
    contador++;
    contadorElemento.textContent = contador;
});

// DBLCLICK
botao2.addEventListener("dblclick", function() {
    texto.textContent = "Fizeste duplo clique!";

});

// MOUSEOVER
area.addEventListener("mouseover", function() {
    texto1.textContent = "O rato entrou na área!";
    area.style.backgroundColor = "lightgreen";

});

// MOUSEOUT
area.addEventListener("mouseout", function() {
    texto.textContent = "O rato saiu da área!";
    area.style.backgroundColor = "lightgray";

});

// MOUSEMOVE
area.addEventListener("mousemove", function() {
    texto.textContent = "Estás a mover o rato!";

});

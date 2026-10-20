const evento1 = document.querySelector("p#evento1");
const botao1 = document.querySelector("button#botao1");
const botao2 = document.querySelector("button#botao2");
const botao3 = document.querySelector("button#botao3");
const texto2 = document.querySelector("span#texto2");
const input = document.querySelector("input#input1");
const botao4 = document.querySelector("button#botao4");
const input2 = document.querySelector("input#input2");
const body = document.querySelector("body");
const botao5 = document.querySelector("button#botao5");
const textContador = document.querySelector("span#contador");
const evento4 = document.querySelector("select#cor");
const input3 = document.querySelector("input#input3");
const input4 = document.querySelector("input#input4");
// const botao6=document.querySelector("button#botao6")
const mensagem = document.querySelector("span#mensagem");
const contadorAutomatico = document.querySelector("span#contadorAutomatico");

const direcao = document.querySelector("#direcao");
const container = document.querySelector("#container");

const cores = ["lightgray", "lightblue", "lightgreen", "lightyellow"];
let contador = 0;
let contador2 = 33;
let contador3 = 0;

evento1.addEventListener("mouseover", () => {
  evento1.textContent = "obrigado por passar!";
});

evento1.addEventListener("mouseout", () => {
  evento1.textContent = "Passa por aqui!";
});

document.querySelectorAll("button.botao").forEach((e) => {
  e.addEventListener("click", () => {
    texto2.style.color = e.dataset.color;
  });
});

input.addEventListener("keydown", () => {
  input.style.backgroundColor = cores[contador % 5];
  contador++;
});

evento4.addEventListener("change", () => {
  let texto = evento4.value;
  body.style.backgroundColor = texto;
});

botao4.addEventListener("click", () => {
  let texto = input2.value;
  body.style.backgroundColor = texto;
});

botao5.addEventListener("click", () => {
  contador2++;
  textContador.textContent = contador2;
});

document.querySelector("form").onsubmit = (e) => {
  e.preventDefault(); // para não recarregar a página

  let nome = document.querySelector("#input3").value;
  let idade = document.querySelector("#input4").value;

  document.querySelector("#mensagem").textContent =
    `Olá, o ${nome} tem ${idade} anos!`;
};

setInterval(() => {
  contador3++;
  contadorAutomatico.textContent = contador3;
}, 1000);

direcao.addEventListener("change", () => {
  container.style.flexDirection = direcao.value;
});

// Inicializar o contador se ainda não existir
if (localStorage.getItem("counter") === null) {
  localStorage.setItem("counter", 0);
}

let contador5 = document.querySelector("h1#contadorr");

contador5.textContent = localStorage.getItem("counter");
contador5.textContent = localStorage.getItem("counter");

// Incrementar
document.querySelector("#incrementar").addEventListener("click", () => {
  let valor = Number(localStorage.getItem("counter"));
  valor++;

  localStorage.setItem("counter", valor);
  contador5.textContent = valor;
});

// Decrementar
document.querySelector("#decrementar").addEventListener("click", () => {
  let valor = Number(localStorage.getItem("counter"));
  valor--;

  localStorage.setItem("counter", valor);
  contador5.textContent = valor;
});

// Reset
document.querySelector("#reset").addEventListener("click", () => {
  localStorage.setItem("counter", 0);
  contador5.textContent = 0;
});

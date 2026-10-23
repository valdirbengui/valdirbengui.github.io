
 // Declaração de variáveis
const form = document.querySelector("form");
const texto = document.querySelector("h3 span");
const texto1 = document.querySelector("h3 span#texto2");
const nodeInputNumero = document.querySelector("input#numero");
const nodeInputSubmit = document.querySelector("input#botao");
const nodeUlColecao = document.querySelector("ul");
const nodeUlColecao2 = document.querySelector("ul#lista2");
const colecao = [];
const repetidos = [];
const total = document.querySelector("p#total");
const totalRepetidos = document.querySelector("span#total2");

let contador = 0;

// B. Event handlers

function guardaCarta() {
    let valor = Number(nodeInputNumero.value);

    if (!colecao.includes(valor)) {
        colecao.push(valor);
        colecao.sort((a, b) => a - b);
    } else {
        repetidos.push(valor);
        repetidos.sort((a, b) => a - b);
    }
}

function atualizaLista(colecao, nodeUlColecao) {
    // Atualizar a lista de cromos únicos
    nodeUlColecao.innerHTML = "";

    colecao.forEach((elementoAtual) => {
        let novoLi = document.createElement("li");
        novoLi.textContent = elementoAtual;
        nodeUlColecao.appendChild(novoLi);
    });

    // Atualizar a lista de cromos repetidos
    nodeUlColecao2.innerHTML = "";

    repetidos.forEach((elementoAtual, indice) => {
        nodeUlColecao2.innerHTML += `
            <li>
                ${elementoAtual}
                <button class="eliminar" data-indice="${indice}">
                    Eliminar
                </button>
            </li>
        `;
    });

    // Atualizar o total de cromos repetidos
    totalRepetidos.textContent = repetidos.length;

    // Associar eventos aos botões de eliminar
    const botoesEliminar = document.querySelectorAll(".eliminar");

    botoesEliminar.forEach((botao) => {
        botao.addEventListener("click", () => {
            const indice = Number(botao.dataset.indice);

            // Remover apenas uma ocorrência
            repetidos.splice(indice, 1);

            // Atualizar a renderização
            atualizaLista(colecao, nodeUlColecao);
        });
    });
}

// C. Event listeners

form.onsubmit = (event) => {
    event.preventDefault();

    guardaCarta();

    atualizaLista(colecao, nodeUlColecao);

    contador++;

    total.textContent = contador;
    texto.textContent = contador;

    // Limpar o campo depois do registo
    nodeInputNumero.value = "";
};

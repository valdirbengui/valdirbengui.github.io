
// A. Estado e variáveis com referência de elementos do DOM

const divProdutos = document.querySelector("#produtos");
const divSelecionados = document.querySelector("#produtos-selecionados");
const custoTotal = document.querySelector("#custo-total");

// Criar a lista no localStorage caso não exista

if (localStorage.getItem("produtos-selecionados") === null) {
    localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}


// B. Funções utilitárias

function criarProduto(produto) {
    const article = document.createElement("article");

    const imagem = document.createElement("img");
    imagem.src = produto.image;

    const titulo = document.createElement("h3");
    titulo.textContent = produto.title;

    const descricao = document.createElement("p");
    descricao.textContent = produto.description;

    const preco = document.createElement("p");
    preco.textContent = "Preço: " + produto.price + " €";

    const botao = document.createElement("button");
    botao.textContent = "+ Adicionar ao cesto";

    botao.addEventListener("click", function () {
        adicionarProduto(produto);
    });

    article.append(imagem, titulo, descricao, preco, botao);

    return article;
}


// C. Event handlers

function renderizarProdutos(produtos) {
    produtos.forEach(produto => {
        const article = criarProduto(produto);
        divProdutos.append(article);
    });
}

function adicionarProduto(produto) {
    const produtosSelecionados = JSON.parse(
        localStorage.getItem("produtos-selecionados")
    ) || [];

    produtosSelecionados.push(produto);

    localStorage.setItem(
        "produtos-selecionados",
        JSON.stringify(produtosSelecionados)
    );

    atualizaCesto();
}


// D. Cesto de compras

function atualizaCesto() {
    const produtosSelecionados = JSON.parse(
        localStorage.getItem("produtos-selecionados")
    ) || [];

    divSelecionados.innerHTML = "";

    let total = 0;

    produtosSelecionados.forEach((produto, index) => {
        const article = criaProdutoCesto(produto, index);

        divSelecionados.append(article);

        total += Number(produto.price);
    });

    custoTotal.textContent = total.toFixed(2) + " €";
}


function criaProdutoCesto(produto, index) {
    const article = document.createElement("article");

    const imagem = document.createElement("img");
    imagem.src = produto.image;

    const titulo = document.createElement("h3");
    titulo.textContent = produto.title;

    const preco = document.createElement("p");
    preco.textContent = produto.price + " €";

    const botao = document.createElement("button");
    botao.textContent = "Remover do cesto";

    botao.addEventListener("click", function () {
        const produtosSelecionados = JSON.parse(
            localStorage.getItem("produtos-selecionados")
        ) || [];

        produtosSelecionados.splice(index, 1);

        localStorage.setItem(
            "produtos-selecionados",
            JSON.stringify(produtosSelecionados)
        );

        atualizaCesto();
    });

    article.append(imagem, titulo, preco, botao);

    return article;
}


// E. Inicialização

if (divProdutos) {
    renderizarProdutos(produtos);
}

if (divSelecionados) {
    atualizaCesto();
}

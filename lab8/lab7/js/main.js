
/* =====================================================
   A. ESTADO E VARIÁVEIS COM REFERÊNCIA A ELEMENTOS DO DOM
   ===================================================== */

// Procura no HTML o elemento que contém os produtos disponíveis.
const divProdutos = document.querySelector("#produtos");

// Procura no HTML o elemento onde serão apresentados os produtos do carrinho.
const divSelecionados = document.querySelector("#produtos-selecionados");

// Procura o elemento que apresenta o custo total do carrinho.
const custoTotal = document.querySelector("#custo-total");

// Guarda a referência ao select responsável pela categoria.
const pegarValor = document.querySelector("#categoria");

// Guarda a referência à secção que contém os filtros.
const seccao = document.querySelector("#bla");

// Guarda a referência ao select responsável pela ordenação.
const pegarValorOrdenar = document.querySelector("#ordenar");


// Elementos relacionados com a finalização da compra.

// Guarda a referência à checkbox que indica se o utilizador é estudante.
const estudante = document.querySelector("#estudante");

// Guarda a referência ao input onde será introduzido o cupão.
const cupao = document.querySelector("#cupao");

// Guarda a referência ao input onde será introduzido o nome.
const nome = document.querySelector("#nome");

// Guarda a referência ao botão que permite efetuar a compra.
const botaoComprar = document.querySelector("#comprar");

// Guarda a referência ao elemento onde será apresentado o valor final.
const valorFinal = document.querySelector("#valor-final");

// Guarda a referência ao elemento onde será apresentada a referência de pagamento.
const referenciaPagamento = document.querySelector("#referencia-pagamento");



/* =====================================================
   CRIAR A LISTA NO LOCALSTORAGE CASO NÃO EXISTA
   ===================================================== */

// Verifica se já existe uma lista de produtos selecionados no localStorage.
if (localStorage.getItem("produtos-selecionados") === null) {

    // Se não existir, cria uma lista vazia e guarda-a no localStorage.
    // JSON.stringify transforma o array JavaScript numa string JSON.
    localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}



/* =====================================================
   OBTER OS PRODUTOS ATRAVÉS DA API
   ===================================================== */

// Faz um pedido HTTP GET ao endpoint responsável por devolver os produtos.
fetch("https://deisishop.pw.deisi.ulusofona.pt/products")

    // Converte a resposta recebida da API para o formato JSON.
    .then(response => response.json())

    // Recebe a lista de produtos devolvida pela API.
    .then(products => {

        // Envia a lista de produtos para a função responsável pela renderização.
        renderizarProdutos(products);
    })

    // Captura possíveis erros durante o pedido à API.
    .catch(error => {

        // Apresenta o erro na consola do navegador.
        console.error("Erro ao obter produtos:", error);
    });



/* =====================================================
   B. FUNÇÕES UTILITÁRIAS
   ===================================================== */

// Função responsável por criar visualmente um produto.
function criarProduto(produto) {

    // Cria um elemento HTML article.
    const article = document.createElement("article");

    // Cria um elemento HTML img para apresentar a imagem do produto.
    const imagem = document.createElement("img");

    // Define o endereço da imagem.
    // Junta o endereço base da API com o caminho da imagem.
    imagem.src = "https://deisishop.pw.deisi.ulusofona.pt" + produto.image;

    // Cria um elemento h3 para apresentar o título do produto.
    const titulo = document.createElement("h3");

    // Coloca o título recebido da API dentro do elemento h3.
    titulo.textContent = produto.title;

    // Cria um parágrafo para apresentar a descrição.
    const descricao = document.createElement("p");

    // Coloca a descrição do produto dentro do parágrafo.
    descricao.textContent = produto.description;

    // Cria um parágrafo para apresentar o preço.
    const preco = document.createElement("p");

    // Apresenta o preço acompanhado da moeda euro.
    preco.textContent = "Preço: " + produto.price + " €";

    // Cria um botão para adicionar o produto ao carrinho.
    const botao = document.createElement("button");

    // Define o texto que aparece no botão.
    botao.textContent = "+ Adicionar ao cesto";

    // Adiciona um evento de clique ao botão.
    botao.addEventListener("click", function () {

        // Quando o botão é clicado, chama a função adicionarProduto.
        // Envia o objeto produto como argumento.
        adicionarProduto(produto);
    });

    // Coloca todos os elementos criados dentro do article.
    article.append(imagem, titulo, descricao, preco, botao);

    // Devolve o article completo para poder ser utilizado noutras funções.
    return article;
}



/* =====================================================
   C. EVENT HANDLERS E RENDERIZAÇÃO DOS PRODUTOS
   ===================================================== */

// Recebe a lista de produtos obtida através da API.
function renderizarProdutos(produtos) {

    // Função interna responsável por apresentar uma lista de produtos no HTML.
    function mostrarProdutos(lista) {

        // Apaga todos os produtos que estão atualmente dentro da div.
        divProdutos.innerHTML = "";

        // Percorre todos os produtos existentes na lista recebida.
        lista.forEach(produto => {

            // Cria o elemento HTML correspondente ao produto atual.
            const article = criarProduto(produto);

            // Adiciona o article criado à div dos produtos.
            divProdutos.append(article);
        });
    }

    // Apresenta inicialmente todos os produtos recebidos da API.
    mostrarProdutos(produtos);


    // FILTROS DE CATEGORIA E ORDENAÇÃO

    // Adiciona um evento change à secção que contém os selects.
    // O evento é acionado quando um dos selects sofre uma alteração.
    seccao.addEventListener("change", () => {

        // Obtém o valor atualmente selecionado na categoria.
        const categoriaSelecionada = pegarValor.value;

        // Obtém o valor atualmente selecionado na ordenação.
        const ordenacaoSelecionada = pegarValorOrdenar.value;

        // Declara uma variável que irá guardar a lista resultante.
        let lista;

        // Verifica se o utilizador escolheu a opção "todas".
        if (categoriaSelecionada === "todas") {

            // Cria uma cópia do array original de produtos.
            // O operador spread (...) copia os elementos para um novo array.
            lista = [...produtos];

        } else {

            // Cria um novo array apenas com os produtos da categoria escolhida.
            // filter percorre os produtos e mantém os que satisfazem a condição.
            lista = produtos.filter(
                produto => produto.category === categoriaSelecionada
            );
        }

        // Verifica se o utilizador escolheu ordenar por preço crescente.
        if (ordenacaoSelecionada === "Preço Crescente") {

            // Ordena os produtos do preço mais baixo para o mais alto.
            // sort altera a própria lista.
            // a representa um produto e b representa outro produto.
            lista.sort((a, b) => a.price - b.price);

        // Caso contrário, verifica se escolheu preço decrescente.
        } else if (ordenacaoSelecionada === "Preço Decrescente") {

            // Ordena os produtos do preço mais alto para o mais baixo.
            lista.sort((a, b) => b.price - a.price);
        }

        // Apresenta no HTML a lista filtrada e ordenada.
        mostrarProdutos(lista);
    });


    // PESQUISA INDEPENDENTE

    // Procura no HTML o input utilizado para pesquisar produtos.
    const inputPesquisar = document.querySelector("#pesquisar");

    // Adiciona um evento input ao campo de pesquisa.
    // Este evento é acionado sempre que o utilizador escreve ou apaga texto.
    inputPesquisar.addEventListener("input", () => {

        // Obtém o texto escrito pelo utilizador.
        // toLowerCase transforma todas as letras em minúsculas.
        const texto = inputPesquisar.value.toLowerCase();

        // Percorre a lista original de produtos.
        // Mantém apenas os produtos cujo título contém o texto pesquisado.
        const resultado = produtos.filter(produto =>
            produto.title.toLowerCase().includes(texto)
        );

        // Apresenta apenas os produtos encontrados.
        mostrarProdutos(resultado);
    });
}



/* =====================================================
   ADICIONAR PRODUTOS AO CARRINHO
   ===================================================== */

// Recebe o produto que o utilizador pretende adicionar.
function adicionarProduto(produto) {

    // Obtém a lista atual de produtos guardada no localStorage.
    // JSON.parse converte a string JSON novamente num array JavaScript.
    const produtosSelecionados = JSON.parse(
        localStorage.getItem("produtos-selecionados")
    ) || [];

    // Adiciona o novo produto ao final do array.
    produtosSelecionados.push(produto);

    // Atualiza o localStorage com a nova lista.
    // JSON.stringify transforma o array numa string JSON.
    localStorage.setItem(
        "produtos-selecionados",
        JSON.stringify(produtosSelecionados)
    );

    // Atualiza visualmente o carrinho e o custo total.
    atualizaCesto();
}



/* =====================================================
   D. CESTO DE COMPRAS
   ===================================================== */

// Função responsável por atualizar o conteúdo do carrinho.
function atualizaCesto() {

    // Recupera os produtos guardados no localStorage.
    const produtosSelecionados = JSON.parse(
        localStorage.getItem("produtos-selecionados")
    ) || [];

    // Apaga o conteúdo anterior do carrinho.
    divSelecionados.innerHTML = "";

    // Inicializa a variável que irá acumular o preço dos produtos.
    let total = 0;

    // Percorre todos os produtos selecionados.
    // index representa a posição de cada produto no array.
    produtosSelecionados.forEach((produto, index) => {

        // Cria o elemento HTML que representa o produto no carrinho.
        // Envia também o índice para identificar o produto a remover.
        const article = criaProdutoCesto(produto, index);

        // Adiciona o produto criado à div do carrinho.
        divSelecionados.append(article);

        // Converte o preço para número e adiciona-o ao total.
        total += Number(produto.price);
    });

    // Apresenta o total com duas casas decimais.
    custoTotal.textContent = total.toFixed(2);
}



// Cria visualmente cada produto dentro do carrinho.
function criaProdutoCesto(produto, index) {

    // Cria um elemento article para representar o produto.
    const article = document.createElement("article");

    // Cria a imagem do produto.
    const imagem = document.createElement("img");

    // Define o endereço da imagem do produto.
    imagem.src = "https://deisishop.pw.deisi.ulusofona.pt" + produto.image;

    // Cria o título do produto.
    const titulo = document.createElement("h3");

    // Coloca o nome do produto no título.
    titulo.textContent = produto.title;

    // Cria um parágrafo para apresentar o preço.
    const preco = document.createElement("p");

    // Coloca o preço do produto no parágrafo.
    preco.textContent = produto.price + " €";

    // Cria o botão que permite remover o produto.
    const botao = document.createElement("button");

    // Define o texto do botão.
    botao.textContent = "Remover do cesto";

    // Adiciona um evento de clique ao botão.
    botao.addEventListener("click", function () {

        // Recupera novamente a lista de produtos do localStorage.
        const produtosSelecionados = JSON.parse(
            localStorage.getItem("produtos-selecionados")
        ) || [];

        // Remove um elemento do array.
        // index indica a posição do produto que queremos remover.
        // O número 1 indica que queremos remover apenas um elemento.
        produtosSelecionados.splice(index, 1);

        // Guarda a lista atualizada no localStorage.
        localStorage.setItem(
            "produtos-selecionados",
            JSON.stringify(produtosSelecionados)
        );

        // Atualiza novamente o carrinho e o custo total.
        atualizaCesto();
    });

    // Adiciona a imagem, o título, o preço e o botão ao article.
    article.append(imagem, titulo, preco, botao);

    // Devolve o article completo.
    return article;
}



/* =====================================================
   E. FINALIZAR COMPRA
   ===================================================== */

// Função responsável por enviar os dados da compra à API.


function comprar() {

    const produtosSelecionados = JSON.parse(
        localStorage.getItem("produtos-selecionados")
    ) || [];

    if (produtosSelecionados.length === 0 || nome.value.trim() === "") {
        return;
    }

    const idsProdutos = produtosSelecionados.map(
        produto => produto.id
    );

    const dadosCompra = {
        products: idsProdutos,
        student: estudante.checked,
        coupon: cupao.value,
        name: nome.value.trim()
    };

    fetch("https://deisishop.pw.deisi.ulusofona.pt/buy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosCompra)
    })
    .then(response => response.json())
    .then(dados => {

        if (dados.error) {
            return;
        }

        valorFinal.textContent = dados.totalCost + " €";
        referenciaPagamento.textContent = dados.reference;

        localStorage.setItem(
            "produtos-selecionados",
            JSON.stringify([])
        );

        atualizaCesto();
    })
    .catch(error => console.error(error));
}

botaoComprar.addEventListener("click", comprar);




/* =====================================================
   F. INICIALIZAÇÃO
   ===================================================== */

// Verifica se o elemento do carrinho existe no HTML.
if (divSelecionados) {

    // Carrega os produtos guardados e apresenta o carrinho.
    // Isto permite manter o carrinho mesmo depois de atualizar a página.
    atualizaCesto();
}

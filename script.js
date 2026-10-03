// produtos
const data = {
    produtos: [
        {
            id: 1,
            nome: "Perfume Floral",
            preco: 529.90,
            categoria: "Perfumes",
            imagem: "imagens/perfume-floral.png",
            descricao: "Perfume com fragrância floral suave.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Body Splash",
            preco: 239.90,
            categoria: "Perfumes",
            imagem: "imagens/bodysplash.png",
            descricao: "Body splash com fragrância leve e refrescante.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Perfume Baunilha",
            preco: 339.90,
            categoria: "Perfumes",
            imagem: "imagens/perfume-baunilha.png",
            descricao: "Perfume com fragrância doce de baunilha.",
            emEstoque: false
        },
        {
            id: 4,
            nome: "Gloss Labial",
            preco: 189.90,
            categoria: "Maquiagem",
            imagem: "imagens/gloss.png",
            descricao: "Batom rosa com acabamento cremoso.",
            emEstoque: true
        },
        {
            id: 5,
            nome: "Máscara de Cílios",
            preco: 89.90,
            categoria: "Maquiagem",
            imagem: "imagens/rimel.png",
            descricao: "Máscara para cílios com efeito de volume.",
            emEstoque: false
        },
        {
            id: 6,
            nome: "Paleta de Sombras",
            preco: 139.90,
            categoria: "Maquiagem",
            imagem: "imagens/paleta.png",
            descricao: "Paleta com diferentes cores de sombras.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Hidratante Corporal",
            preco: 55.90,
            categoria: "Cuidados",
            imagem: "imagens/hidratante.png",
            descricao: "Hidratante corporal para uso diário.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Sabonete Facial",
            preco: 24.90,
            categoria: "Cuidados",
            imagem: "imagens/sabonete.png",
            descricao: "Sabonete para limpeza diária do rosto.",
            emEstoque: true
        },
        {
            id: 9,
            nome: "Protetor Solar",
            preco: 54.90,
            categoria: "Cuidados",
            imagem: "imagens/protetor.png",
            descricao: "Protetor solar facial para uso diário.",
            emEstoque: true
        },
        {
            id: 10,
            nome: "Kit de Pincéis",
            preco: 99.90,
            categoria: "Acessórios",
            imagem: "imagens/pinceis.png",
            descricao: "Kit com pincéis para aplicação de maquiagem.",
            emEstoque: true
        },
        {
            id: 11,
            nome: "Necessaire",
            preco: 45.90,
            categoria: "Acessórios",
            imagem: "imagens/necessaire.png",
            descricao: "Necessaire para guardar produtos pessoais.",
            emEstoque: false
        },
        {
            id: 12,
            nome: "Espelho de Bolsa",
            preco: 29.90,
            categoria: "Acessórios",
            imagem: "imagens/espelho.png",
            descricao: "Espelho compacto para levar na bolsa.",
            emEstoque: true
        }
    ]
};

// elementos da página
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const search = document.querySelector("#search");
const category = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// preço
function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

// criar card
function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);
    card.style.padding = "15px";

    const imagem = document.createElement("img");
    imagem.setAttribute("src", produto.imagem);
    imagem.setAttribute("alt", produto.nome);

    const nome = document.createElement("h2");
    nome.classList.add("card-title");
    nome.innerHTML = produto.nome;

    const preco = document.createElement("p");
    preco.innerHTML = formatPrice(produto.preco);

    const categoria = document.createElement("p");
    categoria.innerHTML = produto.categoria;

    const detalhes = document.createElement("button");
    detalhes.innerHTML = "Ver detalhes";

    const destacar = document.createElement("button");
    destacar.innerHTML = "Destacar";

    detalhes.addEventListener("click", function () {
        showProductDetails(produto);
    });

    destacar.addEventListener("click", function () {
        card.classList.add("highlight");
    });

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(categoria);
    card.appendChild(detalhes);
    card.appendChild(destacar);

    return card;
}

// mostrar produtos
function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(function (produto) {
        productList.appendChild(createProductCard(produto));
    });

    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        console.log("ID: " + card.getAttribute("data-id"));
    });
}

// categorias
function renderCategories() {
    category.innerHTML = '<option value="Todas">Todas</option>';

    const categorias = [];

    data.produtos.forEach(function (produto) {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorias.forEach(function (item) {
        const option = document.createElement("option");
        option.setAttribute("value", item);
        option.innerHTML = item;
        category.appendChild(option);
    });
}

// detalhes
function showProductDetails(produto) {
    let estoque = "Fora de estoque";

    if (produto.emEstoque) {
        estoque = "Em estoque";
    }

    productDetails.innerHTML =
        "<h2>" + produto.nome + "</h2>" +
        "<p>Preço: " + formatPrice(produto.preco) + "</p>" +
        "<p>Categoria: " + produto.categoria + "</p>" +
        "<p>Estoque: " + estoque + "</p>" +
        "<p>Descrição: " + produto.descricao + "</p>";
}

// filtro
function filterProducts() {
    const texto = search.value.toLowerCase();
    const categoria = category.value;

    return data.produtos.filter(function (produto) {
        const nome = produto.nome.toLowerCase().includes(texto);
        const cat = categoria === "Todas" || produto.categoria === categoria;

        return nome && cat;
    });
}

// eventos
search.addEventListener("input", function () {
    renderProducts(filterProducts());
});

category.addEventListener("change", function () {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
    renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);
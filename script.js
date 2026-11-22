    let botaoMenu = document.getElementById("menu-button");
    let menu = document.getElementById("menu");

    botaoMenu.addEventListener("click", function() {
        if (menu.style.display == "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
        }
    });

    let pesquisa = document.getElementById("pesquisa");

    if (pesquisa) {
        pesquisa.addEventListener("input", function() {
            let texto = pesquisa.value.toLowerCase();
            let linhas = document.querySelectorAll("tbody tr");

            linhas.forEach(function(linha) {
                let conteudo = linha.textContent.toLowerCase();

                if (conteudo.includes(texto)) {
                    linha.style.display = "";
                } else {
                    linha.style.display = "none";
                }
            });
        });
    }

    let dadosVidraria = document.getElementById("dados-vidraria");

    if (dadosVidraria) {
        let url = new URLSearchParams(window.location.search);
        let id = url.get("id");

        console.log(id);
    }

    ///filtro
    let botaoFiltro = document.getElementById('botao-filtro');
    let filtros = document.getElementById('filtros');

    botaoFiltro.onclick = function() {
        filtros.style.display = 'block';
    }
    function selecionar(botao) {
        if (botao.style.backgroundColor == 'pink') {
            botao.style.backgroundColor = 'white';
        } else {
            botao.style.backgroundColor = 'pink';
        }
    }
    function filtrar() {
    let item = document.getElementById('grupo-item');
    let acao = document.getElementById('grupo-acao');
    let usuario = document.getElementById('grupo-usuario');

    let linhas = document.getElementsByClassName('linha-historico');

    for (let i = 0; i < linhas.length; i++) {
        let mostrar = true;

       
    }
}

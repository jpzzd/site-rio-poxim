const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");


// FORMULÁRIO
formulario.addEventListener("submit", async function(evento) {

    evento.preventDefault();

    resultado.textContent = "Enviando...";


    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const participacao = document.getElementById("participacao").value;
    const mensagem = document.getElementById("mensagem").value.trim();


    if (nome === "") {

        resultado.textContent = "Digite seu nome.";

        return;
    }


    if (participacao === "") {

        resultado.textContent =
            "Escolha uma forma de participação.";

        return;
    }


    const SUPABASE_URL =
        "https://ktphekqjfwhymdksrqug.supabase.co";


    const SUPABASE_KEY =
        "sb_publishable_FbZsfsqEQk4wYQTMsXwJkw_sf25wScT";


    if (
        SUPABASE_KEY ===
        "COLE_SUA_PUBLISHABLE_KEY_AQUI"
    ) {

        resultado.textContent =
            "⚠️ O formulário funciona, mas falta colocar a chave do Supabase.";

        return;
    }


    if (!window.supabase) {

        resultado.textContent =
            "❌ O Supabase não foi carregado.";

        return;
    }


    try {

        const supabase =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );


        const { error } =
            await supabase
                .from("participantes")
                .insert([
                    {
                        nome: nome,
                        email: email,
                        participacao: participacao,
                        mensagem: mensagem
                    }
                ]);


        if (error) {
            throw error;
        }


        resultado.textContent =
            "✅ Participação registrada com sucesso!";


        formulario.reset();


    } catch (erro) {

        console.error(erro);

        resultado.textContent =
            "❌ Erro do Supabase: " +
            erro.message;

    }

});


// BOTÃO VOLTAR AO TOPO

const botaoTopo =
    document.getElementById("topo");


window.addEventListener("scroll", function() {

    if (window.scrollY > 400) {

        botaoTopo.style.display = "block";

    } else {

        botaoTopo.style.display = "none";

    }

});


botaoTopo.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// MODAL

const botoesSaibaMais =
    document.querySelectorAll(".saibaMais");

const modal =
    document.getElementById("modal");

const modalTitulo =
    document.getElementById("modalTitulo");

const modalTexto =
    document.getElementById("modalTexto");

const fecharModal =
    document.getElementById("fecharModal");


botoesSaibaMais.forEach(function(botao) {

    botao.addEventListener("click", function() {

        modalTitulo.textContent =
            botao.dataset.titulo;

        modalTexto.textContent =
            botao.dataset.texto;

        modal.classList.add("aberto");

    });

});


fecharModal.addEventListener("click", function() {

    modal.classList.remove("aberto");

});


modal.addEventListener("click", function(evento) {

    if (evento.target === modal) {

        modal.classList.remove("aberto");

    }

});


document.addEventListener("keydown", function(evento) {

    if (evento.key === "Escape") {

        modal.classList.remove("aberto");

    }

});


// CONTADOR

const contadorElemento =
    document.getElementById("contador");

const botaoAcao =
    document.getElementById("acaoBtn");


let contador =
    Number(
        localStorage.getItem("acoesRioPoxim")
    ) || 0;


contadorElemento.textContent =
    contador;


botaoAcao.addEventListener("click", function() {

    contador++;

    contadorElemento.textContent =
        contador;


    localStorage.setItem(
        "acoesRioPoxim",
        contador
    );


    botaoAcao.textContent =
        "✅ Ação registrada!";


    setTimeout(function() {

        botaoAcao.textContent =
            "+ Registrar uma ação";

    }, 1500);

});


// MENU ATIVO

const links =
    document.querySelectorAll("nav a");

const secoes =
    document.querySelectorAll("section");


window.addEventListener("scroll", function() {

    let atual = "";


    secoes.forEach(function(secao) {

        if (
            window.scrollY >=
            secao.offsetTop - 150
        ) {

            atual = secao.id;

        }

    });


    links.forEach(function(link) {

        link.classList.remove("ativo");


        if (
            link.getAttribute("href") ===
            "#" + atual
        ) {

            link.classList.add("ativo");

        }

    });

});


// ANIMAÇÃO

const elementos =
    document.querySelectorAll(
        ".card, .destaque, .contador"
    );


const observador =
    new IntersectionObserver(
        function(entradas) {

            entradas.forEach(function(entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "visivel"
                    );

                    observador.unobserve(
                        entrada.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


elementos.forEach(function(elemento) {

    observador.observe(elemento);

});
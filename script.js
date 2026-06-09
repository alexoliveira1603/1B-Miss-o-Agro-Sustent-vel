// ==========================
// MISSÃO AGRO SUSTENTÁVEL
// VERSÃO ESTÁVEL 2026
// ==========================

let producao = 50;
let agua = 50;
let ambiente = 50;
let lucro = 50;
let energia = 50;

let conquistas = [];
let grafico = null;

// ==========================
// LOADING
// ==========================

window.addEventListener("load", () => {
    const loading = document.getElementById("loading");

    if (loading) {
        setTimeout(() => {
            loading.style.display = "none";
        }, 1500);
    }
});

// ==========================
// NAVEGAÇÃO
// ==========================

function mostrarTela(id) {

    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    const tela = document.getElementById(id);

    if (tela) {
        tela.classList.add("ativa");
    }

    atualizarGrafico();
}

// ==========================
// PAINEL
// ==========================

function atualizarPainel() {

    atualizarValor("producao", producao);
    atualizarValor("agua", agua);
    atualizarValor("ambiente", ambiente);
    atualizarValor("lucro", lucro);
    atualizarValor("energia", energia);

    atualizarBarra();
    verificarConquistas();
}

function atualizarValor(id, valor) {
    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.textContent = valor;
    }
}

// ==========================
// BARRA
// ==========================

function atualizarBarra() {

    const barra = document.getElementById("progresso");

    if (!barra) return;

    const media =
        (producao + agua + ambiente + lucro + energia) / 5;

    barra.style.width =
        Math.min(media, 100) + "%";
}

// ==========================
// MENSAGENS
// ==========================

function mensagem(texto) {

    const area = document.getElementById("mensagem");

    if (area) {
        area.innerHTML = texto;
    }
}

// ==========================
// AÇÕES
// ==========================

function irrigacaoInteligente() {
    agua += 15;
    ambiente += 10;
    lucro += 5;
    mensagem("💧 Irrigação Inteligente implantada.");
    atualizarPainel();
}

function plantioDiversificado() {
    producao += 15;
    ambiente += 15;
    mensagem("🌾 Plantio Diversificado fortaleceu o solo.");
    atualizarPainel();
}

function energiaSolar() {
    energia += 20;
    ambiente += 10;
    lucro += 10;
    mensagem("☀️ Energia Solar instalada.");
    atualizarPainel();
}

function captacaoChuva() {
    agua += 20;
    ambiente += 5;
    mensagem("🌧️ Captação de Água da Chuva realizada.");
    atualizarPainel();
}

function reflorestamento() {
    ambiente += 25;
    mensagem("🌳 Reflorestamento concluído.");
    atualizarPainel();
}

function aduboOrganico() {
    producao += 10;
    ambiente += 15;
    mensagem("🌱 Adubo Orgânico aplicado.");
    atualizarPainel();
}

function controleBiologico() {
    ambiente += 20;
    producao += 5;
    mensagem("🐞 Controle Biológico implantado.");
    atualizarPainel();
}

function agriculturaPrecisao() {
    producao += 20;
    agua += 10;
    lucro += 10;
    mensagem("🛰️ Agricultura de Precisão utilizada.");
    atualizarPainel();
}

function reciclagem() {
    ambiente += 15;
    energia += 10;
    mensagem("♻️ Sistema de Reciclagem implantado.");
    atualizarPainel();
}

function usoAgrotoxico() {
    producao += 25;
    lucro += 20;
    ambiente -= 30;
    agua -= 15;
    mensagem("☠️ Uso excessivo de agrotóxicos.");
    atualizarPainel();
}

// ==========================
// CONQUISTAS
// ==========================

function desbloquear(nome) {

    if (!conquistas.includes(nome)) {
        conquistas.push(nome);
        atualizarConquistas();
    }
}

function verificarConquistas() {

    if (ambiente >= 100)
        desbloquear("🌳 Guardião da Natureza");

    if (agua >= 100)
        desbloquear("💧 Protetor das Águas");

    if (energia >= 100)
        desbloquear("⚡ Energia Limpa");

    if (lucro >= 100)
        desbloquear("💰 Mestre do Lucro");

    if (producao >= 100)
        desbloquear("🌾 Super Produtor");
}

function atualizarConquistas() {

    const area =
        document.getElementById("listaConquistas");

    if (!area) return;

    if (conquistas.length === 0) {

        area.innerHTML =
            "<p>🔒 Nenhuma conquista desbloqueada</p>";

        return;
    }

    area.innerHTML = conquistas
        .map(item => `<div class="conquista">${item}</div>`)
        .join("");
}

// ==========================
// RESULTADO
// ==========================

function avaliarProjeto() {

    const total =
        producao + agua + ambiente + lucro + energia;

    let resultado;

    if (total >= 500)
        resultado = "🏆 Fazenda Sustentável de Excelência";
    else if (total >= 400)
        resultado = "🥇 Fazenda Modelo";
    else if (total >= 300)
        resultado = "🥈 Boa Gestão Rural";
    else
        resultado = "⚠️ Necessita Melhorias";

    const area =
        document.getElementById("resultado");

    if (!area) return;

    area.innerHTML = `
        <h3>${resultado}</h3>
        <p>🌾 Produção: ${producao}</p>
        <p>💧 Água: ${agua}</p>
        <p>🌳 Ambiente: ${ambiente}</p>
        <p>💰 Lucro: ${lucro}</p>
        <p>⚡ Energia: ${energia}</p>
        <hr>
        <h2>Total: ${total}</h2>
    `;
}

// ==========================
// RANKING
// ==========================

function salvarPontuacao() {

    try {

        const total =
            producao + agua + ambiente + lucro + energia;

        let ranking =
            JSON.parse(localStorage.getItem("ranking")) || [];

        ranking.push(total);

        localStorage.setItem(
            "ranking",
            JSON.stringify(ranking)
        );

        carregarRanking();

    } catch (erro) {

        console.error("Erro ranking:", erro);

    }
}

function carregarRanking() {

    try {

        let ranking =
            JSON.parse(localStorage.getItem("ranking")) || [];

        ranking.sort((a, b) => b - a);

        const area =
            document.getElementById("rankingLocal");

        if (!area) return;

        let html = "<h3>🏆 Ranking Local</h3>";

        ranking.forEach((item, index) => {

            html += `
            <div>${index + 1}º Lugar - ${item} pontos</div>
            `;
        });

        area.innerHTML = html;

    } catch (erro) {

        console.error("Erro ranking:", erro);

    }
}

// ==========================
// GRÁFICO
// ==========================

function atualizarGrafico() {

    const canvas =
        document.getElementById("grafico");

    if (!canvas) return;

    if (typeof Chart === "undefined") {
        console.warn("Chart.js não carregou.");
        return;
    }

    try {

        if (grafico) {
            grafico.destroy();
        }

        grafico = new Chart(canvas, {

            type: "bar",

            data: {
                labels: [
                    "Produção",
                    "Água",
                    "Ambiente",
                    "Lucro",
                    "Energia"
                ],

                datasets: [{
                    label: "Indicadores",
                    data: [
                        producao,
                        agua,
                        ambiente,
                        lucro,
                        energia
                    ]
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false
            }

        });

    } catch (erro) {

        console.error(
            "Erro ao criar gráfico:",
            erro
        );
    }
}

// ==========================
// REINICIAR
// ==========================

function reiniciarSimulacao() {

    producao = 50;
    agua = 50;
    ambiente = 50;
    lucro = 50;
    energia = 50;

    conquistas = [];

    atualizarConquistas();
    atualizarPainel();
    atualizarGrafico();

    mensagem("🔄 Simulação reiniciada.");
}

// ==========================
// INICIALIZAÇÃO
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    atualizarPainel();
    atualizarConquistas();
    carregarRanking();

    const darkBtn =
        document.getElementById("darkModeBtn");

    if (darkBtn) {
        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
        });
    }

    const modal =
        document.getElementById("tutorialModal");

    const tutorialBtn =
        document.getElementById("tutorialBtn");

    const fecharModal =
        document.getElementById("fecharModal");

    if (tutorialBtn && modal) {

        tutorialBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    if (fecharModal && modal) {

        fecharModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    setTimeout(() => {
        atualizarGrafico();
    }, 500);
});
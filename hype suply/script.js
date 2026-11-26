/* ================================================== */
/* HYPE SUPPLY - script.js */
/* Lê produtos.js e cria os cards automaticamente */
/* O ID é criado sozinho, você não precisa digitar */
/* ================================================== */

/* ===== 00 - CONFIG ===== */
const WHATSAPP_NUMERO = "5592986364022";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMERO}`;

/* ===== 00.1 - CRIA O ID AUTOMATICAMENTE ===== */
PRODUTOS.forEach((p, i) => p.id = i + 1);

/* ===== 01 - ELEMENTOS ===== */
const buscaInput = document.getElementById("busca");
const listaProdutos = document.getElementById("lista-produtos");
const semResultado = document.getElementById("sem-resultado");
const tabs = document.querySelectorAll(".tab");
const cats = document.querySelectorAll(".cat");
const pills = document.querySelectorAll(".pill");

const detalhe = document.getElementById("detalhe");
const detalheFundo = document.getElementById("detalhe-fundo");
const fecharDetalhe = document.getElementById("fechar-detalhe");
const detalheImg = document.getElementById("detalhe-img");
const detalheNome = document.getElementById("detalhe-nome");
const detalhePreco = document.getElementById("detalhe-preco");
const detalhePrecoAntigo = document.getElementById("detalhe-preco-antigo");
const detalheDesc = document.getElementById("detalhe-desc");
const detalheTams = document.getElementById("detalhe-tams");
const detalheCores = document.getElementById("detalhe-cores");
const detalheCorDot = document.querySelector(".detalhe-cor-dot");
const detalheCorNome = document.querySelector(".cor-nome");
const btnAddDetalhe = document.getElementById("btn-add-detalhe");
const btnBuyDetalhe = document.getElementById("btn-buy-detalhe");

const carrinho = document.getElementById("carrinho");
const carrinhoFundo = document.getElementById("carrinho-fundo");
const fecharCarrinho = document.getElementById("fechar-carrinho");
const itensCarrinho = document.getElementById("itens-carrinho");
const carrinhoSub = document.getElementById("carrinho-sub");
const totalCarrinho = document.getElementById("total-carrinho");
const contadorCarrinho = document.getElementById("contador-carrinho");
const btnCarrinhoBottom = document.getElementById("btn-carrinho-bottom");
const btnFinalizar = document.getElementById("btn-finalizar");
const btnContinuar = document.getElementById("btn-continuar");

const checkout = document.getElementById("checkout");
const checkoutFundo = document.getElementById("checkout-fundo");
const fecharCheckout = document.getElementById("fechar-checkout");
const formPedido = document.getElementById("form-pedido");
const inputNome = document.getElementById("nome");
const inputCpf = document.getElementById("cpf");
const inputTelefone = document.getElementById("telefone");
const selectEntrega = document.getElementById("entrega");
const camposEndereco = document.getElementById("campos-endereco");
const inputCep = document.getElementById("cep");
const inputRua = document.getElementById("rua");
const inputNumero = document.getElementById("numero");
const inputBairro = document.getElementById("bairro");
const inputCidade = document.getElementById("cidade");
const inputEstado = document.getElementById("estado");
const inputComplemento = document.getElementById("complemento");
const selectPagamento = document.getElementById("pagamento");
const inputObs = document.getElementById("obs");
const toast = document.getElementById("toast");

/* ===== 02 - ESTADO ===== */
let carrinhoItens = [];
let produtoAtual = null;
let tamanhoAtual = "M";
let corAtual = "Preto";
let filtroAtual = "todos";
let termoBusca = "";

/* ===== 03 - HELPERS ===== */
function formatarPreco(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function mostrarToast(msg) {
  toast.textContent = msg;
  toast.classList.add("mostrar");
  setTimeout(() => toast.classList.remove("mostrar"), 2200);
}
function abrirFundo(f) { f.classList.remove("fundo-oculto"); }
function fecharFundo(f) { f.classList.add("fundo-oculto"); }
function getProdutoPorId(id) {
  return PRODUTOS.find(p => p.id === Number(id));
}

/* ===== 04 - RENDERIZAR PRODUTOS ===== */
function criarCardHTML(p) {
  const imagensHTML = p.imagens.map(src => `<img src="${src}" alt="${p.nome}">`).join("");
  const seloHTML = p.selo ? `<span class="selo">${p.selo}</span>` : "";
  return `
  <div class="produto-card" data-id="${p.id}" data-categoria="${p.categoria}" data-nome="${p.nome}" data-desc="${p.desc}" data-preco="${p.preco}" data-preco-antigo="${p.precoAntigo || ""}" data-img="${p.imagens[0]}">
    ${seloHTML}
    <div class="carrossel">
      <div class="trilha" data-indice="0">${imagensHTML}</div>
      <span class="contador-foto">1 / ${p.imagens.length}</span>
      <button class="seta esq" disabled>‹</button>
      <button class="seta dir" ${p.imagens.length <= 1 ? "disabled" : ""}>›</button>
    </div>
    <div class="produto-info">
      <h3>${p.nome}</h3>
      <div class="price-row"><b>${formatarPreco(p.preco)}</b>
        <button class="btn-bag"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></button>
      </div>
    </div>
  </div>`;
}

function renderizarProdutos() {
  let html = "";
  let algumVisivel = false;
  CATEGORIAS.forEach(cat => {
    if (filtroAtual !== "todos" && filtroAtual !== cat.id) return;
    const produtosDaCat = PRODUTOS.filter(p => {
      if (p.categoria !== cat.id) return false;
      if (!termoBusca) return true;
      const termo = termoBusca.toLowerCase();
      return p.nome.toLowerCase().includes(termo) || (p.desc || "").toLowerCase().includes(termo) || cat.titulo.toLowerCase().includes(termo);
    });
    if (produtosDaCat.length === 0) return;
    algumVisivel = true;
    html += `
    <div class="bloco-categoria" data-categoria="${cat.id}">
      <h3 class="titulo-categoria">${cat.titulo}</h3>
      <div class="grade">${produtosDaCat.map(criarCardHTML).join("")}</div>
    </div>`;
  });
  listaProdutos.innerHTML = html;
  if (semResultado) semResultado.style.display = algumVisivel ? "none" : "block";
}

/* ===== 05 - BUSCA ===== */
function filtrarPorBusca() {
  termoBusca = buscaInput.value.trim();
  renderizarProdutos();
}
if (buscaInput) buscaInput.addEventListener("input", filtrarPorBusca);

/* ===== 06 - FILTROS ===== */
function aplicarFiltro(filtro) {
  filtroAtual = filtro;
  termoBusca = "";
  if (buscaInput) buscaInput.value = "";
  renderizarProdutos();
  [...cats, ...pills].forEach(btn => btn.classList.toggle("ativo", btn.dataset.filtro === filtro));
  document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
}
tabs.forEach(btn => btn.addEventListener("click", () => aplicarFiltro("todos")));
cats.forEach(btn => btn.addEventListener("click", () => aplicarFiltro(btn.dataset.filtro)));
pills.forEach(btn => btn.addEventListener("click", () => aplicarFiltro(btn.dataset.filtro)));

/* ===== 07 - DELEGAÇÃO - CARROSSEL + CARD + SACOLA ===== */
if (listaProdutos) {
  listaProdutos.addEventListener("click", e => {
    const btnSeta = e.target.closest(".seta");
    const btnBag = e.target.closest(".btn-bag");
    const card = e.target.closest(".produto-card");
    if (!card) return;
    if (btnSeta) {
      e.stopPropagation();
      const trilha = card.querySelector(".trilha");
      const imgs = card.querySelectorAll(".trilha img");
      const contador = card.querySelector(".contador-foto");
      const btnEsq = card.querySelector(".seta.esq");
      const btnDir = card.querySelector(".seta.dir");
      let indice = Number(trilha.dataset.indice || 0);
      if (btnSeta.classList.contains("esq") && indice > 0) indice--;
      if (btnSeta.classList.contains("dir") && indice < imgs.length - 1) indice++;
      trilha.dataset.indice = indice;
      trilha.style.transform = `translateX(-${indice * 100}%)`;
      if (contador) contador.textContent = `${indice + 1} / ${imgs.length}`;
      if (btnEsq) btnEsq.disabled = indice === 0;
      if (btnDir) btnDir.disabled = indice === imgs.length - 1;
      return;
    }
    if (btnBag) {
      e.stopPropagation();
      const p = getProdutoPorId(card.dataset.id);
      if (p) adicionarAoCarrinho({ nome: p.nome, preco: p.preco, img: p.imagens[0] }, "M", "Preto");
      return;
    }
    abrirDetalhe(card);
  });
}

/* ===== 08 - DETALHE ===== */
function abrirDetalhe(card) {
  const p = getProdutoPorId(card.dataset.id);
  if (!p) return;
  produtoAtual = { nome: p.nome, desc: p.desc, preco: p.preco, precoAntigo: p.precoAntigo, img: p.imagens[0] };
  detalheImg.src = produtoAtual.img;
  detalheNome.textContent = produtoAtual.nome;
  detalheDesc.textContent = produtoAtual.desc;
  detalhePreco.textContent = formatarPreco(produtoAtual.preco);
  detalhePrecoAntigo.textContent = produtoAtual.precoAntigo ? formatarPreco(produtoAtual.precoAntigo) : "";
  tamanhoAtual = "M";
  corAtual = "Preto";
  detalheTams.querySelectorAll(".tam").forEach(t => t.classList.toggle("ativo", t.textContent.trim() === "M"));
  detalheCores.querySelectorAll(".cor-wrap").forEach(c => c.classList.toggle("ativo", c.dataset.nome === "Preto"));
  if (detalheCorNome) detalheCorNome.textContent = "Preto";
  if (detalheCorDot) detalheCorDot.style.background = "#111";
  detalhe.classList.remove("detalhe-fechado");
  abrirFundo(detalheFundo);
}
function fecharDetalheFuncao() {
  detalhe.classList.add("detalhe-fechado");
  fecharFundo(detalheFundo);
}
if (fecharDetalhe) fecharDetalhe.addEventListener("click", fecharDetalheFuncao);
if (detalheFundo) detalheFundo.addEventListener("click", fecharDetalheFuncao);

detalheTams?.querySelectorAll(".tam").forEach(btn => {
  btn.addEventListener("click", () => {
    detalheTams.querySelectorAll(".tam").forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    tamanhoAtual = btn.textContent.trim();
  });
});
detalheCores?.querySelectorAll(".cor-wrap").forEach(wrap => {
  wrap.addEventListener("click", () => {
    detalheCores.querySelectorAll(".cor-wrap").forEach(w => w.classList.remove("ativo"));
    wrap.classList.add("ativo");
    corAtual = wrap.dataset.nome;
    if (detalheCorNome) detalheCorNome.textContent = corAtual;
    const bola = wrap.querySelector(".cor-bola");
    if (detalheCorDot && bola) detalheCorDot.style.background = bola.style.background;
  });
});

/* ===== 09 - CARRINHO ===== */
function atualizarCarrinho() {
  const totalQtd = carrinhoItens.reduce((s, i) => s + i.qtd, 0);
  const totalValor = carrinhoItens.reduce((s, i) => s + i.preco * i.qtd, 0);
  if (contadorCarrinho) contadorCarrinho.textContent = totalQtd;
  if (carrinhoSub) carrinhoSub.textContent = `${totalQtd} ${totalQtd === 1 ? "item" : "itens"}`;
  if (totalCarrinho) totalCarrinho.textContent = formatarPreco(totalValor);
  if (carrinhoItens.length === 0) {
    itensCarrinho.innerHTML = `<p style="text-align:center;color:var(--cinza-texto);padding:30px 0">Seu carrinho está vazio.<br>Adiciona um drop aí! 🔥</p>`;
    return;
  }
  itensCarrinho.innerHTML = carrinhoItens.map((item, index) => `
    <div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--cinza-linha)">
      <img src="${item.img}" style="width:64px;height:64px;object-fit:cover;border-radius:10px">
      <div style="flex:1">
        <b style="font-size:13px">${item.nome}</b>
        <p style="font-size:11px;color:var(--cinza-texto)">${item.tamanho} • ${item.cor}</p>
        <b style="font-size:13px;color:var(--lima)">${formatarPreco(item.preco)}</b>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <button data-acao="menos" data-index="${index}" style="width:28px;height:28px;border-radius:50%;background:var(--cinza-card);color:#fff;border:none">-</button>
        <span>${item.qtd}</span>
        <button data-acao="mais" data-index="${index}" style="width:28px;height:28px;border-radius:50%;background:var(--cinza-card);color:#fff;border:none">+</button>
      </div>
      <button data-acao="remover" data-index="${index}" style="background:none;border:none;color:#ff5555;font-size:16px">✕</button>
    </div>`).join("");
}

function adicionarAoCarrinho(produto, tamanho, cor) {
  const existente = carrinhoItens.find(i => i.nome === produto.nome && i.tamanho === tamanho && i.cor === cor);
  if (existente) existente.qtd++;
  else carrinhoItens.push({ ...produto, tamanho, cor, qtd: 1 });
  atualizarCarrinho();
  mostrarToast("Adicionado ao carrinho");
}

if (itensCarrinho) {
  itensCarrinho.addEventListener("click", e => {
    const btn = e.target.closest("button[data-acao]");
    if (!btn) return;
    const index = Number(btn.dataset.index);
    const acao = btn.dataset.acao;
    if (acao === "mais") carrinhoItens[index].qtd++;
    if (acao === "menos") {
      carrinhoItens[index].qtd--;
      if (carrinhoItens[index].qtd <= 0) carrinhoItens.splice(index, 1);
    }
    if (acao === "remover") carrinhoItens.splice(index, 1);
    atualizarCarrinho();
  });
}

if (btnAddDetalhe) btnAddDetalhe.addEventListener("click", () => {
  if (!produtoAtual) return;
  adicionarAoCarrinho(produtoAtual, tamanhoAtual, corAtual);
});
if (btnBuyDetalhe) btnBuyDetalhe.addEventListener("click", () => {
  if (!produtoAtual) return;
  adicionarAoCarrinho(produtoAtual, tamanhoAtual, corAtual);
  fecharDetalheFuncao();
  abrirCarrinho();
});

function abrirCarrinho() {
  carrinho.classList.remove("carrinho-fechado");
  abrirFundo(carrinhoFundo);
}
function fecharCarrinhoFuncao() {
  carrinho.classList.add("carrinho-fechado");
  fecharFundo(carrinhoFundo);
}
if (btnCarrinhoBottom) btnCarrinhoBottom.addEventListener("click", abrirCarrinho);
if (fecharCarrinho) fecharCarrinho.addEventListener("click", fecharCarrinhoFuncao);
if (carrinhoFundo) carrinhoFundo.addEventListener("click", fecharCarrinhoFuncao);
if (btnContinuar) btnContinuar.addEventListener("click", fecharCarrinhoFuncao);
document.querySelector(".btn-sacola")?.addEventListener("click", abrirCarrinho);
document.querySelector(".btn-suporte")?.addEventListener("click", () => {
  window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent("Olá HYPE SUPPLY! Preciso de ajuda.")}`, "_blank");
});
document.querySelector(".btn-insta")?.addEventListener("click", () => {
  window.open("https://instagram.com/", "_blank");
});

/* ===== 10 - CHECKOUT ===== */
function abrirCheckout() {
  if (carrinhoItens.length === 0) { mostrarToast("Seu carrinho está vazio"); return; }
  fecharCarrinhoFuncao();
  checkout.classList.remove("checkout-fechado");
  abrirFundo(checkoutFundo);
}
function fecharCheckoutFuncao() {
  checkout.classList.add("checkout-fechado");
  fecharFundo(checkoutFundo);
}
if (btnFinalizar) btnFinalizar.addEventListener("click", abrirCheckout);
if (fecharCheckout) fecharCheckout.addEventListener("click", fecharCheckoutFuncao);
if (checkoutFundo) checkoutFundo.addEventListener("click", fecharCheckoutFuncao);

if (selectEntrega) {
  selectEntrega.addEventListener("change", () => {
    const isEntrega = selectEntrega.value === "Entrega em Manaus";
    camposEndereco.style.display = isEntrega ? "" : "none";
    camposEndereco.querySelectorAll("input").forEach(input => {
      input.required = isEntrega && input.id !== "complemento";
    });
  });
}

/* ===== 11 - MÁSCARAS + CEP ===== */
if (inputCpf) {
  inputCpf.addEventListener("input", () => {
    let v = inputCpf.value.replace(/\D/g, "").slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    inputCpf.value = v;
  });
}
if (inputTelefone) {
  inputTelefone.addEventListener("input", () => {
    let v = inputTelefone.value.replace(/\D/g, "").slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    inputTelefone.value = v;
  });
}
if (inputCep) {
  inputCep.addEventListener("input", () => {
    let v = inputCep.value.replace(/\D/g, "").slice(0, 8);
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    inputCep.value = v;
  });
  inputCep.addEventListener("blur", async () => {
    const cep = inputCep.value.replace(/\D/g, "");
    if (cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await res.json();
      if (!dados.erro) {
        if (inputRua) inputRua.value = dados.logradouro || "";
        if (inputBairro) inputBairro.value = dados.bairro || "";
        if (inputCidade) inputCidade.value = dados.localidade || "Manaus";
        if (inputEstado) inputEstado.value = dados.uf || "AM";
      }
    } catch (e) {}
  });
}

/* ===== 12 - ENVIAR PEDIDO PRO WHATSAPP ===== */
if (formPedido) {
  formPedido.addEventListener("submit", e => {
    e.preventDefault();
    const totalValor = carrinhoItens.reduce((s, i) => s + i.preco * i.qtd, 0);
    let mensagem = `🔥 *NOVO PEDIDO - HYPE SUPPLY* 🔥\n\n`;
    mensagem += `*Cliente:* ${inputNome.value}\n`;
    mensagem += `*CPF:* ${inputCpf.value}\n`;
    mensagem += `*WhatsApp:* ${inputTelefone.value}\n\n`;
    mensagem += `*Entrega:* ${selectEntrega.value}\n`;
    if (selectEntrega.value === "Entrega em Manaus") {
      mensagem += `*Endereço:* ${inputRua.value}, ${inputNumero.value} - ${inputBairro.value}, ${inputCidade.value}/${inputEstado.value}\n`;
      mensagem += `*CEP:* ${inputCep.value}\n`;
      if (inputComplemento.value) mensagem += `*Complemento:* ${inputComplemento.value}\n`;
    }
    mensagem += `\n*Pagamento:* ${selectPagamento.value}\n\n`;
    mensagem += `*ITENS:*\n`;
    carrinhoItens.forEach(item => {
      mensagem += `• ${item.nome} - ${item.tamanho} / ${item.cor} - ${item.qtd}x ${formatarPreco(item.preco)}\n`;
    });
    mensagem += `\n*TOTAL:* ${formatarPreco(totalValor)}\n`;
    if (inputObs.value) mensagem += `\n*Obs:* ${inputObs.value}\n`;
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(mensagem)}`, "_blank");
    carrinhoItens = [];
    atualizarCarrinho();
    formPedido.reset();
    fecharCheckoutFuncao();
    mostrarToast("Pedido enviado no WhatsApp!");
  });
}

/* ===== 13 - INICIALIZAÇÃO ===== */
renderizarProdutos();
atualizarCarrinho();
if (camposEndereco) camposEndereco.style.display = "none";

/* ===== NAV BOTTOM ===== */
const btnNavHome = document.getElementById("nav-home");
if (btnNavHome) {
  btnNavHome.addEventListener("click", (e) => {
    if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}padding
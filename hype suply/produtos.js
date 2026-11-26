/* ============================================ */
/* HYPE SUPPLY - produtos.js */
/* É AQUI QUE TU ADICIONA PRODUTO */
/* Pra adicionar: copia um bloco { ... }, cola embaixo e muda nome, preço e foto */
/* ============================================ */

const CATEGORIAS = [
  { id: "oversized", titulo: "Oversized" },
  { id: "bijuterias", titulo: "Bijuterias" },
  { id: "correntes", titulo: "Correntes" },
  { id: "pingentes", titulo: "Pingentes" },
  { id: "time", titulo: "Camisas de Time" },
  { id: "relogios", titulo: "Relógios" },
];

const PRODUTOS = [
  {
    categoria: "oversized",
    nome: "Oversized Preta Hype",
    desc: "Peça com caimento confortável, tecido leve e ideal pro dia a dia em Manaus.",
    preco: 129.90,
    precoAntigo: 159.90,
    selo: "NOVO",
    imagens: ["banner2.jpeg"],
  },
  {
    categoria: "oversized",
    nome: "Oversized Branca Básica",
    desc: "Oversized branca, leve e confortável. Combina com tudo.",
    preco: 119.90,
    precoAntigo: null,
    selo: "",
    imagens: ["banner2.jpeg"],
  },
  {
    categoria: "bijuterias",
    nome: "Kit Bijuterias Hype",
    desc: "Kit com bijus pra dar aquele toque no look.",
    preco: 49.90,
    precoAntigo: null,
    selo: "",
    imagens: ["banner2.jpeg"],
  },
  {
    categoria: "correntes",
    nome: "Corrente Prata 50cm",
    desc: "Corrente prata, resistente e com brilho forte.",
    preco: 89.90,
    precoAntigo: 109.90,
    selo: "TOP",
    imagens: ["banner2.jpeg"],
  },
  {
    categoria: "pingentes",
    nome: "Pingente Cruz",
    desc: "Pingente pequeno e discreto, perfeito pro dia a dia.",
    preco: 39.90,
    precoAntigo: null,
    selo: "",
    imagens: ["banner2.jpeg"],
  },
  {
    categoria: "time",
    nome: "Camisa Brasil 2026",
    desc: "Camisa de time com caimento confortável, ideal pra Manaus.",
    preco: 149.90,
    precoAntigo: 179.90,
    selo: "NOVO",
    imagens: ["banner2.jpeg"],
  },
  {
    categoria: "relogios",
    nome: "Relógio Preto Hype",
    desc: "Relógio preto, minimalista e estiloso.",
    preco: 199.90,
    precoAntigo: null,
    selo: "",
    imagens: ["banner2.jpeg"],
  },
];
document.addEventListener("DOMContentLoaded", function () {
  const palavras = ["Desenvolvedor Back-end", "Novato"];
  const elemento = document.getElementById("efeito");
  let palavraAtual = 0;
  let letra = 0;
  let escrevendo = true;

  function gerarCorDegrade(indice, total) {
    const porcentagem = indice / total;
    const red = 255;
    const green = Math.round(255 * (1 - porcentagem));
    const blue = Math.round(255 * (1 - porcentagem));
    return `rgb(${red}, ${green}, ${blue})`;
  }

  function atualizarTexto() {
    const palavra = palavras[palavraAtual];
    let texto = "";

    for (let i = 0; i < letra; i++) {
      const cor = gerarCorDegrade(i, palavra.length);
      texto += `<span style="color:${cor}">${palavra[i]}</span>`;
    }

    elemento.innerHTML = texto + `<span class="cursor">|</span>`;
  }

  function loop() {
    const palavra = palavras[palavraAtual];

    if (escrevendo) {
      if (letra <= palavra.length) {
        atualizarTexto();
        letra++;
        setTimeout(loop, 100);
      } else {
        escrevendo = false;
        setTimeout(loop, 1000);
      }
    } else {
      if (letra >= 0) {
        atualizarTexto();
        letra--;
        setTimeout(loop, 40);
      } else {
        escrevendo = true;
        palavraAtual = (palavraAtual + 1) % palavras.length;
        setTimeout(loop, 300);
      }
    }
  }

  loop();

  // Cabeçalho inteligente
  let lastScroll = window.scrollY;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 50) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }

    lastScroll = currentScroll;
  });
});

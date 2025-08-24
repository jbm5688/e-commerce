# E-commerce estático para GitHub Pages

Site 100% front-end (HTML, CSS e JavaScript) com:
- Lista de produtos, página de detalhes, carrinho e checkout.
- Pix (QR + copia e cola) gerado localmente (EMVco/BR Code).
- Envio de confirmação de pedido via EmailJS (opcional).

## Como usar
1. Faça o download deste projeto e extraia a pasta `ecommerce-github-pages`.
2. Crie um repositório no GitHub e envie todos os arquivos.
3. Habilite **Settings » Pages » Deploy from a branch** (branch `main`, pasta `/root`). Acesse a URL exibida.
4. Personalize:
   - `index.html`, `produto.html`, `carrinho.html`, `checkout.html` (textos/cores).
   - `js/data.js` para editar produtos e preços.
   - Em `checkout.html`, ajuste:
     ```html
     window.PIX_CHAVE = 'sua_chave_pix_aqui';
     window.EMAILJS_SERVICE_ID = '...';
     window.EMAILJS_TEMPLATE_ID = '...';
     window.EMAILJS_PUBLIC_KEY = '...';
     ```
5. (Opcional) EmailJS: crie um serviço/templante e preencha os IDs. O checkout envia os campos:
   - `cliente_nome`, `cliente_email`, `pedido_txid`, `pedido_total`, `pedido_itens`, `pix_payload`.

## Observações
- Carrinho salvo em `localStorage`.
- O QR é gerado com `qrcodejs` via CDN.
- Não há backend. Para pagamentos fora do Pix, você precisará integrar um provedor que funcione em páginas estáticas (ex.: links de pagamento).

Bom deploy! 🚀

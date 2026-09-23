# LinkTree Natan 🚀

Uma homepage de Linktree/Beacons moderna, minimalista e com design escuro premium, criada para máxima conversão nas redes sociais (**Instagram, WhatsApp, TikTok, Telegram**).

---

## ✨ Recursos

- 📱 **Mobile-First & Responsivo**: visual idêntico a um aplicativo nativo no celular e centralizado elegante no computador.
- 🎨 **Design Escuro Premium**: fundo preto absoluto (`#000000`), cartões em formato pílula com micro-interações suaves (hover e clique).
- ⚙️ **Fácil Personalização**: configure o nome, foto, redes e links diretamente no arquivo `config.js` sem tocar em código HTML/CSS.
- 💬 **Aviso de Navegador In-App**: orienta o usuário a abrir no navegador externo (evita que o Instagram bloqueie abertura de links do WhatsApp).
- 🔗 **Botão de Compartilhamento Nativo**: utiliza a Web Share API do celular e copia o link automaticamente caso o usuário esteja no desktop.
- 🔔 **Modal de Inscrição**: formulário para captura de contato (WhatsApp/E-mail).
- 🛡️ **Segurança & Sanitização**: prevenção contra injeção de links maliciosos (`javascript:`).
- 🧪 **100% Testado (TDD)**: suíte de testes unitários e de integração nativa do Node.js.

---

## 🛠️ Como Personalizar os Links

Abra o arquivo [`config.js`](file:///d:/Trabalho/LinkTreeNatan/config.js) e edite os valores:

```javascript
export const linktreeConfig = {
  profile: {
    name: "Seu Nome",
    avatar: "assets/avatar.svg", // ou link de imagem direta /assets/suafoto.jpg
    noticeText: "👉 SE NÃO ABRIR, CLIQUE NOS 3 PONTINHOS E ABRA NO NAVEGADOR!"
  },
  links: [
    {
      id: "whatsapp",
      title: "Canal de Promoções WhatsApp",
      url: "https://chat.whatsapp.com/seu-link",
      icon: "whatsapp",
      highlight: true
    },
    {
      id: "instagram",
      title: "Instagram Oficial",
      url: "https://instagram.com/seu-usuario",
      icon: "instagram"
    },
    {
      id: "tiktok",
      title: "TikTok Oficial",
      url: "https://tiktok.com/@seu-usuario",
      icon: "tiktok"
    }
  ]
};
```

---

## 🚀 Como Testar e Rodar

### Rodar os Testes:
```bash
npm test
```

### Visualizar Localmente:
Você pode abrir diretamente o arquivo `index.html` em qualquer navegador ou iniciar um servidor estático:
```bash
npx serve .
# ou use a extensão Live Server do VS Code
```

---

## 🌐 Como Fazer o Deploy (Grátis)

Você pode publicar em menos de 1 minuto em plataformas como:
- **Vercel**: Basta arrastar a pasta ou conectar o repositório GitHub.
- **Netlify**: Arraste a pasta `LinkTreeNatan` no painel da Netlify Drop.
- **GitHub Pages**: Vá em *Settings > Pages* e selecione o branch principal.

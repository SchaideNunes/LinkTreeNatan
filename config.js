/**
 * ============================================================================
 * CONFIGURAÇÃO DO LINKTREE (LinkTreeNatan)
 * ============================================================================
 * Altere aqui os dados do perfil, textos e links.
 * As alterações refletem automaticamente na página sem precisar alterar o HTML!
 */

export const linktreeConfig = {
  // Informações do Perfil
  profile: {
    name: "Natan",
    handle: "@natan",
    avatar: "assets/avatar.svg",
    // Aviso exibido abaixo do nome (muito útil para evitar bloqueios do navegador do Instagram/TikTok)
    noticeText: "👉 SE NÃO ABRIR, CLIQUE NOS 3 PONTINHOS E ABRA NO NAVEGADOR!",
    // Badge de verificado ao lado do nome (true / false)
    verified: false
  },

  // Ícones rápidos de redes sociais (aparecem logo abaixo do aviso)
  socials: [
    {
      platform: "tiktok",
      url: "https://tiktok.com/@natan"
    },
    {
      platform: "instagram",
      url: "https://instagram.com/natan"
    },
    {
      platform: "whatsapp",
      url: "https://wa.me/5500000000000"
    }
  ],

  // Botões principais de destaque (estilo pílula com ícones coloridos)
  // Ícones disponíveis: "whatsapp", "instagram", "tiktok", "telegram", "external"
  links: [
    {
      id: "whatsapp",
      title: "Canal de Promoções WhatsApp",
      url: "https://chat.whatsapp.com/exemplo",
      icon: "whatsapp",
      highlight: true
    },
    {
      id: "telegram",
      title: "Grupo de Promoções Telegram",
      url: "https://t.me/exemplo",
      icon: "telegram",
      highlight: false
    },
    {
      id: "instagram",
      title: "Instagram Oficial",
      url: "https://instagram.com/natan",
      icon: "instagram",
      highlight: false
    },
    {
      id: "tiktok",
      title: "TikTok Oficial",
      url: "https://tiktok.com/@natan",
      icon: "tiktok",
      highlight: false
    }
  ],

  // Configurações de Compartilhamento (botão superior direito)
  share: {
    title: "Links Oficiais - Natan",
    text: "Acesse meus links oficiais, redes sociais e canais exclusivos:",
    url: typeof window !== 'undefined' ? window.location.href : ""
  },

  // Configurações do Botão "Inscrever-se" (Subscribe)
  subscribe: {
    enabled: true,
    buttonText: "Subscribe",
    modalTitle: "Receba Novidades & Promoções",
    modalSubtitle: "Cadastre-se para receber promoções exclusivas diretamente no seu WhatsApp ou e-mail.",
    placeholder: "Seu WhatsApp ou E-mail",
    submitButtonText: "Quero Receber",
    successMessage: "✅ Inscrição confirmada com sucesso!"
  },

  // Rodapé
  footer: {
    text: "Natan © 2026 • Todos os direitos reservados",
    showWatermark: false
  }
};

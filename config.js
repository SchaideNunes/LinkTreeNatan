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
    bio: "Ofertas exclusivas, conteúdos e novidades em primeira mão",
    statusBadge: "Online agora",
    avatar: "/assets/avatar.svg",
    // Aviso elegante exibido abaixo da bio para evitar bloqueios dos navegadores internos do Instagram/TikTok
    noticeText: "💡 Dica: Toque nos 3 pontinhos e abra no NAVEGADOR para navegar sem limites",
    // Badge de verificado ao lado do nome (true / false)
    verified: true
  },

  // Ícones rápidos de redes sociais (com efeitos modernos de iluminação ao passar o mouse)
  socials: [
    {
      platform: "instagram",
      url: "https://instagram.com/natan"
    },
    {
      platform: "tiktok",
      url: "https://tiktok.com/@natan"
    },
    {
      platform: "whatsapp",
      url: "https://wa.me/5500000000000"
    }
  ],

  // Cartões principais (design moderno com título, subtítulo explicativo e tags de destaque)
  // Ícones disponíveis: "whatsapp", "instagram", "tiktok", "telegram", "external"
  links: [
    {
      id: "whatsapp",
      title: "Canal de Promoções WhatsApp",
      subtitle: "Achadinhos, cupons e ofertas exclusivas direto no celular",
      url: "https://chat.whatsapp.com/exemplo",
      icon: "whatsapp",
      badge: "CANAL VIP",
      highlight: true
    },
    {
      id: "telegram",
      title: "Grupo de Ofertas Telegram",
      subtitle: "Alertas rápidos 24 horas sem perder nada",
      url: "https://t.me/exemplo",
      icon: "telegram",
      highlight: false
    },
    {
      id: "instagram",
      title: "Instagram Oficial",
      subtitle: "Bastidores, novidades do dia a dia e stories",
      url: "https://instagram.com/natan",
      icon: "instagram",
      highlight: false
    },
    {
      id: "tiktok",
      title: "TikTok Oficial",
      subtitle: "Vídeos curtos, reviews e tendências",
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

  // Configurações do Botão de Inscrição / Notificações
  subscribe: {
    enabled: true,
    buttonText: "Canal VIP",
    modalTitle: "Faça Parte da Lista VIP",
    modalSubtitle: "Receba alertas antecipados de promoções e conteúdos restritos diretamente no seu WhatsApp ou e-mail.",
    placeholder: "Digite seu WhatsApp ou E-mail",
    submitButtonText: "Quero Entrar na Lista",
    successMessage: "✅ Inscrição confirmada! Em breve entraremos em contato."
  },

  // Rodapé
  footer: {
    text: "Natan • Todos os direitos reservados",
    showWatermark: false
  }
};

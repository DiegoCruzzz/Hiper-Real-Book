export default {
  "My Computer": {
    filename: "My Computer",
    icon: "mycomputer",
    appProps: {
      app: "Explorer",
      path: "/"
    }
  },
  "My Documents": {
    filename: "My Documents",
    icon: "mydocuments",
    appProps: {
      app: "Explorer",
      path: "/c:/My Documents"
    }
  },
  Reader: {
    filename: "leia-me.txt",
    icon: "text",
    appProps: {
      app: "Reader",
      content: 'leia-me',
    }
  },
  "Hiper Real.mp4": {
    filename: "Hiper Real.mp4",
    icon: "media",
    appProps: {
      app: "ExternalLinkApp",
      url: "https://www.youtube.com/@doxpheal"
    }
  },

  "Sobre": {
  filename: "Sobre",
  icon: "contact",
  appProps: {
    app: "Contact",
    bio: `
      <p><em>Hiper real</em> [livro eletrônico] / Doxpheal. — 1. ed. — Campinas, SP : Ed. do Autor, 2025.</p>
      <p>PDF — ISBN 978-65-01-57114-0</p>
      <p>1. Poesia brasileira I. Título.</p>
      <p>25-284486 CDD-B869.1</p>
    `,
    contact: {
      name: "Doxpheal",
      image: new URL("../img/doxpheal_pic.jpg", import.meta.url).href,
      items: [
        {
          text: "Instagram",
          link: "http://instagram.com/doxpheal_",
          value: "doxpheal_",
        },
      ],
    },
  },
}

};

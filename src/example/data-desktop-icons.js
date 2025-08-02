import playlists from "./data-youtube.json";
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
  // "Media Player": {
  //   filename: "Media Player",
  //   icon: "video",
  //   appProps: {
  //     app: "MediaPlayer",
  //     playlists
  //   }
  // },
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

  // Error: {
  //   filename: "Error",
  //   icon: "default",
  //   appProps: {
  //     app: "ErrorHandler",
  //     error: new Error("oh no"),
  //     debugInfo: "more info here"
  //   }
  // },
  // Alert: {
  //   filename: "Alert",
  //   icon: "default",
  //   appProps: {
  //     app: "Alert",
  //     title: "Alert",
  //     text: "Lorem ipsum"
  //   }
  // },
  // TabDialog: {
  //   filename: "TabDialog",
  //   icon: "default",
  //   appProps: {
  //     app: "TabDialog",
  //     title: "Alert",
  //     tabs: { General: [], "Device Manager": [], Performance: [] }
  //   }
  // },
  // Wizard: (function() {
  //   function generateStep() {
  //     return {
  //       mode: "update",
  //       content:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //       wizardOptions: {},
  //       buttonText: "Finish"
  //     };
  //   }
  //   return {
  //     filename: "Wizard",
  //     appProps: {
  //       app: "Wizard",
  //       title: "Wizard post",
  //       image: "http://placekitten.com/100/300",
  //       wizardOptions: {
  //         "I would like to find out more about the thing": generateStep(),
  //         "I would like to play a game": generateStep(),
  //         "No thanks, I will explore by myself": generateStep()
  //       },
  //       content:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  //     }
  //   };
  // })()
};

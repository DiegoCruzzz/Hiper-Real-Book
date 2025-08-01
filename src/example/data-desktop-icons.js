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
  "@doxpheal": {
    filename: "@doxpheal",
    icon: "default",
    appProps: {
      app: "ExternalLinkApp",
      url: "https://www.youtube.com/@doxpheal"
    }
  },

  "About": {
  filename: "About",
  icon: "contact",
  appProps: {
    app: "Contact",
    bio: `
      <p>Mexican dev living in CDMX. Lover of retro UIs and experimental projects.</p>
      <p>I specialize in JavaScript and creative coding. Always exploring web aesthetics.</p>
    `,
    contact: {
      name: "Diege",
      image: "https://yourdomain.com/images/profile.jpg",
      items: [
        {
          text: "Email",
          link: "mailto:diego@example.com",
          value: "diego@example.com",
        },
        {
          text: "Twitter",
          link: "https://twitter.com/diegobarajas",
          value: "@diegobarajas",
        },
        {
          text: "GitHub",
          link: "https://github.com/diegobarajas",
          value: "diegobarajas",
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

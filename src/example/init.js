import Shell from "../apps/Shell/";
import { h, render, Component } from "preact";
import domready from "domready";
import { Filesystem, File } from "../lib/filesystem";
import mockedFilesystem from "../lib/filesystem/mocks.js";

import ErrorHandler from "../apps/Error/";
import Webview from "../apps/WebView/";
import Wizard from "../apps/Wizard/";
import Explorer from "../apps/Explorer/";
import MediaPlayer from "../apps/MediaPlayer/";
import Alert from "../apps/Alert/";
import Reader from "../apps/Reader/";
import Talks from "../apps/Talks/";
import TabDialog from "../apps/TabDialog/";
import DisplayProperties from "../apps/DisplayProperties/";
import startMenu from "./data-start";
import desktopIcons from "./data-desktop-icons";
const site = { title: "Example ui95 app" };

function Loader(props) {
  console.log(props);
  return (
    <Alert
      {...props}
      title="Placeholder"
      text="This is where you'd make your own component to load this resource from the server & launch the relevant app."
    />
  );
}

const apps = {
  ErrorHandler,
  Webview,
  Wizard,
  Explorer,
  MediaPlayer,
  Alert,
  Reader,
  TabDialog,
  DisplayProperties,
  Talks,
  Loader,
};

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      fs: new Filesystem(),
    };
  }



  createFilesystem() {
    // make some folders and files.
    const files = this.state.fs.files;
    files.push(
      new File("a:", {
        label: "3½ Floppy (A:)",
        appProps: {
          app: "Alert",
          icon: "info",
          title: "A:",
          text: "There is no disk in this drive or the drive door is open. Insert a disk in the drive and make sure the drive door is closed, and then click Retry.",
          width: 400,
          height: 248,
          buttons: [{ text: "Retry" }, { text: "Cancel" }],
        },
      })
    );
    files.push(new File("c:", { label: "Local Disk (C:)" }));

    //-------Folders-----------
    files.push(
      new File("c:/My Documents/Hyper Real", {
          label: "Hyper Real",
          description: "Carpeta de materiales artísticos",
          icon: "folder",
      })
    );

    files.push(
      new File("c:/My Documents/Hyper Real/16", {
          label: "16",
          layout: "details",
          columns: [ "Category", "Created"],
          description: "16",
          icon: "folder",
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/17", {
          label: "17",
          description: "17",
          icon: "folder",
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/18", {
          label: "18",
          description: "18",
          icon: "folder",
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/19", {
          label: "19",
          description: "19",
          icon: "folder",
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/20", {
          label: "20",
          description: "20",
          icon: "folder",
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/21", {
          label: "21",
          description: "21",
          icon: "folder",
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/22", {
          label: "22",
          description: "22",
          icon: "folder",
      })
    );

    mockedFilesystem.forEach((path) => {
      const components = path.split("/");
      const label = components.pop().trim();
      const fullPath = "c:" + path;
      const newFile = new File(fullPath, {
        label,
        appProps: label.includes(".") && {
          app: "Alert",
          title: path,
          html: `${path} is not accessible<br><br>Access is denied.`,
          icon: "error-circle",
        },
      });

    });

    //Leia-me in My Docs--------
    files.push(
      new File("c:/My Documents/Hyper Real/leia-me.txt", {
        label: "leia-me.txt",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "leia-me",
        },
      })
    );

    //---------Folder 16--------------
    files.push(
      new File("c:/My Documents/Hyper Real/16/esperança mística.txt", {
        label: "esperança mística.txt",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        description: "Created at 2015/2/1 00:00",
        appProps: {
          app: "Reader",
          content: "esperanca-mistica"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/dores de ternura.txt", {
        label: "dores de ternura.txt",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        description: "Created at 2015/3/22 23:44",
        appProps: {
          app: "Reader",
          content: "dores-de-ternura"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/morte dos desejos abandonados.txt", {
        label: "morte dos desejos abandonados.txt",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        description: "Created at 2015/4/20 06:26",
        appProps: {
          app: "Reader",
          content: "morte-dos-desejos"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/intermináveis impactos do tempo.txt", {
        label: "intermináveis impactos do tempo.txt",
        description: "Created at 2015/4/9 17:11",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "interminaveis-impactos"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/nômade.txt", {
        label: "nômade.txt",
        description: "Created at 2015/5/13 00:00",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "nomade"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/silheutas da existência.txt", {
        label: "silheutas da existência.txt",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        description: "Created at 2015/6/5 17:50",
        appProps: {
          app: "Reader",
          content: "silheutas-da-existencia"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/surpresa premeditada.txt", {
        label: "surpresa premeditada.txt",
        description: "Created at 2015/6/21 01:20",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "surpresa-premeditada"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/delírios isentos de dor.txt", {
        label: "delírios isentos de dor.txt",
        description: "Created at 2015/7/12 21:28",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "delirios-isentos"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/sobre você.txt", {
        label: "sobre você.txt",
        description: "Created at 2015/7/21 00:44",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "sobre-voce"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/3 da manhã.txt", {
        label: "3 da manhã.txt",
        description: "Created at 2015/7/23 02:50",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "3-da-manha"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/encantamento complicado.txt", {
        label: "encantamento complicado.txt",
        description: "Created at 2015/8/13 12:38",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "encantamento-complicado"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/duplipensando.txt", {
        label: "duplipensando.txt",
        description: "Created at 2015/8/16 00:00",
        icon: "wordpad",
        Category: "Blog",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "duplipensando"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/16/dezesseis.jpeg", {
        label: "dezesseis.jpeg",
        description: "Created at 2014/9/4 00:00",
        icon: "paint",
        Category: "Image",
        Created: "2015/4/9 17:11",
        appProps: {
          app: "Reader",
          content: "dezesseis"
        },
      })
    );

    //----------Folder 17------------
    files.push(
      new File("c:/My Documents/Hyper Real/17/hastes frias.txt", {
        label: "hastes frias.txt",
        description: "Created at 2015/11/17 00:00",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "hastes-frias"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/17/impreciso.txt", {
        label: "impreciso.txt",
        description: "Created at 2015/11/17 00:00",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "impreciso"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/17/último parágrafo.txt", {
        label: "último parágrafo.txt",
        description: "Created at 2016/4/21 00:00",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "ultimo-paragrafo"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/17/dezessete.jpeg", {
        label: "dezessete.jpeg",
        description: "Created at 2015/9/4 00:00",
        icon: "media",
        appProps: {
          app: "Reader",
          content: "dezessete"
        },
      })
    );
    //----------Folder 18------------
    files.push(
      new File("c:/My Documents/Hyper Real/18/sentidos.txt", {
        label: "sentidos.txt",
        description: "Created at 2017/1/20 00:00",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "sentidos"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/18/inefável.txt", {
        label: "inefável.txt",
        description: "Created at 2017/5/8 05:32",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "inefavel"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/18/trigo.txt", {
        label: "trigo.txt",
        description: "Created at 2017/5/11 02:16",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "trigo"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/18/senhorita v.txt", {
        label: "senhorita v.txt",
        description: "Created at 2017/5/6 02:10",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "senhorita-v"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/18/doce vermelho.txt", {
        label: "doce vermelho.txt",
        description: "Created at 2017/6/10 08:06",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "doce-vermelho"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/18/sonhos.txt", {
        label: "sonhos.txt",
        description: "Created at 2017/6/28 00:00",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "sonhos"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/18/29.08.2017.txt", {
        label: "29.08.2017.txt",
        description: "Created at 2017/8/29 07:32",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "29.08.2017"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/18/dezoito.jpeg", {
        label: "dezoito.jpeg",
        description: "Created at 2016/9/4 00:00",
        icon: "media",
        appProps: {
          app: "Reader",
          content: "dezoito"
        },
      })
    );
    //----------Folder 19------------
    files.push(
      new File("c:/My Documents/Hyper Real/19/iteração.txt", {
        label: "iteração.txt",
        description: "Created at 2017/12/5 06:51",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "iteracao"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/19/fecho os olhos para ver.txt", {
        label: "fecho os olhos para ver.txt",
        description: "Created at 2017/12/5 06:51",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "fecho-os-olhos"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/19/dezenove.jpeg", {
        label: "dezenove.jpeg",
        description: "Created at 2017/9/4 00:00",
        icon: "media",
        appProps: {
          app: "Reader",
          content: "dezenove"
        },
      })
    );
    //----------Folder 20------------
    files.push(
      new File("c:/My Documents/Hyper Real/20/iteração II.txt", {
        label: "iteração II.txt",
        description: "Created at 2018/12/3 02:11",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "iteracao-2"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/20/ventos de marte.txt", {
        label: "ventos de marte.txt",
        description: "Created at 2019/2/17 14:32",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "ventos-de-marte"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/20/meu, seu, dela e deles também.txt", {
        label: "meu, seu, dela e deles também.txt",
        description: "Created at 2019/5/28 01:11",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "meu-seu-dela"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/20/está tudo bem bordar minhas veias na ternura da sua presença para que ela nunca desapareça.txt", {
        label: "está tudo bem bordar minhas veias na ternura da sua presença para que ela nunca desapareça.txt",
        description: "Created at 2019/9/3 23:59",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "esta-tudo-bem"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/20/vinte.jpeg", {
        label: "vinte.jpeg",
        description: "Created at 2018/9/4 00:00",
        icon: "media",
        appProps: {
          app: "Reader",
          content: "vinte"
        },
      })
    );
    //----------Folder 21------------
    files.push(
      new File("c:/My Documents/Hyper Real/21/stand by me.txt", {
        label: "stand by me.txt",
        description: "Created at 2019/9/25 00:32",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "stand-by-me"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/21/saudações de verão.txt", {
        label: "saudações de verão.txt",
        description: "Created at 2020/3/26 16:15",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "saudacoes-de-verao"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/21/nuclear.txt", {
        label: "nuclear.txt",
        description: "Created at 2020/4/1 15:38",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "nuclear"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/21/frenesi cristalino.txt", {
        label: "frenesi cristalino.txt",
        description: "Created at 2020/8/28 07:10",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "frenesi-cristalino"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/21/fobias.txt", {
        label: "fobias.txt",
        description: "Created at 2020/9/3 17:58",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "fobias"
        },
      })
    );
      files.push(
      new File("c:/My Documents/Hyper Real/21/ausência eternizada.txt", {
        label: "ausência eternizada.txt",
        description: "Created at 2020/9/3 23:59",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "ausencia-eternizada"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/21/vinte e um.jpeg", {
        label: "vinte e um.jpeg",
        description: "Created at 2019/9/4 00:00",
        icon: "media",
        appProps: {
          app: "Reader",
          content: "vinte-um"
        },
      })
    );
    //----------Folder 22------------
    files.push(
      new File("c:/My Documents/Hyper Real/22/você disse alguma coisa.txt", {
        label: "você disse alguma coisa.txt",
        description: "Created at 2020/12/14 04:09",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "voce-disse-alguma"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/22/matéria cinza.txt", {
        label: "matéria cinza.txt",
        description: "Created at 22020/12/15 01:20",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "materia-cinza"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/22/matéria cinza.txt", {
        label: "matéria cinza.txt",
        description: "Created at 22020/12/15 01:20",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "materia-cinza"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/22/observação panorâmica de novas partículas.txt", {
        label: "observação panorâmica de novas partículas.txt",
        description: "Created at 2021/4/1 00:00",
        icon: "text",
        appProps: {
          app: "Reader",
          content: "observacao-panoramica"
        },
      })
    );
    files.push(
      new File("c:/My Documents/Hyper Real/22/vinte e dois.jpeg", {
        label: "vinte e dois.jpeg",
        description: "Created at 2020/9/4 00:00",
        icon: "media",
        appProps: {
          app: "Reader",
          content: "vinte-dois"
        },
      })
    );



  }
  componentDidMount() {
    this.createFilesystem();
  }
  render(props) {
    // Initialise our shell app. This includes the desktop, start menu, space
    // for all the apps to be drawn in.
    const { fs } = this.state;
    return (
      <Shell
        fs={fs}
        startMenu={startMenu}
        desktopIcons={desktopIcons}
        apps={apps}
        ref={(shell) => (this.shell = shell)}
        site={site}
        fullscreen
      />
    );
  }
}

domready(() => {
  render(<Wrapper />, document.body);
});

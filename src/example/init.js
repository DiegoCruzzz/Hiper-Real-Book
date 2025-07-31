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
import ExternalLinkApp from "../apps/ExternalLink";
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
  ExternalLinkApp,
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

  createBlogFile(basePath, filename, content, createdDate) {
    const fullPath = `${basePath}/${filename}`;
    const label = `${filename}`;
    const description = `Created at ${createdDate}`;
    return new File(fullPath, {
      label,
      icon: "wordpad",
      Category: "Blog",
      Created: createdDate,
      description,
      appProps: {
        app: "Reader",
        content,
      },
    });
  }

  createSingleVideoFile(basePath, filename, videoId, createdDate) {
    const fullPath = `${basePath}/${filename}`;
    const label = `${filename}`;
    const description = `Created at ${createdDate}`;
    return new File(fullPath, {
      label,
      icon: "media",
      Category: "Video",
      Created: createdDate,
      description,
      appProps: {
        app: "MediaPlayer",
        mode: "renderCurrentlyPlaying",
        videoId: videoId,
        playlists: []
      },
    });
  }

  createImageFile(basePath, filename, content, createdDate) {
    const fullPath = `${basePath}/${filename}.jpeg`;
    const label = `${filename}.jpeg`;
    const description = `Created at ${createdDate}`;
    return new File(fullPath, {
      label,
      icon: "paint",
      Category: "Image",
      Created: createdDate,
      description,
      appProps: {
        app: "Reader",
        content,
      },
    });
  }

  createLinkFile(basePath, icon, filename, url, createdDate) {
    const fullPath = `${basePath}/${filename}`;
    const label = `${filename}`;
    const description = `Created at ${createdDate}`;
    let category;
    if (icon === "default") {
      category = "URL";
    } else if (icon === "media") {
      category = "Video";
    } else if (icon === "sound") {
      category = "Podcast";
    } else {
      category = "Image";
    }

    return new File(fullPath, {
      label,
      icon: icon,
      Category: category,
      Created: createdDate,
      description,
      appProps: {
        app: "ExternalLinkApp",
        url,
      },
    });
  }

  createDownloadFile(basePath, filenameWithoutExtension, extension, createdDate, category = "Image", contentType = "download") {
    const fullPath = `${basePath}/${filenameWithoutExtension}.${extension}`;
    const label = `${filenameWithoutExtension}.${extension}`;
    const description = `Created at ${createdDate}`;

    let icon = "document";
    if (extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "gif" || extension === "webp") {
      icon = "paint";
    }

    return new File(fullPath, {
      label,
      icon: icon,
      Category: category,
      Created: createdDate,
      description,
      appProps: {
        app: "Reader",
        content: filenameWithoutExtension,
        contentType: contentType,
      },
    });
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

    files.push(
      new File("c:/My Documents", {
          label: "My Documents",
          description: "My Documents",
          icon: "mydocuments",
      })
    );

    //-------Folders-----------
    const folderNames = ["Hiper Real", "Download"];
    folderNames.forEach((folderName) => {
      files.push(
        new File(`c:/My Documents/${folderName}`, {
          label: folderName,
          description: `${folderName} Folder`,
          icon: "folder",
        })
      );
    });

    const detailedFolderNames = ["Video", "Podcast"];
    detailedFolderNames.forEach((detailedFolderNames) => {
      files.push(
        new File(`c:/My Documents/${detailedFolderNames}`, {
          label: detailedFolderNames,
          layout: "details",
          columns: ["Category", "Created"],
          description: `${detailedFolderNames} Folder`,
          icon: "folder",
        })
      );
    });

    files.push(
      new File("c:/My Documents/Download/History", {
          label: "History",
          layout: "details",
          columns: ["Category", "Created"],
          description: "History Folder",
          icon: "folder",
      })
    );

    for (let i = 16; i <= 22; i++) {
      files.push(
        new File(`c:/My Documents/Hiper Real/${i}`, {
          label: `${i}`,
          layout: "details",
          columns: ["Category", "Created"],
          description: `${i}`,
          icon: "folder",
        })
      );
    }

    //-----------------------------
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


    //---------Folder 16--------------
    const path16 = "c:/My Documents/Hiper Real/16";
    files.push(this.createBlogFile(path16, "esperança mística", "esperanca-mistica", "2015/2/1 00:00"));
    files.push(this.createBlogFile(path16, "dores de ternura", "dores-de-ternura", "2015/3/22 23:44"));
    files.push(this.createBlogFile(path16, "morte dos desejos abandonados", "morte-dos-desejos", "2015/4/20 06:26"));
    files.push(this.createBlogFile(path16, "intermináveis impactos do tempo", "interminaveis-impactos", "2015/4/9 17:11"));
    files.push(this.createBlogFile(path16, "nômade", "nomade", "2015/5/13 00:00"));
    files.push(this.createBlogFile(path16, "silheutas da existência", "silheutas-da-existencia", "2015/6/5 17:50"));
    files.push(this.createBlogFile(path16, "surpresa premeditada", "surpresa-premeditada", "2015/6/21 01:20"));
    files.push(this.createBlogFile(path16, "delírios isentos de dor", "delirios-isentos", "2015/7/12 21:28"));
    files.push(this.createBlogFile(path16, "sobre você", "sobre-voce", "2015/7/21 00:44"));
    files.push(this.createBlogFile(path16, "3 da manhã", "3-da-manha", "2015/7/23 02:50"));
    files.push(this.createBlogFile(path16, "encantamento complicado", "encantamento-complicado", "2015/8/13 12:38"));
    files.push(this.createBlogFile(path16, "duplipensando", "duplipensando", "2015/8/16 00:00"));
    files.push(this.createImageFile(path16, "dezesseis", "dezesseis", "2014/9/4 00:00"));

    //---------Folder 17--------------
    const path17 = "c:/My Documents/Hiper Real/17";
    files.push(this.createBlogFile(path17, "hastes frias", "hastes-frias", "2015/11/17 00:00"));
    files.push(this.createBlogFile(path17, "impreciso", "impreciso", "2015/11/17 00:00"));
    files.push(this.createBlogFile(path17, "último parágrafo", "ultimo-paragrafo", "2016/4/21 00:00"));
    files.push(this.createImageFile(path17, "dezessete", "dezessete", "2015/9/4 00:00"));

    //---------Folder 18--------------
    const path18 = "c:/My Documents/Hiper Real/18";
    files.push(this.createBlogFile(path18, "sentidos", "sentidos", "2017/1/20 00:00"));
    files.push(this.createBlogFile(path18, "inefável", "inefavel", "2017/5/8 05:32"));
    files.push(this.createBlogFile(path18, "trigo", "trigo", "2017/5/11 02:16"));
    files.push(this.createBlogFile(path18, "senhorita v", "senhorita-v", "2017/5/6 02:10"));
    files.push(this.createBlogFile(path18, "doce vermelho", "doce-vermelho", "2017/6/10 08:06"));
    files.push(this.createBlogFile(path18, "sonhos", "sonhos", "2017/6/28 00:00"));
    files.push(this.createBlogFile(path18, "29.08.2017", "29.08.2017", "2017/8/29 07:32"));
    files.push(this.createImageFile(path18, "dezoito", "dezoito", "2016/9/4 00:00"));

    //---------Folder 19--------------
    const path19 = "c:/My Documents/Hiper Real/19";
    files.push(this.createBlogFile(path19, "iteração", "iteracao", "2017/12/5 06:51"));
    files.push(this.createBlogFile(path19, "fecho os olhos para ver", "fecho-os-olhos", "2018/8/21 08:44"));
    files.push(this.createImageFile(path19, "dezenove", "dezenove", "2017/9/4 00:00"));

    //---------Folder 20--------------
    const path20 = "c:/My Documents/Hiper Real/20";
    files.push(this.createBlogFile(path20, "iteração II", "iteracao-2", "2018/12/3 02:11"));
    files.push(this.createBlogFile(path20, "ventos de marte", "ventos-de-marte", "2019/2/17 14:32"));
    files.push(this.createBlogFile(path20, "meu, seu, dela e deles também", "meu-seu-dela", "2019/5/28 01:11"));
    files.push(this.createBlogFile(path20, "está tudo bem bordar minhas veias na ternura da sua presença para que ela nunca desapareça", "esta-tudo-bem", "2019/9/3 23:59"));
    files.push(this.createImageFile(path20, "vinte", "vinte", "2018/9/4 00:00"));

    //---------Folder 21--------------
    const path21 = "c:/My Documents/Hiper Real/21";
    files.push(this.createBlogFile(path21, "stand by me", "stand-by-me", "2019/9/25 00:32"));
    files.push(this.createBlogFile(path21, "saudações de verão", "saudacoes-de-verao", "2020/3/26 16:15"));
    files.push(this.createBlogFile(path21, "nuclear", "nuclear", "2020/4/1 15:38"));
    files.push(this.createBlogFile(path21, "frenesi cristalino", "frenesi-cristalino", "2020/8/28 07:10"));
    files.push(this.createBlogFile(path21, "fobias", "fobias", "2020/9/3 17:58"));
    files.push(this.createBlogFile(path21, "ausência eternizada", "ausencia-eternizada", "2020/9/3 23:59"));
    files.push(this.createImageFile(path21, "vinte e um", "vinte-um", "2019/9/4 00:00"));

    //---------Folder 22--------------
    const path22 = "c:/My Documents/Hiper Real/22";
    files.push(this.createBlogFile(path22, "você disse alguma coisa", "voce-disse-alguma", "2020/12/14 04:09"));
    files.push(this.createBlogFile(path22, "matéria cinza", "materia-cinza", "2020/12/15 01:20"));
    files.push(this.createBlogFile(path22, "observação panorâmica de novas partículas", "observacao-panoramica", "2021/4/1 00:00"));
    files.push(this.createImageFile(path22, "vinte e dois", "vinte-dois", "2020/9/4 00:00"));

    //---------Folder Download--------------
    const downloadPath = "c:/My Documents/Download";
    files.push(this.createDownloadFile(downloadPath, "angelica_nene_vila_matilde", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "azealia_megaphone", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "bafora_amiga", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "beans", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "big_imitando_emojis", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "cardi_sus", "gif", "2025/7/27 00:00", "Image", "download"));
    //files.push(this.createDownloadFile(downloadPath, "coesão_conceito_aclamação", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "dies_cringe", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "esnupi_acabado", "jpg", "2025/7/27 00:00", "Image", "download")); // Corregido el nombre
    files.push(this.createDownloadFile(downloadPath, "friend_too_woke", "jpeg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gloria_maria_mosteiro", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gloria_maria_rihanna_montanha_anti", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_anotado", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_artista_vdd", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_dancando", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_faca", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_fatos", "jpeg", "2025/7/27 00:00", "Image", "download")); // Corregida la extensión
    files.push(this.createDownloadFile(downloadPath, "gretchen_hj_em_dia", "webp", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_o_que", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_parabens", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_paris", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_telefone", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "hubert", "png", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "if_you_re_from_shut_up", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ines_calor", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ines_coca", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ines_comida", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ines_encarando", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ines_mamao", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ines_peace", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ines_vamo_fazer_o_que", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "jasmine_xmas", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ler_escrever_carrossel", "jpeg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "mulher_pepita_celular_pizza", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "nicki_stalkin_real_bitch", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pabllo_nojo", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pass_the_blunt", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_arrepiada", "webp", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_foda-se", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_katniss", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_levantando", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_nao_preocupe", "jpeg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_pilintra", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_porra", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_ran", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_so_crazy_love_her", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_staring", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "pepita_xiu", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "que_mecanismo", "jpeg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "rainha-do-pop-gaga", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "skyferreira_fev_marc", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ta_no_face", "webp", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "talento_charts_gretchen", "jpeg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "talvez_venha_ai", "jpg", "2025/7/27 00:00", "Image", "download")); // Corregido el nombre
    files.push(this.createDownloadFile(downloadPath, "the_good_days_bitch_raising_her_glass", "jpg", "2025/7/27 00:00", "Image", "download")); // Corregido el nombre
    files.push(this.createDownloadFile(downloadPath, "tiffany_crying_car", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "topico_bobo", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "tulla_chorando_celular", "webp", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "tulla_confetti", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "tulla_luana_batendo", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "tulla_saude", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "urach_dancando", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "urach_mistica", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "urach_moonwalk", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "urach_nuances", "jpeg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "urach_pose", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "urach_shocked", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "wanessa_wolf_reverso", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "we_hit_the_elevator_madonna", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "ygona_olhos_do_pai", "jpg", "2025/7/27 00:00", "Image", "download"));

    //---------Folder History--------------
    const videoHistoryPath = "c:/My Documents/Download/History"
    files.push(this.createSingleVideoFile(videoHistoryPath, "TLC - FanMail - 14. Communicate (Interlude)", "w7RJDe7t7mk", "2021/11/16 17:28"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Ney Matogrosso - Poema", "QyB6xSt52AQ", "2021/7/22 22:00"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "AmarElo - É Tudo Pra Ontem | Trailer oficial | Netflix", "FQ9hCN0ZYSg", "2020/12/8 00:00"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "The Moral Responsibility of the Artist", "PlnDbqLNv-M", "2021/5/13 07:00"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Give yourself permission to be creative | Ethan Hawke", "WRS9Gek4V5Q", "2020/10/15 07:20"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Favorite Scene from one of The Twilight Zone episodes", "QUn2BNydxIY", "2020/5/13 05:39"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "HAVERÁ ARTE DEPOIS DO CORONAVÍRUS?", "kUP1Qv8w4V4", "2020/3/31 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Rick Rubin & Andre 3000 Talk Andre's Current Struggle With Creation on Broken Record Podcast", "g2ZLxtqJuKE", "2019/12/24 16:51"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Johnny Castaway (Screensaver) (Sierra On-Line) [Christmas Special] [8 hours]", "-_Hn-wfX25g", "2019/12/25 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "John Waters Commencement - RISD 2015", "Hl05XGifKb4", "2019/12/9 19:20"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "This Is Water David Foster Wallace Commencement Speech", "DCbGM4mqEVw", "2019/12/9 19:20"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Saint Etienne - Everything Flows", "A_YiWO0KO7M", "2019/10/19 00:00"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Gonzanguinha Pequena Memória para um tempo sem memória", "_8kbEccj33c", "2018/10/28 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Listen To Martian Wind Through NASA Insight Lander’s Sensors", "1PtdjFnY64M", "2019/2/17 13:51"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "FKA twigs - Cellophane", "YkLjqFpBh84", "2019/4/24 00:00"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "RuPaul teaches Nelson how to be a Drag Queen", "nqx8xOimNYo", "2016/3/16 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Prince The Artist giving advice about Internet", "Iy7i9ru7HB8", "2016/4/21 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Atlanta Transracial", "x85u_9Qlh1U", "2016/10/12 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Mark Fisher - Cybertime Crisis", "zOQgCg73sfQ", "2017/1/7 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Andrei Tarkovsky on the purpose of art and spirituality", "d7qZFe7elAQ", "2017/4/4 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Before Sunrise - Get off the train scene", "DQ8Q6VuyB74", "2017/3/10 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Back to the Future Part 2 Movie CLIP - Hill Valley, 2015 (1989) HD", "d68yRIE9OvQ", "2015/10/21 16:29"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "I Know It's Over (2011 Remaster)", "iey0VOhxV2Y", "2015/11/17 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Daria's Graduation Speech", "PdG9pBtP9D4", "2015/12/17 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "David Bowie predicted in 1999 the impact of the Internet in BBC interview", "LaHcOs7mhfU", "2016/1/10 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Spike Lee & Pharrell Williams on Hard Work & Opportunity | ARTST TLK™ Ep. 9 Part 2 |Reserve Channel", "_aHpxr4Cw6o", "2016/2/2 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Virgo - Free Yourself", "j5NDni1aSXI", "1998/9/4 00:00"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "mscl S1 E19 ending", "94YXaLKM3Ig", "2012/12/7 12:20"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "POW! We took care of the time travel paradox!", "Qi7egXgYcgk", "2012/12/21 00:00"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Peppa La Beijja", "hJuld3FYy1I", "2013/3/10 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "The Message by M.I.A. | Interscope", "Sa8hXJowm_M", "2013/6/6 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "First computer to sing - Daisy Bell", "41U78QP8nBk", "2013/11/17 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "No Direction Home [reading a store sign scene]", "rBP9QKwW19Y", "2014/2/28 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Live To Tell /Oh Father - Madonna Blond Ambition Japan Tour '90", "tb2hyuEvQHs", "2014/6/4 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Leona Vingativa - Eu quero um boy (Cover Gaby Amarantos)", "g2wOb7CTtxw", "2014/7/8 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Computer Love (2009 Remaster)", "uNBGWenPlGo", "2014/12/14 07:43"));
    files.push(this.createSingleVideoFile(videoHistoryPath, "Happy Birthday, Bitch! - Loiter Squad", "RwyKQ_j7Vew", "2014/9/4 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Google", "https://www.google.com", "1998/9/4 00:00"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Aeon Flux - Chronophasia", "https://vimeo.com/138332818", "2000/1/1 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "frank ocean tumblr", "https://frankocean.tumblr.com/post/26473798723", "2012/11/17 12:20"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "MSN morre dia 15 de março, para dar lugar ao Skype", "https://exame.com/tecnologia/msn-sera-encerrado-oficialmente-dia-15-de-marco/", "2013/1/9 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Teenage Bedrooms on Screen", "https://teenagebedroomsonscreen.com/", "2013/3/1 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "the camera in the mirror", "https://the-camera-in-the-mirror.tumblr.com/", "2013/6/6 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Orkut", "http://orkut.com", "2014/9/30 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "A New Kind of Social Anxiety in the Classroom", "https://www.theatlantic.com/education/archive/2015/01/the-socially-anxious-generation/384458/", "2015/8/16 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "deep breath anxiety gif", "https://www.google.com/search?q=deep+breath+anxiety+gif&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjWsuug2cjmAhUTELkGHVeAC6wQ_AUoAXoECAsQAw&biw=1366&bih=635", "2015/8/16 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Watch Kanye West's Yeezy Season 3 Livestream Here", "https://www.complex.com/sneakers/a/brendan-dunne/yeezy-season-3-stream-kanye-west", "2016/2/11 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Boys Don’t Cry", "https://boysdontcry.co/", "2016/8/20 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "truisms", "https://truisms.space/", "2016/8/20 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "What Rave Culture Is Teaching Modern Graphic Designers", "https://eyeondesign.aiga.org/what-rave-culture-is-teaching-modern-graphic-designers/", "2016/8/24 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "k-punk", "https://k-punk.org/", "2017/1/7 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "World Premiere: Ren Hang’s Journal of Depression", "https://web.archive.org/web/20170313071337/http://www.thechronicle.ro/arts-culture/world-premiere-ren-hangs-journal-of-depression/", "2017/2/24 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Simulacros e Simulações", "https://monoskop.org/images/c/c4/Baudrillard_Jean_Simulacros_e_simula%C3%A7%C3%A3o_1991.pdf", "2017/7/3 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Frank Ocean @Northside", "https://www.pscp.tv/w/1ypKdrmwbqYJW", "2017/6/9 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "8bitrama", "https://vimeo.com/32740755", "2017/12/1 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "The Politics of Design - Ruben Pater", "https://issuu.com/bis_publishers/docs/the_politics_of_design", "2018/3/17 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "How Trump Consultants Exploited the Facebook Data of Millions - The New York Times", "https://www.nytimes.com/2018/03/17/us/politics/cambridge-analytica-trump-campaign.html", "2018/3/17 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "pandora’s vox: on community in cyberspace", "https://gist.github.com/kolber/2131643", "2018/3/17 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Kanye West - YE Listening Party at Wyoming", "http://wav.media/s/5YkTNMzR", "2018/5/31 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "A poesia é traduzível?", "http://www.scielo.br/scielo.php?script=sci_arttext&pid=S0103-40142012000300002", "2018/6/9 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "IRL: Online Life is Real Life", "https://open.spotify.com/show/0vT7LJMeVDxyQ2ZamHKu08", "2018/9/4 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power", "https://eddierockerz.com/wp-content/uploads/2020/11/the-age-of-surveillance-capitalism-the-fight-for-a-human-future-at-the-new-frontier-of-power-pdfdrive-.pdf", "2018/10/1 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Why'd You Push That Button?", "https://open.spotify.com/show/4xEBxMawkpToKdcnSTI7Ze?si=150f34e5a60b44d8", "2018/12/1 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "First Image of a Black Hole - NASA Science", "https://science.nasa.gov/resource/first-image-of-a-black-hole/", "2019/4/10 00:00"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Facebook is a growing and unstoppable digital graveyard", "https://www.bbc.com/future/article/20160313-the-unstoppable-rise-of-the-facebook-dead", "2019/4/27 06:46"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Paulo Freire - Pedagogia da Esperança", "https://construindoumaprendizado.wordpress.com/wp-content/uploads/2012/12/paulo-freire-pedagogia-da-esperanc3a7a-desbloqueado.pdf", "2019/6/26 20:30"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "3: Quem tem medo de Criança Viada? by Santíssima Trindade das Perucas", "https://open.spotify.com/episode/5wtuqGyAf71p5jdWLBVqiR?si=KdefJipUTAu435ddYvnBWw", "2019/9/14 19:30"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "So the internet didn’t turn out the way we hoped. Where do we go from here?", "https://www.nytimes.com/interactive/2019/11/14/magazine/internet-future-dream.html", "2019/11/13 00:00"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Aeon Flux 1995 S03E04 A Last Time for Everything", "https://www.dailymotion.com/video/x6ijh4h", "2019/11/17 00:00"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "ANDRE 3000 AND RICK RUBIN IN CONVERSATION", "https://brokenrecordpodcast.com/episode-13-andre-3000-and-rick-rubin-in-conversation", "2019/12/24 16:51"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Rick Rubin & Andre 3000 Talk Isolation, Loneliness & Wanting To Feel Normal on Broken Record Podcast", "https://www.youtube.com/watch?v=ITu1QqH0a7w", "2019/12/24 16:51"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Alexander Leon on X: \"Queer people don't grow up as ourselves...\"", "https://x.com/alexand_erleon/status/1214459404575100928?lang=en", "2020/1/7 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Rabbit Hole by The New York Times", "https://open.spotify.com/show/6dqqC8nkBTC3ldRs7pP4qn?si=DllQCtk-QAGyC6ysqmh3NA", "2020/4/23 07:43"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Quem tem medo do cancelamento?", "https://gamarevista.com.br/semana/ta-com-medo/o-medo-da-cultura-do-cancelamento/", "2020/7/26 20:54"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Chi Chi DeVayne & Thorgy Thor LSFYL | And I Am Telling You I'm Not Going - Jennifer Holliday", "https://www.facebook.com/logo/videos/chi-chi-devayne-thorgy-thor-lsfyl-and-i-am-telling-you-im-not-going-jennifer-hol/2753230954896979/", "2020/8/20 00:00"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Podcast Tecnopolítica", "https://www.youtube.com/c/PodcastTecnopol%C3%ADtica", "2020/9/3 00:00"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "TODAY'S NUMBER IS... 9/4/20", "https://www.youtube.com/watch?v=tvJXEj6PmiA", "2020/9/4 00:00"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Underground Resistance - Transition", "https://soundcloud.com/undergroundresistance/underground-resistance-transition", "2020/11/17 13:56"));
    files.push(this.createLinkFile(videoHistoryPath, "default", "Kanye West Presents: a DONDA Listening Event", "https://music.apple.com/us/station/kanye-west-presents-a-donda-listening-event/ra.1577426343", "2021/7/22 22:00"));

    //---------Folder Video--------------
    const videoPath = "c:/My Documents/Video"
    files.push(this.createLinkFile(videoPath, "media", "5ninthavenueproject", "https://www.youtube.com/@5ninthavenueproject", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "ActionKid", "https://www.youtube.com/@ActionKid", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Aetia", "https://www.youtube.com/@AetiaEditorial", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "ALEX AVILA", "http://youtube.com/@alexander_avila", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Amador e Jr. Segurança Patrimonial Ltda.", "https://www.youtube.com/@amadorejr", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Arquivo Transformista", "https://www.youtube.com/@arquivotransformista", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Bianca DellaFancy", "https://www.youtube.com/@BiancaDellaFancy", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Bienal de São Paulo", "https://www.youtube.com/@bienalsp", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Bliss Foster", "https://www.youtube.com/@BlissFoster", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Boiler Room", "https://www.youtube.com/@boilerroom", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Christian Dunker", "https://www.youtube.com/@chrisdunker", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "It's Nice That", "https://www.youtube.com/@itsnicethat", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Louisiana Channel", "https://www.youtube.com/@thelouisianachannel", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "NardwuarServiette", "https://www.youtube.com/@nardwuar", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Maria Homem", "https://www.youtube.com/@MariaHomem", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Opera Mundi", "https://www.youtube.com/@omundi", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Pausa Para o Fim do Mundo", "https://www.youtube.com/@PausaParaoFimdoMundo", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Podcast Tecnopolítica", "https://www.youtube.com/c/PodcastTecnopol%C3%ADtica", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Razão Inadequada", "https://www.youtube.com/@razaoinadequada", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "NORMOSENORMOSE", "https://www.youtube.com/@Normose_", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Resident Advisor", "https://www.youtube.com/@ResidentAdvisor", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Schizofia: Teoria e Filosofia Pós-Moderna", "https://www.youtube.com/@schizofia/videos", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Tempero Drag", "https://www.youtube.com/@TemperoDrag", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "ter.a.pia", "https://www.youtube.com/@historiasdeterapia", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Tese Onze", "https://www.youtube.com/@TeseOnze", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "The New Centre for Research & Practice", "https://www.youtube.com/@NewCentre", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Transe", "https://www.youtube.com/@Transe", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Casa do Saber", "https://www.youtube.com/@casadosaber", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "CLINICAND - PSICANÁLISE E ESQUIZOANÁLISE", "https://www.youtube.com/@CLINICAND", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Heribaldo Maia", "https://www.youtube.com/@heribaldomaia", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "ContraPoints", "https://www.youtube.com/@ContraPoints", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Jonas Čeika - CCK Philosophy", "https://www.youtube.com/@jonasceikaCCK", "2025/7/27 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "First Image of a Black Hole - NASA Science", "https://science.nasa.gov/resource/first-image-of-a-black-hole/", "2019/4/10 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Facebook is a growing and unstoppable digital graveyard", "https://www.bbc.com/future/article/20160313-the-unstoppable-rise-of-the-facebook-dead", "2019/4/27 06:46"));
    files.push(this.createLinkFile(videoPath, "media", "Paulo Freire - Pedagogia da Esperança", "https://construindoumaprendizado.wordpress.com/wp-content/uploads/2012/12/paulo-freire-pedagogia-da-esperanc3a7a-desbloqueado.pdf", "2019/6/26 20:30"));
    files.push(this.createLinkFile(videoPath, "media", "3: Quem tem medo de Criança Viada? by Santíssima Trindade das Perucas", "https://open.spotify.com/episode/5wtuqGyAf71p5jdWLBVqiR?si=KdefJipUTAu435ddYvnBWw", "2019/9/14 19:30"));
    files.push(this.createLinkFile(videoPath, "media", "So the internet didn’t turn out the way we hoped. Where do we go from here?", "https://www.nytimes.com/interactive/2019/11/14/magazine/internet-future-dream.html", "2019/11/13 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "Aeon Flux 1995 S03E04 A Last Time for Everything", "https://www.dailymotion.com/video/x6ijh4h", "2019/11/17 00:00"));
    files.push(this.createLinkFile(videoPath, "media", "ANDRE 3000 AND RICK RUBIN IN CONVERSATION", "https://brokenrecordpodcast.com/episode-13-andre-3000-and-rick-rubin-in-conversation", "2019/12/24 16:51"));
    files.push(this.createLinkFile(videoPath, "media", "Rick Rubin & Andre 3000 Talk Isolation, Loneliness & Wanting To Feel Normal on Broken Record Podcast", "https://www.youtube.com/watch?v=ITu1QqH0a7w", "2019/12/24 16:51"));


    //---------Folder Podcast--------------
    const podcastPath = "c:/My Documents/Podcast"
    files.push(this.createLinkFile(podcastPath, "sound", "ARE WE ON AIR?", "https://open.spotify.com/show/3jkmlUkOfQqofQabtYhU4Q?si=06d15ffbf06d42ff", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Why'd You Push That Button?", "https://open.spotify.com/show/4xEBxMawkpToKdcnSTI7Ze?si=2b9676a633854281", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Rabbit Hole", "https://open.spotify.com/show/6dqqC8nkBTC3ldRs7pP4qn?si=602a1615ff73455a", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Reply All", "https://open.spotify.com/show/7gozmLqbcbr6PScMjc0Zl4?si=5dcd3b58a62b4401", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "vibes em análise", "https://open.spotify.com/show/42CNqtkx9yd1cIg0E6E9rL?si=27e9ba85c9684f2d", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "A Voz e o Silêncio de Clarice Lispector - 451MHz", "https://open.spotify.com/episode/6aKTtHY183mxfnHI0Uav8k?si=53d9922ed9224fd1", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "A liberdade segundo Caio Fernando de Abreu - 451MHz", "https://open.spotify.com/episode/2jB8sUhkyOMbhrrcw0MbJF?si=d14675807dea4b82", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Paulo Freire: vida de professor - 451MHz", "https://open.spotify.com/episode/5TGEzTL0iHOhef2kuUcdFc?si=1c9b0b855b444a66", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Os mistérios de Lygia Fagundes Telles - 451MHz", "https://open.spotify.com/episode/581Cc0eKpILFVhANub2ilb?si=5c0e702af5804ac0", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Rádio Escafandro", "https://open.spotify.com/show/2Jonxe5ibaFY0iw7Czyioj?si=3944b67b14e14c8c", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Imposturas Filosóficas - Razão Inadequada", "https://open.spotify.com/show/1p4VWJZ7QgcdrflSxXkHCl?si=36f5fa0261af4d19", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Acid Horizon", "https://open.spotify.com/show/043axYbwmbDTd0fsCKOIrv?si=ec5c38abe3fc4c91", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Ciência Suja", "https://open.spotify.com/show/2bJvbVxZblK6E2mKkI5zbw?si=3859b2721f8945a1", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Pauta Pública", "https://open.spotify.com/show/0XVW3LGHaH6UQXXgDgMn25?si=43058ccc53314726", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Philosophize This!", "https://open.spotify.com/show/2Shpxw7dPoxRJCdfFXTWLE?si=be21b473973d439d", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Podcast Tecnopolítica", "https://open.spotify.com/show/55uTHZA0rs7ue5ajEJN9wp?si=0a4666c5e61c4977", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "AmarElo - O filme invisível", "https://open.spotify.com/show/3tDur8V0wslvtOBskYdfHX?si=37b8bb38b66e458d", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Machinic Unconscious Happy Hour", "https://open.spotify.com/episode/3puqFFqCxDEd9NatsRTCGc?si=ecc9055b02964933", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Mano a Mano", "https://open.spotify.com/show/0GnKiYeK11476CfoQEYlEd?si=7e6f39481bb34666", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Petit Journal", "https://open.spotify.com/show/75MOMlaBaE9Smo2Vp87CO2?si=3140727255da479c", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "IRL: Online Life is Real Life", "https://open.spotify.com/show/0vT7LJMeVDxyQ2ZamHKu08?si=f0dfdba4dd3d4325", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Internet History Podcast", "https://open.spotify.com/show/1CVtF3J2Sr5ZGRyWj3SG8D?si=fc6d34214f2f4526", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "Santíssima Trindade das Perucas", "https://open.spotify.com/show/3HswoChqEkJNTFl3bv6Y5p?si=16e4898ae3034335", "2025/7/27 00:00"));
    files.push(this.createLinkFile(podcastPath, "sound", "AmarElo Prisma", "https://open.spotify.com/show/0xfztI0qN9g4CuTpgcq5WS?si=045216540ab14ad2", "2025/7/27 00:00"));


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

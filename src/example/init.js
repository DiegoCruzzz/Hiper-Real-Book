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
    files.push(this.createDownloadFile(downloadPath, "gretchen_dançando", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_faca", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_fatos", "jpeg", "2025/7/27 00:00", "Image", "download")); // Corregida la extensión
    files.push(this.createDownloadFile(downloadPath, "gretchen_hj_em_dia", "webp", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_o_que", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "gretchen_parabéns", "gif", "2025/7/27 00:00", "Image", "download"));
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
    files.push(this.createDownloadFile(downloadPath, "talvez_venha_aí", "jpg", "2025/7/27 00:00", "Image", "download")); // Corregido el nombre
    files.push(this.createDownloadFile(downloadPath, "the_good_days_bitch_raising_her_glass", "jpg", "2025/7/27 00:00", "Image", "download")); // Corregido el nombre
    files.push(this.createDownloadFile(downloadPath, "tiffany_crying_car", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "topico_bobo", "jpg", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "tulla_chorando_celular", "webp", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "tulla_confetti", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "tulla_luana_batendo", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "tulla_saúde", "gif", "2025/7/27 00:00", "Image", "download"));
    files.push(this.createDownloadFile(downloadPath, "urach_dançando", "gif", "2025/7/27 00:00", "Image", "download"));
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

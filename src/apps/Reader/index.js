import { h, render, Component } from "preact";
import Window from "../../components/Window";
import ScrollableContainer from "../../components/ScrollableContainer/";
import HTML from "../../components/HTML";
import Share from "../../components/Toolbar/Share";
import "./reader.css";

//------------Book Content--------------
import {LeiaMe} from "../../content/leia-me";
//-----------16---------------
import {EsperancaMistica} from "../../content/16/esperanca-mistica";
import {DoresDeTernura} from "../../content/16/dores-de-ternura";
import {MorteDosDesejos} from "../../content/16/morte-dos-desejos";
import {InterminaveisImpactos} from "../../content/16/interminaveis-impactos";
import {Nomade} from "../../content/16/nomade";
import {SilheutasExistencia} from "../../content/16/silheutas-da-existencia";
import {SurpresaPremeditada} from "../../content/16/surpresa-premeditada";
import {DeliriosIsentos} from "../../content/16/delirios-isentos";
import {SobreVoce} from "../../content/16/sobre-voce";
import {TresDaManha} from "../../content/16/3-da-manha";
import {EncantamentoComplicado} from "../../content/16/encantamento-complicado";
import {Duplipensando} from "../../content/16/duplipensando";
import {Dezesseis} from "../../content/16/dezesseis";
//-----------17---------------
import {HastesFrias} from "../../content/17/hastes-frias";
import {Impreciso} from "../../content/17/impreciso";
import {UltimoParagrafo} from "../../content/17/ultimo-paragrafo";
import {Dezessete} from "../../content/17/dezessete";
//-----------18---------------
import {Sentidos} from "../../content/18/sentidos";
import {Inefavel} from "../../content/18/inefavel";
import {Trigo} from "../../content/18/trigo";
import {SenhoritaV} from "../../content/18/senhorita-v";
import {DoceVermelho} from "../../content/18/doce-vermelho";
import {Sonhos} from "../../content/18/sonhos";
import {VinteNove} from "../../content/18/vinte-e-nove";
import {Dezoito} from "../../content/18/dezoito";
//-----------19---------------
import {Iteracao} from "../../content/19/iteracao";
import {FechoOlhos} from "../../content/19/fecho-os-olhos";
import {Dezenove} from "../../content/19/dezenove";
//-----------20---------------
import {Iteracao2} from "../../content/20/iteracao-2";
import {VentosMarte} from "../../content/20/ventos-de-marte";
import {MeuSeuDela} from "../../content/20/meu-seu-dela";
import {EstaTudoBem} from "../../content/20/esta-tudo-bem";
import {Vinte} from "../../content/20/vinte";
//-----------21---------------
import {StandByMe} from "../../content/21/stand-by-me";
import {SaudacoesVerao} from "../../content/21/saudacoes-de-verao";
import {Nuclear} from "../../content/21/nuclear";
import {FrenesiCristalino} from "../../content/21/frenesi-cristalino";
import {Fobias} from "../../content/21/fobias";
import {AusenciaEternizada} from "../../content/21/ausencia-eternizada";
import {VinteUm} from "../../content/21/vinte-um";
//-----------22---------------
import {VoceDisseAlguma} from "../../content/22/voce-disse-alguma";
import {MateriaCinza} from "../../content/22/materia-cinza";
import {ObservacaoPanoramica} from "../../content/22/observacao-panoramica";
import {VinteDois} from "../../content/22/vinte-dois";


//Content Directory
const contentComponents = {
  "leia-me": LeiaMe,
  "esperanca-mistica": EsperancaMistica,
  'dores-de-ternura': DoresDeTernura,
  'morte-dos-desejos': MorteDosDesejos,
  'interminaveis-impactos': InterminaveisImpactos,
  'nomade': Nomade,
  'silheutas-da-existencia': SilheutasExistencia,
  'surpresa-premeditada': SurpresaPremeditada,
  'delirios-isentos': DeliriosIsentos,
  "sobre-voce": SobreVoce,
  "3-da-manha": TresDaManha,
  "encantamento-complicado": EncantamentoComplicado,
  "duplipensando": Duplipensando,
  "hastes-frias": HastesFrias,
  "impreciso": Impreciso,
  "ultimo-paragrafo": UltimoParagrafo,
  "sentidos": Sentidos,
  "inefavel": Inefavel,
  'trigo': Trigo,
  "senhorita-v":SenhoritaV,
  "doce-vermelho": DoceVermelho,
  "sonhos": Sonhos,
  "29.08.2017": VinteNove,
  "iteracao": Iteracao,
  "fecho-os-olhos": FechoOlhos,
  "iteracao-2": Iteracao2,
  "ventos-de-marte": VentosMarte,
  "meu-seu-dela": MeuSeuDela,
  "esta-tudo-bem": EstaTudoBem,
  "stand-by-me":StandByMe,
  "saudacoes-de-verao": SaudacoesVerao,
  "nuclear": Nuclear,
  "frenesi-cristalino": FrenesiCristalino,
  "fobias": Fobias,
  "ausencia-eternizada": AusenciaEternizada,
  "voce-disse-alguma": VoceDisseAlguma,
  "materia-cinza":MateriaCinza,
  "observacao-panoramica":ObservacaoPanoramica,
  "dezesseis":Dezesseis,
  "dezessete": Dezessete,
  "dezoito": Dezoito,
  "dezenove":Dezenove,
  "vinte": Vinte,
  "vinte-um": VinteUm,
  "vinte-dois": VinteDois,


};

function loadTwitter() {
  window.twttr = (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  })(document, "script", "twitter-wjs");
}

class Reader extends Component {
  componentDidMount() {
    this.initSocials();
  }
  componentDidUpdate() {
    this.initSocials();
  }

  initSocials() {
    const { content } = this.props;
    if (!this.el) return;
    if (typeof content === "string" && content.includes("twitter-tweet")) {
      loadTwitter();
      try {
        window.twttr.widgets.load(this.el);
      } catch (error) {
        console.error("could not load twitter", error);
      }
    }

    this.el?.querySelectorAll?.('a[href^="/"]')?.forEach((link) => {
      if (link.href.match(/\/[^/]/) && !link.dataset.transformed) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.props.wmProps.shell.openWindow("Loader", {
            permalink: link.href,
          });
        });
        link.dataset.transformed = true;
      }
    });
  }

  render({ content, wmProps }) {
    const ContentComponent =
      typeof content === "string" ? contentComponents[content] : null;

    return (
      <Window
        icon="wordpad"
        className="reader"
        width={1000}
        height={600}
        {...wmProps}
      >
        <Share />
        <ScrollableContainer ref={(el) => (this.scrollable = el)}>
          <article className="ui95__reader-wrap" ref={(el) => (this.el = el)}>
            {ContentComponent ? (
              <ContentComponent />
            ) : (
              <p>
                <b>⚠️ Conteúdo não encontrado:</b> <code>{content}</code>
              </p>
            )}
          </article>
        </ScrollableContainer>
      </Window>
    );
  }

}

Reader.prototype.getInitialState = function () {
  return {
    title: "Reader",
    icon: "wordpad",
  };
};

export default Reader;

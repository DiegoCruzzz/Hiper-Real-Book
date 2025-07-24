import { h, render, Component } from "preact";
import Window from "../../components/Window";
import ScrollableContainer from "../../components/ScrollableContainer/";
import HTML from "../../components/HTML";
import Share from "../../components/Toolbar/Share";
import "./reader.css";

//Book Content
import {LeiaMe} from "../../content/leia-me";
import {EsperancaMistica} from "../../content/16/esperanca-mistica";

//Content Directory
const contentComponents = {
  "leia-me": LeiaMe,
  "esperanca-mistica": EsperancaMistica,

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
        width={800}
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
                <b>⚠️ No se encontró el contenido:</b> <code>{content}</code>
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

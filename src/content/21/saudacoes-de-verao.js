import { h, Fragment } from "preact";

const images = [
    new URL("../../img/21/21HR__62.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__63.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__64.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__65.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__66.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__67.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__68.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__69.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__70.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__71.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__72.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__73.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__74.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__75.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__76.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__77.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__78.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__79.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__80.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__81.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__82.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__83.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__84.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__85.jpg", import.meta.url).href,

];

export function SaudacoesVerao() {
  return (
    <>
      {images.map((src, i) => (
        <div key={i} className="ui95__reader-page">
          <img
              src={src}
              alt={`Página ${i + 1}`}
              style={{
                width: "100%",
                display: "block",
                marginBottom: "1em",
              }}
          />
        </div>
        ))}
      </>
  );
}
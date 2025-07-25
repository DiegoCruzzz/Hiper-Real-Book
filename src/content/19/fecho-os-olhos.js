import { h, Fragment } from "preact";

const images = [
  new URL("../../img/19/19HR__42.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__43.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__44.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__45.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__46.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__47.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__48.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__49.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__50.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__51.jpg", import.meta.url).href,
  new URL("../../img/19/19HR__52.jpg", import.meta.url).href,
];

export function FechoOlhos() {
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
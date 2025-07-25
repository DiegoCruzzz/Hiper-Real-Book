import { h, Fragment } from "preact";

const images = [
    new URL("../../img/21/21HR__90.jpg", import.meta.url).href,
    new URL("../../img/21/21HR__91.jpg", import.meta.url).href,
];

export function Fobias() {
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
import { h, Fragment } from "preact";

const images = [
  new URL("../../img/16/16HR__23.jpg", import.meta.url).href,
  new URL("../../img/16/16HR__24.jpg", import.meta.url).href,
];

export function Duplipensando() {
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
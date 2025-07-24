import { h, Fragment } from "preact";

const images = [
  new URL("../img/leia-me/00HR__01.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__02.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__03.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__04.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__05.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__06.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__101.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__102.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__103.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__104.jpg", import.meta.url).href,
  new URL("../img/leia-me/00HR__105.jpg", import.meta.url).href,
];

export function LeiaMe(){
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
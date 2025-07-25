import { h, render, Component } from "preact";

function Img(props) {
  return (
    <img
      src={props.src}
      class={props.class}
      alt={props.alt}
      style="image-rendering: crisp-edges; image-rendering:pixelated;"
      width={props.width}
      height={props.height}
    />
  );
}

export default Img;

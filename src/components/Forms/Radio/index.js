import { h, render, Component } from "preact";
import { getClasses } from "../../../util";
import "./style.css";
import Bezel from "../../Bezel/";
import Text from "../../Text/";
let radioId = Math.round(Math.random() * 1e6);
class Radio extends Component {
  constructor(props) {
    super();
    this.state = {
      id: props.id || radioId++,
    };
  }
  id() {
    return ["radio", this.state.id].join("-");
  }
  render({ classNames, values, selected, onChange }) {
    return (
      <ul class={getClasses("radio", classNames)}>
        {Object.entries(values).map(([text, value], i) => (
          <li key={value}>
            <label for={`${this.id()}__${i}`}>
              <input
                name={this.id()}
                id={`${this.id()}__${i}`}
                type="radio"
                value={value}
                checked={selected === i}
                onChange={(e) => onChange(value, i)}
              />
              <Bezel
                classNames="in round"
                style={{
                  width: "9px",
                  height: "9px",
                }}
              >
                <div class="ui95-radio__dot" />
              </Bezel>
              <Text>{text}</Text>
            </label>
          </li>
        ))}
      </ul>
    );
  }
}

export default Radio;

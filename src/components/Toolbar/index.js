import { h, render, Component } from "preact";
import Divider from "../Divider/";
import ToolbarItemText from "./ToolbarItemText/";
import ToolbarItemStacked from "./ToolbarItemStacked/";
import Menu from "../Menu";
import "./style.css";

const variants = {
  text: ToolbarItemText,
  stacked: ToolbarItemStacked,
};

class Toolbar extends Component {
  state = {
    refs: {},
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }
  getItems(items = []) {
    const { onClick, variant } = this.props;
    return items.map((item, index) => {
      const isActive = item.items && this.state.open === item.text;
      if (item === "divider") return <Divider classNames="vertical" />;
      const ToolbarItem = variants[variant || "text"];

      return (
        <span
          style={{ position: "relative" }}
          ref={(element) => {
            this.state.refs[item.text] = element;
          }}
          onMouseEnter={() => {
            if (this.state.open) this.setState({ open: item.text });
          }}
        >
          <ToolbarItem
            text={item.text}
            icon={item.icon}
            className={isActive && "active"}
            disabled={item.disabled}
            onClick={() => {
              if (item.items) return this.setState({ open: item.text });
              return (item.onClick || onClick)(item);
            }}
          />
          {isActive && (
            <Menu
              items={item.items}
              attachTo={this.state.refs[item.text]}
              attachDirection="top"
              onClose={() => this.setState({ open: null })}
              style={{
                left: 0,
                top: "100%",
              }}
            />
          )}
        </span>
      );
    });
  }
  render({ classNames, onClick, onMouseDown, items, children }) {
    const className = "ui95-toolbar";
    return (
      <div
        className={[className, ...(classNames || "").split(" ")].join(
          ` ${className}--`
        )}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >
        <Divider classNames="draggable" />
        <div style="padding-right:var(--px)" />
        <Divider classNames="draggable" />
        <div style="padding-right:var(--px)" />
        {children}
        {this.getItems(items)}
      </div>
    );
  }
}

export default Toolbar;

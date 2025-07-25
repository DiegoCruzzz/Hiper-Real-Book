import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/Window/";
import Button from "../../components/Button/";
import Icon from "../../components/Icon/";
import Text from "../../components/Text/";

function Alert({ title, text, html, buttons, icon, width, wmProps = {} }) {
  const normalizedButtons = (buttons || [{ text: "Ok" }]).map(
    ({ text, onClick = wmProps.onClose }) => ({
      text,
      onClick,
    })
  );
  return (
    <Window
      title={title}
      width={width || 250}
      height="auto"
      isResizeable={false}
      classNames="alert"
      buttons={["close"]}
      {...wmProps}
    >
      <div class="ui95-window-alert">
        <div class="ui95-window-alert__content">
          {icon && (
            <div class="ui95-window-alert__icon">
              <Icon name={icon} size="32" />
            </div>
          )}
          <div class="ui95-window-alert__text">
            <Text style="margin-bottom:15px;" type="div" html={html}>
              {Array.isArray(text)
                ? text.map((line) => (
                    <div key={line}>
                      {line}
                      <br />
                      <br />
                    </div>
                  ))
                : text}
            </Text>
          </div>
        </div>
        <div class="ui95-window-alert__buttons">
          {normalizedButtons.map((props) => (
            <Button {...props}>{props.text}</Button>
          ))}
        </div>
      </div>
    </Window>
  );
}

export default Alert;

import { h, Component } from "preact";
import StartMenu from ".";

const items = [
  { text: "Windows Update", icon: "default" },
  "divider",
  { text: "Programs", icon: "default", items: [{ text: "Test" }] },
  { text: "Documents", icon: "default" },
  { text: "Settings", icon: "default" },
  { text: "Search", icon: "default" },
  { text: "Help", icon: "default" },
  { text: "Run", icon: "default" },
  "divider",
  { text: "Log Off", icon: "default" },
  { text: "Shut Down", icon: "default" },
];

export default {
  title: "Components/Taskbar/StartMenu",
};

export const Basic = () => {
  return (
    <div>
      <style>{`.ui95-button{position:absolute;left:0;bottom:0;}`}</style>
      <StartMenu items={items} />
    </div>
  );
};

Basic.story = {
  name: "basic",
};

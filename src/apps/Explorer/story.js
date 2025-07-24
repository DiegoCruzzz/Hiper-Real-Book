import { h } from "preact";
import Explorer from ".";
import WindowArea from "../../components/Desktop/WindowArea";
import Taskbar from "../../components/Taskbar";
import Button from "../../components/Button";
import { Filesystem, File } from "../../lib/filesystem";

const fs = new Filesystem();

// Estructura de carpetas
fs.files.push(
  new File("My Computer", {
    label: "My Computer",
    description: "Your local computer",
  }),
  new File("My Computer/c:", {
    label: "C:",
    description: "Local Disk",
    layout: "details",
    columns: ["size", "date"],
    defaultSort: ["date", false],
  }),
  new File("My Computer/c:/My Documents", {
    label: "My Documents",
    icon: "mydocuments",
    description: "Personal files and folders",
  }),
  new File("My Computer/c:/My Documents/Hyper Real", {
    label: "Hyper Real",
    icon: "mydocuments",
    description: "Art and hyperreality content",
  })
);

export default {
  title: "App/Explorer",
};

export const Root = () => (
  <Explorer wmProps={{ fs, setAppState: () => {} }} path="/" />
);

export const Documents = () => (
  <Explorer
    wmProps={{ fs, setAppState: () => {} }}
    path="My Computer/c:/My Documents"
  />
);

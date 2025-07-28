import { h, Component } from "preact";
import "./style.css";
import TabDialog from "../TabDialog";
import TabBackground from "./TabBackground";

const styles = {
  Center: { backgroundRepeat: "no-repeat", backgroundSize: "auto", backgroundPosition: "center" },
  Tile: { backgroundRepeat: "repeat", backgroundSize: "auto", backgroundPosition: "initial" },
  Stretch: { backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" },
};

const DEFAULT_WALLPAPER_PATH = new URL("./TabBackground/wallpapers/HR_cover_01.png", import.meta.url).href;
const DEFAULT_BACKGROUND_COLOR = "#008080";

export function updateVariables() {
  const root = document.documentElement;

  let props = {};
  try {
    const storedProps = localStorage.displayProperties;
    if (storedProps) {
      props = JSON.parse(storedProps);
    }
  } catch (e) {
    console.error("Error al parsear localStorage.displayProperties, usando fallback o valores por defecto:", e);
    try {
      if (window.displayProperties) {
        props = JSON.parse(window.displayProperties);
      }
    } catch (err) {
      console.error("Error al parsear window.displayProperties:", err);
    }
  }

  // Establecer valores por defecto si no están presentes en props
  root.style.setProperty('--background-color', props['--background-color'] || DEFAULT_BACKGROUND_COLOR);
  root.style.setProperty('--background-image', props['--background-image'] || `url('${DEFAULT_WALLPAPER_PATH}')`); // Usa la imagen por defecto
  root.style.setProperty('--background-repeat', props['--background-repeat'] || 'no-repeat');
  root.style.setProperty('--background-size', props['--background-size'] || 'cover');
  root.style.setProperty('--background-position', props['--background-position'] || 'center');
}


export default class DisplayProperties extends Component {
  constructor(props) {
    super(props);
    updateVariables(); // Asegura que las variables CSS estén seteadas

    let initialDisplayProps = {};
    try {
      const storedProps = localStorage.displayProperties;
      if (storedProps) {
        initialDisplayProps = JSON.parse(storedProps);
      }
    } catch (e) {
      console.warn("localStorage.displayProperties corrupto o no encontrado, inicializando con valores por defecto.");
      const cs = getComputedStyle(document.documentElement);
      initialDisplayProps = {
        '--background-image': cs.getPropertyValue("--background-image").trim(),
        '--background-repeat': cs.getPropertyValue("--background-repeat").trim(),
        '--background-size': cs.getPropertyValue("--background-size").trim(),
        '--background-color': cs.getPropertyValue("--background-color").trim(),
        '--background-position': cs.getPropertyValue("--background-position").trim(),
      };
    }

    const currentBackgroundImage = initialDisplayProps['--background-image'] || `url('${DEFAULT_WALLPAPER_PATH}')`;
    const currentBackgroundRepeat = initialDisplayProps['--background-repeat'] || 'no-repeat';
    const currentBackgroundSize = initialDisplayProps['--background-size'] || 'cover';
    const currentBackgroundColor = initialDisplayProps['--background-color'] || DEFAULT_BACKGROUND_COLOR;
    const currentBackgroundPosition = initialDisplayProps['--background-position'] || 'center';

    this.state = {
      background: {
        wallpaper: currentBackgroundImage.startsWith('url(') ? currentBackgroundImage.slice(4, -1).replace(/['"]/g, '') : currentBackgroundImage,
        style: "Stretch",
        backgroundColor: currentBackgroundColor,
      },
    };
  }

  setBackground() {
    const { background } = this.state;
    const styleConfig = styles["Stretch"];

    const finalBackgroundImage = background.wallpaper === 'none' || background.wallpaper === ''
      ? 'none'
      : `url('${background.wallpaper}')`;

    const propsToSave = {
      "--background-repeat": styleConfig.backgroundRepeat,
      "--background-size": styleConfig.backgroundSize,
      "--background-image": finalBackgroundImage,
      "--background-color": background.backgroundColor,
      "--background-position": styleConfig.backgroundPosition,
    };

    try {
      localStorage.displayProperties = JSON.stringify(propsToSave);
    } catch (e) {
      window.displayProperties = JSON.stringify(propsToSave);
      console.warn("localStorage no disponible, usando window.displayProperties como fallback.");
    }

    updateVariables();
  }

  render(props) {
    const { background } = this.state;
    const tabs = {
      Background: (
        <TabBackground
          value={background}
          onChange={(newBackground) => this.setState({ background: { ...newBackground, style: "Stretch" } })}
          styles={styles}
        />
      ),
    };
    return (
      <TabDialog
        title="Display properties"
        {...props}
        tabs={tabs}
        onApply={() => this.setBackground()}
      ></TabDialog>
    );
  }
}
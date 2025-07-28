import { h } from "preact";
import "./style.css";
import Text from "../../../components/Text";
import Icon from "../../../components/Icon";
import Button from "../../../components/Button";
import ColorPicker from "../../../components/Forms/ColorPicker";
import ScrollableContainer from "../../../components/ScrollableContainer";
import DisplayPreview from "../DisplayPreview";

const wallpapersData = [
  { label: "None", path: "none" },
  { label: "Cover 01", path: new URL("./wallpapers/HR_cover_01.png", import.meta.url).href },
  { label: "Cover 02", path: new URL("./wallpapers/HR_cover_02.png", import.meta.url).href },
  { label: "Cover 03", path: new URL("./wallpapers/HR_cover_03.png", import.meta.url).href },
];

export default function TabBackground({ styles, value, onChange }) {
  const defaultStyle = "Stretch";
  const showImageInPreview = value.wallpaper && value.wallpaper !== 'none';

  return (
    <div class="ui95-tab-background">
      <DisplayPreview
        image={showImageInPreview ? value.wallpaper : null}
        style={styles[defaultStyle]}
        backgroundColor={value.backgroundColor}
      />
      <div class="ui95-tab-background__tools">
        <div class="ui95-tab-background__tools-left">
          <label
            for="wallpaper-select"
            style={{ display: "block", marginBottom: 4 }}
          >
            <Text>Wallpaper:</Text>
          </label>
          <ScrollableContainer style={{ height: 125, width: '100%' }}>
              {wallpapersData.map((wallpaper) => {
                  const iconName = wallpaper.label === "None" ? "cancel" : "paint";
                  return (
                      <div
                          key={wallpaper.path}
                          class={`wallpaper-item ${value.wallpaper === wallpaper.path ? 'active' : ''}`}
                          onClick={() => onChange({...value, wallpaper: wallpaper.path, style: defaultStyle})}
                      >
                        <td className="ui95-file-row__label-icon">
                          <Icon size="16" name={iconName}/>
                        </td>
                        <td>
                          <a className="ui95-file-row__label">
                            <Text type="div">{wallpaper.label}</Text>
                          </a>
                        </td>
                      </div>
                  );
              })}
          </ScrollableContainer>
          <Button style={{width: 75, height: 22, marginTop: 8}}>Browse</Button>
        </div>

        <div class="ui95-tab-background__tools-right">
          <label
              for="background-color"
              style={{ display: "block", marginBottom: 4 }}
          >
            <Text>Desktop color:</Text>
          </label>
          <ColorPicker
            value={value.backgroundColor}
            onChange={(backgroundColor) =>
              onChange({ ...value, backgroundColor })
            }
          />
        </div>
      </div>
    </div>
  );
}
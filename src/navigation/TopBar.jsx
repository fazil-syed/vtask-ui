import { Switch, Space } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/settings/settingsSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.settings.mode);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left */}
      <div style={{ fontSize: 22, fontWeight: 600 }}>vtask</div>

      {/* Right */}
      <Space>
        <SunOutlined />
        <Switch
          checked={mode === "dark"}
          onChange={() => dispatch(toggleTheme())}
        />
        <MoonOutlined />
      </Space>
    </div>
  );
};

export default TopBar;

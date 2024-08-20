import { FireFilled } from "@ant-design/icons";
import "@/style/sideBar.css";

export default function Logo() {
  return (
    <div className="logo">
      <div
        className="logo-icon"
        style={{
          width: "40px",
          height: "40px",
          fontSize: "1.5rem",
          background: "rgba(28, 17, 41, 0.88)",
        }}
      >
        <FireFilled />
      </div>
    </div>
  );
}

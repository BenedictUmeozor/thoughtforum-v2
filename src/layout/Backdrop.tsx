import { Backdrop } from "@mui/material";
import styles from "./layout.module.scss";
import { FadeLoader } from "react-spinners";
import { useThemeContext } from "../hooks";

export default function Loading({ condition }: { condition: boolean }) {
  const { theme } = useThemeContext();
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={condition}
      className={styles.backdrop}
    >
      <FadeLoader color={theme === "light" ? "#18298d" : "#1d66ee"} />
    </Backdrop>
  );
}

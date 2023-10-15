import { Backdrop, CircularProgress } from "@mui/material";
import styles from "./layout.module.scss";

export default function Loading({ condition }: { condition: boolean }) {
  return (
    <div className={styles.backdrop}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={condition}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

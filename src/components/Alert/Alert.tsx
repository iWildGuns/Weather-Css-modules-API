import styles from "./Alert.module.css";
import type { ReactNode } from "react";

export default function Alert({ children }: { children: ReactNode }) {
  return <div className={styles.alert}>{children}</div>;
}

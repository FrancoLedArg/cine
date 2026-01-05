// Styles
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}

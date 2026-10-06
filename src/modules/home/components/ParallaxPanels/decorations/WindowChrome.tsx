import { styles } from "../styles/index.styles";

/** The "traffic light" title bar shared by every floating window, with an optional mono title. */
export function WindowChrome({ title }: { title?: string }) {
  return (
    <div className={styles.panelChrome}>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      {title ? <span className={styles.panelTitle}>{title}</span> : null}
    </div>
  );
}

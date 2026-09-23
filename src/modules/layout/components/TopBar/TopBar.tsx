import { Logo } from "@/shared/components/Logo";

import { LanguageSwitcher } from "../LanguageSwitcher";
import { Sidebar } from "../Sidebar";
import { styles } from "./styles/index.styles";

export function TopBar() {
  return (
    <header className={styles.root}>
      <div className={styles.side}>
        <Sidebar />
      </div>
      <Logo withWordmark={false} className={styles.logo} />
      <div className={styles.side}>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

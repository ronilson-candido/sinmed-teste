import { ReactNode } from "react";
import styles from "./styles.module.scss";

export default function FiliadoContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className={styles.mainContainer}>
      <main className={styles.mainContent}>{children}</main>
    </section>
  );
}

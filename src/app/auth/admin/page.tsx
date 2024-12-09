import ContentWrapper from "@/components/UI/AreaDoFiliado/content-wrapper";
import styles from "./styles.module.scss";
import FiliadoContainer from "@/components/UI/AreaDoFiliado/filiado-container";
import Image from "next/image";
import LoggedContainer from "@/components/UI/AreaDoFiliado/logged-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área do Admin",
  description: "Área do Administrador do Sinmed",
};

export default function Admin() {
  return (
    <LoggedContainer>
      <div className={styles.profileOptions}>
        <section className={styles.adminHeader}>
          <Image
            src="/icons/admin-icon.svg"
            alt="Ícone de administrado"
            width={34}
            height={34}
          />
          <h3>Administrador</h3>
        </section>
        <button className={styles.exitBtn}>
          <Image
            src="/icons/exit-icon.svg"
            alt="Ícone de administrador"
            width={24}
            height={24}
          />
          Sair
        </button>

        <div className={styles.separator}></div>
        <p>Gerenciamento</p>
        <button>
          <Image
            src="/icons/cadastros-icon.svg"
            alt="Ícone de logout"
            width={24}
            height={24}
          />
          Cadastros
        </button>
        <button>
          <Image
            src="/icons/cifrao-icon.svg"
            alt="Ícone de cadastro"
            width={24}
            height={24}
          />
          Financeiro
        </button>
        <div className={styles.footerSeparator}></div>
        <div>
          <Image
            src="/images/sinmed-blue-logo.png"
            alt="Ícone azul do Sinmed"
            width={196}
            height={53}
          />
        </div>
      </div>
      <ContentWrapper></ContentWrapper>
    </LoggedContainer>
  );
}

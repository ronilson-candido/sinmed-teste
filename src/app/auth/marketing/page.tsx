import LoggedContainer from "@/components/UI/AreaDoFiliado/logged-container";
import styles from "./styles.module.scss";
import { Metadata } from "next";
import Image from "next/image";
import ContentWrapper from "@/components/UI/AreaDoFiliado/content-wrapper";

export const metadata: Metadata = {
  title: "Área do Marketing",
  description: "Área do Marketing do Sinmed",
};

export default function Marketing() {
  return (
    <LoggedContainer>
      <div className={styles.profileOptions}>
        <section className={styles.marketingHeader}>
          <Image
            src="/icons/marketing-icon-oficial.png"
            alt="Ícone de administrado"
            width={34}
            height={34}
          />
          <h3>Marketing</h3>
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
            alt="Ícone de benefícios"
            width={24}
            height={24}
          />
          Benefícios
        </button>
        <div className={styles.separator}></div>
        <p>Comunicação</p>
        <button>
          <Image
            src="/icons/noticias-icon.svg"
            alt="Ícone de Notícias"
            width={24}
            height={24}
          />
          Notícias
        </button>
        <button>
          <Image
            src="/icons/midias-icon.svg"
            alt="Ícone de Mídias"
            width={24}
            height={24}
          />
          Mídias
        </button>
        <button>
          <Image
            src="/icons/ouvidoria-icon.svg"
            alt="Ícone da Ouvidoria"
            width={24}
            height={24}
          />
          Ouvidoria
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

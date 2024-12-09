import FiliadoContainer from "@/components/UI/AreaDoFiliado/filiado-container";
import LoggedContainer from "@/components/UI/AreaDoFiliado/logged-container";
import styles from "./styles.module.scss";
import Image from "next/image";
import ContentWrapper from "@/components/UI/AreaDoFiliado/content-wrapper";

export default function Filiado() {
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
          <div className={styles.profileInfo}>
            <h3>Milton de Moraes</h3>
            <h4>CRM 0000000-0/BR</h4>
          </div>
        </section>
        <button className={styles.exitBtn}>
          <Image
            src="/icons/user-icon.svg"
            alt="Ícone de administrador"
            width={26}
            height={26}
          />
          Ver Perfil
        </button>
        <button className={styles.exitBtn}>
          <Image
            src="/icons/exit-icon.svg"
            alt="Ícone de administrador"
            width={26}
            height={26}
          />
          Sair
        </button>

        <div className={styles.separator}></div>
        <p>Gerenciamento</p>
        <button>
          <Image
            src="/icons/eventos-icon.svg"
            alt="Ícone de logout"
            width={26}
            height={26}
          />
          Eventos
        </button>
        <button>
          <Image
            src="/icons/agendamento-icon.svg"
            alt="Ícone de cadastro"
            width={26}
            height={26}
          />
          Agendamento
        </button>
        <p>Financeiro</p>
        <button>
          <Image
            src="/icons/financeiro-icon.svg"
            alt="Ícone de cadastro"
            width={26}
            height={26}
          />
          Filiação
        </button>
        <p>Mais</p>
        <button>
          <Image
            src="/icons/receba.svg"
            alt="Ícone de cadastro"
            width={26}
            height={26}
          />
          Benefícios
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

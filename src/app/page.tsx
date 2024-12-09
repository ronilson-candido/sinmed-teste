"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import Header from "@/components/Header";
import HomeButton from "@/components/Buttons/HomeButton";
import DropButton from "@/components/Buttons/DropButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const dropButtonsData = [
  {
    src: "/icons/ballot-icon.svg",
    alt: "Ballot Icon",
    width: 31,
    height: 31,
    title: "Assessoria contábil",
    description:
      "O associado tem direito a assessoria e consultoria contábil, com preços especiais para os associados.",
  },
  {
    src: "/icons/star-icon.svg",
    alt: "Star Icon",
    width: 31,
    height: 31,
    title: "Clube de Benefícios",
    description:
      "O médico associado pode obter descontos exclusivos com empresas parceiras.",
  },
  {
    src: "/icons/sinmed-icon.svg",
    alt: "Sinmed Icon",
    width: 31,
    height: 31,
    title: "Unimed",
    description:
      "Garantia de um plano de saúde da Unimed Maceió para os associados.",
  },
  {
    src: "/icons/events-icon.svg",
    alt: "Events Icon",
    width: 31,
    height: 31,
    title: "Eventos",
    description:
      "Membros do sindicato possuem acesso a eventos e workshops exclusivos da comunidade médica.",
  },
];

export default function Home() {
  const startingContentRef = useRef(null);
  const startingImgRef = useRef(null);
  const legalContentRef = useRef(null);
  const legalContainerTrigger = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const contentCurrentRef = startingContentRef.current;
    const imgCurrentRef = startingImgRef.current;
    const legalCurrentRef = legalContentRef.current;

    gsap.to(contentCurrentRef, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      delay: 0.35,
    });

    gsap.to(imgCurrentRef, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      delay: 0.9,
    });

    gsap.to(legalCurrentRef, {
      opacity: 1,
      x: 0,
      duration: 0.7,

      scrollTrigger: {
        trigger: legalContainerTrigger.current,
        start: "top 400px",
        end: "bottom 500px",
      },
    });

    return () => {
      gsap.killTweensOf([contentCurrentRef, imgCurrentRef, legalCurrentRef]);
    };
  }, []);

  return (
    <>
      <div className={styles.startingSection}>
        <Header />
        <section className={styles.startingInfo}>
          <div className={styles.startingContent} ref={startingContentRef}>
          <Image
              src="/images/sinmedbeneficios.png"
              alt="Beneficios Sinmed"
              width={700}
              height={200}
            />
            <p>
            Cuidando de quem cuida:{" "}
              <span>
                  conheça os benefícios exclusivos para nossos médicos filiados
              </span>
            </p>
            <HomeButton />
          </div>
          <div className={styles.startingImg} ref={startingImgRef}>
          <Image
    src="/images/medicos.png"
    alt="Foto de uma médica"
    width={600}
    height={600}
    layout="intrinsic" 
  />
          </div>
        </section>
      </div>
      <section className={styles.bonusContainer}>
        <div>
          <div className={styles.cardWrapper}>
            <div className={`${styles.bonusCard} ${styles.leftCard}`}>
              <div>
                <b>Notícias</b>
              </div>
            </div>
            <div className={styles.bonusCard}>
              <div>
                <b>Eventos</b>
              </div>
            </div>
            <div className={styles.bonusCard} id="rightCard">
              <div>
                <b>Multimídia</b>
              </div>
            </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.bonusContent}>
            <div className={styles.infoContent}>
              <h2>Fique por dentro de tudo</h2>
              <p>
                Filiados ficam por dentro de todas as notícias do mundo médico
                em Alagoas. Estar conosco significa estar informado a toda hora.
              </p>
            </div>
            <div className={styles.infoContent}>
              <h2>Eventos a todo momento</h2>
              <p>
                O SINMED-AL promove múltiplos eventos no decorrer do ano.
                Filiados sempre serão notificados sobre cada um deles e terão
                participação garantida.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.legalContainer} ref={legalContainerTrigger}>
        <div>
          <Image
            src="/images/legal-banner.png"
            alt="Foto de fundo Jurídico"
            width={1040}
            height={432}
          />
          <div className={styles.legalContent} ref={legalContentRef}>
            <h2>Suporte Jurídico</h2>
            <p>
              No SINMED-AL, você terá uma <br />
              excelente equipe jurídica <br />à disposição.
            </p>
            <a href="">
              <u>Clique aqui para saber mais</u>
            </a>
          </div>
        </div>
      </section>
      <section className={styles.advantagesContainer}>
        <h2>Vantagens de ser filiado</h2>
        <div className={styles.advantagesContent}>
          {dropButtonsData.map((buttonProps, index) => (
            <DropButton key={index} {...buttonProps} />
          ))}
        </div>
      </section>
      <section className={styles.newsLetterContainer}>
        <div>
          <p>Inscreva-se para receber novidades semanais</p>
          <input type="email" placeholder="Seu melhor email" />
          <button>Inscrever-se</button>
        </div>
      </section>
    </>
  );
}

"use client";

import Header from "@/components/Header";
import Image from 'next/image';
import styles from './Juridico.module.scss'; 

export default function Juridico() {
  return (
    <div className={styles.juridicoContainer}>
      <Header />
      <div className={styles.rectangle}>
        <p>Somos seu apoio jurídico em todas as etapas da sua carreira médica.</p>
        <h3>Especializações</h3>
        <div className={styles.rectangle2}>
          <button className={styles.button}>
            Direito Médico
          </button>
          <button className={styles.button2}>
            Direito Público e Civil
          </button>
          <button className={styles.button3}>
            Direito Previdenciário
          </button>
        </div>

        <div className={styles.container}>
          <div className={styles.square}>
            <h1 className={styles.title}>Conheça nossa equipe</h1>
            <div className={styles.teamGrid}>
              <div className={styles.teamMember1}>
                <Image 
                  src="/images/thaisa.png" 
                  alt="Thaisa Gameleira"
                  width={207} 
                  height={273} 
                  className={styles.teamImage} 
                />
              </div>
              <div className={styles.teamMember2}>
                <Image 
                  src="/images/ednaldo.png" 
                  alt="Ednaldo Maiorano"
                  width={207} 
                  height={273} 
                  className={styles.teamImage} 
                />
              </div>
              <div className={styles.teamMember3}>
                <Image 
                  src="/images/renata.png" 
                  alt="Renata Almeida"
                  width={207} 
                  height={273} 
                  className={styles.teamImage} 
                />
              </div>
              <div className={styles.teamMember4}>
                <Image 
                  src="/images/felipe.png" 
                  alt="Felipe Bruno Calheiros"
                  width={207} 
                  height={273} 
                  className={styles.teamImage} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rectangle3}>
          <div className={styles.attendanceSection}>
            <h4 className={styles.attendanceTitle}>Atendimento</h4>
            <p className={styles.mainText}>
              Para ter acesso à equipe jurídica, você pode ir até a <a href="https://www.google.com/maps/place/SINMED+-+Sindicato+dos+M%C3%A9dicos+de+Alagoas/@-9.6824205,-35.7468351,17z/data=!3m1!4b1!4m6!3m5!1s0x701459fd8ef404d:0xd582be407a9cc4fc!8m2!3d-9.6824205!4d-35.7446464!16s%2Fg%2F1tdn7w4r" target="_blank" rel="noopener noreferrer" className={styles.highlightLink}>sede do sindicato</a>.
            </p>
            <p className={styles.subText}>
              Além disso, os advogados também fazem serviços externos, um exemplo é o<br />
              acompanhamento das audiências nos Tribunais e no Conselho de Medicina.
            </p>
            <p className={styles.importantText}>
              Por conta disso, é recomendável <a href="#" className={styles.highlightLink2}>agendar</a> o <br />
              atendimento com os Doutores.
            </p>
            <p className={styles.footerText}>
              Estes que trabalham tanto em ações individuais, analisando a particularidade de<br />
              cada caso, quanto em demandas coletivas, aquelas que envolvem interesses de<br />
              grupos de médicos da rede pública e privada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

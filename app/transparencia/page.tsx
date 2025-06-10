"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import SocialIcons from "@/components/SocialIcons/SocialIcons";
import Footer from "@/components/layout/Footer/footer";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

import { charAnimation } from "@/utils/animations/text-anim";

import "./transparencia-page.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Link from "next/link";
import { footerAnimation } from "@/utils/animations/footer-anim";

const TransparenciaPage: React.FC = () => {
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      footerAnimation();
    }, 100);

    return () => clearTimeout(timer);
  });

  return (
    <PageWrapper>
      <div className="transparencia-page">
        <div className="transparencia-page__container">
          <div className="transparencia-page__header">
            <h1 className="transparencia-page__title char-animation">
              TRANSPARENCIA
            </h1>
          </div>

          <div className="transparencia-page__content">
            <section className="transparencia-page__section">
              <p>
                La transparencia empresarial se enmarca dentro de la estrategia
                de responsabilidad social empresarial (RSE) de nuestra empresa,
                es un acto voluntario con el que queremos contribuir a una
                sociedad informada, generando confianza en el entorno dando
                cuenta de nuestra relación con la administración pública.
              </p>
              <p>
                La empresa DOS POR DOS GRUPO IMAGEN, S.L. se constituyó en 1999
                con el objetivo de prestar un servicio integral a firmas de lujo
                de la cosmética y perfumería en Canarias.
              </p>
              <p>
                Durante estos años, la actividad de Dos por Dos se ha
                diversificado hasta hoy, prestando servicios como son:
                Producción Digital, Interiorismo comercial, Interiorismo
                residencia, etc.
              </p>
              <p>
                Puedes consultar el desarrollo de su historia en el siguiente
                enlace y sus servicios en:
                <br />
                <Link
                  href="https://dospordosgrupoimagen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transparencia-page__link"
                >
                  https://dospordosgrupoimagen.com
                </Link>
              </p>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">Misión</h3>
              <p>
                Somos un grupo de más de 45 profesionales, formado por
                arquitectos, interioristas, diseñadores y expertos en producción
                e instalación, te acompañamos durante todo el proceso, donde
                generamos soluciones creativas e innovadoras para cumplir con
                los requerimientos de cada cliente.
              </p>
              <p>
                La calidad en nuestro trabajo y la colaboración con nuestros
                clientes, proveedores y empleados, son dos compromisos
                fundamentales en nuestra Compañía, buscando siempre nuevos retos
                que ayuden a crecer el negocio.
              </p>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">Visión</h3>
              <p>
                Consolidarnos como una firma de servicios integrales de
                interiorismo, abarcando cada día sectores más diversos,
                ofreciendo todo el ciclo; desde la detección de las necesidades
                del cliente, pasando por el diseño y realización del proyecto,
                ejecución de obra y entrega de llaves.
              </p>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">Valores</h3>
              <p>
                Fomentamos el trabajo en equipo priorizando las relaciones
                interpersonales en nuestra Compañía, siendo éstas nuestras bases
                principales del éxito.
              </p>
              <ul className="transparencia-page__list">
                <li>Autenticidad e Innovación</li>
                <li>Resiliencia y compromiso</li>
                <li>Excelencia y Calidad</li>
              </ul>
              <p>
                Al ser una sociedad, está regulada por los Estatutos (normas por
                las que se regula el funcionamiento de la empresa). Puedes
                consultarlos en el siguiente enlace:
              </p>
            </section>

            <div className="transparencia-page__button-container">
              <PrimaryButton
                href="/assets/documents/Estatutos.pdf"
                target="_blank"
                size="large"
              >
                ESTATUTOS
              </PrimaryButton>
            </div>

            <section className="transparencia-page__section">
              <p className="">
                También puedes consultar la legislación que nos afecta:
              </p>
              <ul className="transparencia-page__list">
                <li>
                  Ley 20/1991, de 7 de junio, de modificación de los aspectos
                  fiscales del Régimen Económico Fiscal de Canarias.
                </li>
                <li>
                  RDL 1/2010, de 2 de julio del texto refundido de la Ley de
                  Sociedades de Capital.
                </li>
                <li>
                  Real Decreto-Ley 2/2003, de 25 de abril, de medidas de reforma
                  económica.
                </li>
                <li>
                  Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
                  Personales y garantía de los derechos digitales.
                </li>
                <li>
                  Ley 12/2014, de 26 de diciembre, de transparencia y de acceso
                  a la información pública.
                </li>
                <li>
                  Real Decreto 634/2015, de 10 de julio, por el que se aprueba
                  el Reglamento del Impuesto sobre Sociedades.
                </li>
                <li>
                  Real Decreto Legislativo 1175/1990, de 28 de septiembre, por
                  el que se aprueban las tarifas y la instrucción del Impuesto
                  sobre Actividades Económicas.
                </li>
              </ul>
              <p>
                Uno de los valores principales de DOS POR DOS GRUPO IMAGEN, S.L.
                es la transparencia, es por ello que publicamos información
                tanto de nuestra gestión como de los resultados económicos
                obtenidos.
              </p>
              <p>
                Además, dando cumplimiento a la Ley estatal 19/2013, de 9 de
                diciembre, de transparencia, acceso a la información pública y
                buen gobierno y a la Ley canaria 12/2014, de 26 de diciembre, de
                transparencia y de acceso a la información pública, la cual nos
                afecta según su artículo 3, por ser una entidad privada que
                percibe ayudas o subvenciones, en una cuantía superior a 60.000
                euros, con cargo a los Presupuestos de la Comunidad Autónoma de
                Canarias, para la financiación de sus actividades y
                funcionamiento ordinario.
              </p>
              <p>
                Este compromiso con la transparencia está definido en nuestra
                Política de Transparencia, actualizada y ratificada en reunión
                de la Junta Directiva celebrada el dos de junio de dos mil
                veinte.
              </p>
              <p>
                Desarrollándose a través de nuestro Proceso de Transparencia, y
                siendo anualmente analizada en nuestro informe de cumplimiento
                de la ley Canaria de Transparencia.
              </p>
              <p>
                El órgano responsable, dentro de la entidad, para velar por la
                transparencia de la organización y encargado de dar cumplimiento
                a las obligaciones de información establecidas en la ley, es la
                Dirección-Gerencia.
              </p>
              <p>
                Las personas asociadas a la entidad pueden solicitar información
                de forma presencial en la sede (Urb. Juan Ascanio, S/N, Telde).
              </p>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                Ley Canaria de Transparencia
              </h3>
              <p>
                DOS POR DOS GRUPO IMAGEN, S.L. mantendrá este portal actualizado
                para que nuestros clientes, proveedores y la ciudadanía en
                general pueda consultar nuestra actividad, según la Ley de
                Transparencia 19/2013 y la Ley 12/2014, de 26 de diciembre, de
                Transparencia y de Acceso a la Información Pública del Gobierno
                de Canarias. Más información: Comisionado de Transparencia del
                Gobierno de Canarias.
              </p>

              <div className="transparencia-page__logo-container">
                <Link
                  href="https://transparenciacanarias.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transparencia-page__logo-link"
                >
                  <img
                    src="/assets/img/transparencia-page/logo-transparencia-canarias.png"
                    alt="Comisionado de Transparencia"
                    className="transparencia-page__logo"
                  />
                </Link>
              </div>

              <p>
                <Link
                  href="https://transparenciacanarias.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transparencia-page__link"
                >
                  https://transparenciacanarias.org/
                </Link>
              </p>
              <p>
                Nota sobre accesibilidad: la información publicada en este
                portal de transparencia se ha realizado conforme al principio de
                accesibilidad universal y diseño para todos establecido en las
                pautas WCAG 2.1. publicadas por el World Wide Web Consortium
                (W3C). Puede leer nuestra declaración de accesibilidad web para
                más información.
              </p>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                Órgano de administración
              </h3>
              <p>
                La Sociedad cuenta con un Administrador Único encargada de
                realizar los trámites económicos, jurídicos, contables,
                administrativos y funcionales de la compañía, y se encarga de la
                gestión y representación de la misma, de acuerdo con las
                disposiciones y directivas de sus Estatutos aprobados.
              </p>

              <div className="transparencia-page__admin-image">
                <img
                  src="/assets/img/transparencia-page/organo-de-administracion.jpg"
                  alt="Órgano de Administración"
                />
              </div>

              <p>
                Julio Rubio Del Real, ha realizado gran parte de su trayectora
                profesional como CEO Dos por Dos Grupo Imagen, S.L. Fue su
                fundador, visionando las oportunidades que podría ofercerle
                Canarias, que junto a su pasión, ha posiconado a Dos por Dos
                Grupo Imagen S.L. como líder en su sector.
              </p>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                Información organizativa
              </h3>
              <p>
                La EMPRESA DOS POR DOS GRUPO IMAGEN, S.L. mantiene una política
                de Recursos Humanos que fomenta valores irrenunciables y
                esenciales para las personas:
              </p>
              <ul className="transparencia-page__list">
                <li>
                  <strong>Estabilidad:</strong> empleo estable y de calidad.
                </li>
                <li>
                  <strong>
                    Igualdad de oportunidades entre mujeres y hombres y
                    diversidad:
                  </strong>{" "}
                  En todas las áreas se garantiza la igualdad de oportunidades y
                  no discriminación por razón de sexo, edad, religión, raza o
                  situación personal.
                </li>
                <li>
                  <strong>Igualdad retributiva:</strong> misma remuneración en
                  puestos de igual valor.
                </li>
                <li>
                  <strong>Desarrollo profesional:</strong> plan de formación
                  anual impartido a todas las personas trabajadoras. Formación
                  inicial de acogida previa a la incorporación al puesto.
                </li>
                <li>
                  <strong>Transparencia y participación:</strong> DOS POR DOS
                  GRUPO IMAGEN, S.L comparte internamente sus objetivos y los
                  resultados obtenidos e cada ejercicio, así como información
                  importante de la entidad y fomenta la creación de comités
                  permanentes y equipos de mejora.
                </li>
                <li>
                  <strong>Satisfacción y clima laboral:</strong> se mide
                  periódicamente y se adoptan medidas oportunas. De manera anual
                  se realiza la encuesta de satisfacción y clima a todas las
                  personas trabajadoras, segmentada por servicios y centros de
                  trabajo.
                </li>
                <li>
                  <strong>Evaluación del desempeño:</strong> Dirección por
                  objetivos orientado a líderes y responsables de procesos.
                </li>
              </ul>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                Información estratégica y memorias de actuación
              </h3>
              <p>
                DOS POR DOS GRUPO IMAGEN, S.L planifica su estrategia con
                objetivos a conseguir en un periodo de 5 años, que
                posteriormente divide en planes operativos anuales.
              </p>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                Información económica financiera
              </h3>

              <div className="transparencia-page__button-group">
                <PrimaryButton
                  href="/assets/documents/CCAA-2020.pdf"
                  target="_blank"
                  size="large"
                >
                  CCAA 2020
                </PrimaryButton>
                <PrimaryButton
                  href="/assets/documents/CCAA-2021.pdf"
                  target="_blank"
                  size="large"
                >
                  CCAA 2021
                </PrimaryButton>
                <PrimaryButton
                  href="/assets/documents/CCAA-2022-Dos-por-Dos-1.pdf"
                  target="_blank"
                  size="large"
                >
                  CCAA 2022
                </PrimaryButton>
              </div>

              <p>
                Cabe destacar que la empresa DOS POR DOS GRUPO IMAGEN, S.L. no
                ha estado obligado a auditar sus cuentas en los ejercicios 2022,
                2021 ni 2020 al no cumplir con los requisitos dispuestos en el
                Real Decreto Legislativo 1/2010, de 2 de julio, por el que se
                aprueba el texto refundido de la Ley de Sociedades de Capital en
                su artículo 257 en el que se menciona que las empresas que deben
                auditar son las que cumplen durante dos o más ejercicios dos de
                los tres requisitos que se indican a continuación:
              </p>
              <ul className="transparencia-page__list">
                <li>
                  Cuando el importe neto de la cifra de negocio supere los
                  5.700.000€.
                </li>
                <li>Cuando el total de sus activos supere los 2.850.000€.</li>
                <li>Cuando el número medio de trabajadores supere los 50.</li>
              </ul>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                Contratos, convenios, encomiendas de gestión y subvenciones
              </h3>
              <p>
                La empresa DOS POR DOS GRUPO IMAGEN, S.L presenta anualmente los
                contratos, convenios, encomiendas de gestión y subvenciones,
                realizados con las administraciones públicas y entidades
                privadas. A continuación difundimos la información sobre los
                convenios y subvenciones públicas suscritos:
              </p>

              <div className="transparencia-page__table-wrapper">
                <table className="transparencia-page__table">
                  <thead>
                    <tr>
                      <th>INSTITUCIÓN</th>
                      <th>OBJETO</th>
                      <th>PERIODO</th>
                      <th>IMPORTE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Gobierno de Canarias</td>
                      <td>
                        Línea Covid de ayudas directas a personas autónomas y
                        empresas, prevista en el Título I del Real Decreto-ley
                        5/2021, de 12 de marzo, de medidas extraordinarias de
                        apoyo a la solvencia empresarial en respuesta a la
                        pandemia de la COVID-19, financiada por el Gobierno de
                        España.
                      </td>
                      <td>2021</td>
                      <td>798.450,85 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                Otros (Excelencia, sostenibilidad, calidad, medioambiente...)
              </h3>
              <p>
                La empresa DOS POR DOS GRUPO IMAGEN, S.L asume para una gestión
                sobresaliente, el compromiso a nivel social, ambiental y
                económico; todo ello en coherencia con nuestra cultura
                organizativa y alineado con la estrategia de la Sociedad.
              </p>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                A nivel social
              </h3>
              <ul className="transparencia-page__list">
                <li>Creando valor sostenible a nuestros grupos de interés.</li>
                <li>
                  Promoviendo un comportamiento responsable que permita la
                  Mejora de la sociedad por parte de los grupos de interés de la
                  empresa, fomentando una cultura de participación,
                  colaboración, voluntariado y solidaridad para conseguir la
                  transformación social.
                </li>
                <li>
                  Defendiendo y promoviendo el cumplimiento de los derechos
                  humanos y laborales, dando cumplimiento a la normativa y
                  buenas prácticas en materia de condiciones de empleo, salud y
                  seguridad, igualdad de oportunidades, diversidad, desarrollo
                  profesional, conciliación en el puesto de trabajo y protección
                  de datos de todas las personas interesadas.
                </li>
                <li>
                  Creando alianzas con Partners (Proveedores, Entidades Públicas
                  y privadas, Centros de Formación…) que proporcionen beneficios
                  mutuos y añadan valor a la actividad desarrollada por la
                  organización.
                </li>
              </ul>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                A nivel ambiental
              </h3>
              <ul className="transparencia-page__list">
                <li>
                  Promoviendo acciones que reduzcan el impacto medioambiental de
                  nuestra actividad, a través de objetivos de reducción de
                  consumos, y fomentando la reutilización y reciclaje de los
                  productos que puedan tener una nueva vida útil.
                </li>
              </ul>
            </section>

            <section className="transparencia-page__section">
              <h3 className="transparencia-page__section-title ">
                A nivel económica
              </h3>
              <ul className="transparencia-page__list">
                <li>
                  Buscando el equilibrio presupuestario y la sostenibilidad que
                  garantice la continuidad de la prestación de los apoyos y
                  servicios, generando confianza en los grupos de interés, a
                  través de una gestión eficiente y transparente.
                </li>
              </ul>
            </section>
          </div>

          <div className="transparencia-page__mobile-social-section">
            <div className="transparencia-page__mobile-social-header">
              <h3 className="transparencia-page__mobile-social-title">
                Síguenos
              </h3>
            </div>
            <SocialIcons orientation="horizontal" />
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default TransparenciaPage;

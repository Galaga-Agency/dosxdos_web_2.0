"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import SocialIcons from "@/components/SocialIcons/SocialIcons";
import Footer from "@/components/layout/Footer/footer";

import { charAnimation, fadeAnimation } from "@/utils/animations/text-anim";

import "./privacidad-page.scss";

const PrivacidadPage: React.FC = () => {
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
      charAnimation();
    }, 300);

    return () => clearTimeout(timer);
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="privacidad-page">
          <div className="privacidad-page__container">
            <div className="privacidad-page__header">
              <h1 className="privacidad-page__title char-animation">
                POLÍTICA DE PRIVACIDAD
              </h1>
            </div>

            <div className="privacidad-page__content">
              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">Introducción</h3>
                <p>
                  La presente Política de Privacidad ha sido desarrollada
                  teniendo en cuenta lo dispuesto por la Ley Orgánica de
                  Protección de Datos de carácter personal en vigor, así como
                  por el Reglamento 2016/679 del Parlamento Europeo y del
                  consejo del 27 de abril de 2016 relativo a la protección de
                  las personas físicas en lo que respecta al tratamiento de
                  datos personales y a la circulación de estos datos, en
                  adelante el RGPD.
                </p>
                <p>
                  Esta Política de Privacidad tiene por objeto poner en
                  conocimiento de los titulares de los datos personales,
                  respecto de los cuales se está recabando información, los
                  aspectos específicos relativos al tratamiento sus datos, entre
                  otras cosas, las finalidades de los tratamientos, los datos de
                  contacto para ejercer los derechos que le asisten, los plazos
                  de conservación de la información y las medidas de seguridad
                  entre otras cosas.
                </p>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">
                  Responsable del tratamiento
                </h3>
                <p>
                  En términos de protección de datos DOS POR DOS GRUPO IMAGEN,
                  S.L., debe ser considerado Responsable del Tratamiento, en
                  relación a los ficheros/tratamientos identificados en la
                  presente política, concretamente en el apartado Tratamientos
                  de datos.
                </p>
                <p>
                  A continuación, se indican los datos identificativos del
                  titular del presente sitio web:
                </p>
                <ul className="privacidad-page__list">
                  <li>
                    <strong>Responsable del Tratamiento:</strong> DOS POR DOS
                    GRUPO IMAGEN, S.L.
                  </li>
                  <li>
                    <strong>Dirección postal:</strong> URB. JUAN ASCANIO S/N –
                    35220 – TELDE – LAS PALMAS.
                  </li>
                  <li>
                    <strong>Dirección electrónica:</strong>{" "}
                    informatica@iidos.com
                  </li>
                </ul>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">
                  Tratamientos de datos
                </h3>
                <p>
                  Los datos de carácter personal que se soliciten, en su caso,
                  consistirán únicamente en aquellos estrictamente
                  imprescindibles para identificar y atender la solicitud
                  realizada por el titular de los mismos, en adelante el
                  interesado. Dicha información será tratada de forma leal,
                  lícita y transparente en relación con el interesado. Por otra
                  parte, los datos personales serán recogidos para finalidades
                  determinadas explícitas y legítimas, no siendo tratados
                  ulteriormente de manera incompatible con dichos fines.
                </p>
                <p>
                  En la presente web, dospordosgrupoimagen.com, también existe
                  la opción de suscribirse al Newsletter, facilitando una
                  dirección de correo electrónico, a la que se remitirá la
                  misma.
                </p>
                <p>
                  Los datos recogidos de cada interesado serán adecuados,
                  pertinentes y no excesivos en relación a las finalidades
                  correspondientes para cada caso, y serán actualizados siempre
                  que sea necesario.
                </p>
                <p>
                  El titular de los datos será informado, con carácter previo a
                  la recogida de sus datos, de los extremos generales regulados
                  en esta política a fin de que pueda prestar el consentimiento
                  expreso, preciso e inequívoco para el tratamiento de sus
                  datos, conforme a los siguientes aspectos.
                </p>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">
                  Finalidades del tratamiento
                </h3>
                <p>
                  Las finalidades explícitas para las cuales se llevan a cabo
                  cada uno de los tratamientos vienen recogido en las cláusulas
                  informativas incorporadas en cada una de las vías de toma de
                  datos (formularios web, formularios en papel, locuciones o
                  carteles y notas informativas).
                </p>
                <p>
                  No obstante, los datos de carácter personal del interesado
                  serán tratados con la exclusiva finalidad de proporcionarles
                  una respuesta efectiva y atender las solicitudes practicadas
                  por el usuario, especificadas junto a la opción, servicio,
                  formulario o sistema de toma de datos que el titular utilice.
                  Los datos obtenidos en el alta de Newsletter serán tratados
                  para enviar de forma periódica novedades, información
                  relevante y comunicaciones comerciales.
                </p>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">Legitimación</h3>
                <p>
                  Por regla general, previo al tratamiento de los datos
                  personales, DOS POR DOS GRUPO IMAGEN, S.L. obtiene
                  consentimiento expreso e inequívoco del titular de los mismos,
                  mediante la incorporación de cláusulas de consentimiento
                  informado en los diferentes sistemas de recogida de
                  información.
                </p>
                <p>
                  No obstante, en caso de que no se requiera el consentimiento
                  del interesado, la base legitimadora del tratamiento en la
                  cual se ampara DOS POR DOS GRUPO IMAGEN, S.L. es la existencia
                  de una ley o norma específica que autorice o exija el
                  tratamiento de los datos del interesado.
                </p>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">
                  Destinatarios
                </h3>
                <p>
                  Por regla general, DOS POR DOS GRUPO IMAGEN, S.L. no procede a
                  la cesión o comunicación de los datos a terceras entidades,
                  salvo las requeridas legalmente, no obstante, en caso de que
                  fuera necesario, dichas cesiones o comunicaciones de datos se
                  informan al interesado a través de las cláusulas de
                  consentimiento informado contenidas en las diferentes vías de
                  recogida de datos personales.
                </p>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">Procedencia</h3>
                <p>
                  Por regla general, los datos personales se recogen siempre
                  directamente del interesado, no obstante, en determinadas
                  excepciones, los datos pueden ser recogidos a través de
                  terceras personas, entidades o servicios diferentes del
                  interesado. En este sentido, este extremo será trasladado al
                  interesado a través de las cláusulas de consentimiento
                  informado contenidas en las diferentes vías de recogida de
                  información y dentro de un plazo razonable, una vez obtenidos
                  los datos, y a más tardar dentro de un mes.
                </p>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">
                  Plazos de conservación
                </h3>
                <p>
                  La información recabada del interesado será conservada
                  mientras sea necesaria para cumplir con la finalidad para la
                  cual fueron recabados los datos personales, de forma que, una
                  vez cumplida la finalidad los datos serán cancelados. Dicha
                  cancelación dará lugar al bloqueo de los datos conservándose
                  únicamente a disposición de las AAPP, Jueces y Tribunales,
                  para atender las posibles responsabilidades nacidas del
                  tratamiento, durante el plazo de prescripción de éstas,
                  cumplido el citado plazo se procederá a la destrucción de la
                  información.
                </p>
                <p>
                  A título informativo, a continuación, se recogen los plazos
                  legales de conservación de la información en relación a
                  diferentes materias:
                </p>

                <div className="privacidad-page__table-wrapper">
                  <table className="privacidad-page__table">
                    <thead>
                      <tr>
                        <th>DOCUMENTO</th>
                        <th>PLAZO</th>
                        <th>REF. LEGAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Documentación de carácter laboral o relacionada con la
                          seguridad social
                        </td>
                        <td>4 años</td>
                        <td>
                          Artículo 21 del Real Decreto Legislativo 5/2000, de 4
                          de agosto, por el que se aprueba el texto refundido de
                          la Ley sobre Infracciones y Sanciones en el Orden
                          Social
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Documentación contable y fiscal a efectos mercantiles
                        </td>
                        <td>6 años</td>
                        <td>Art. 30 Código Comercio</td>
                      </tr>
                      <tr>
                        <td>
                          Documentación contable y fiscal a efectos fiscales
                        </td>
                        <td>4 años</td>
                        <td>Artículos 66 a 70 Ley General Tributaria</td>
                      </tr>
                      <tr>
                        <td>Control de accesos a edificios</td>
                        <td>1 mes</td>
                        <td>Instrucción 1/1996 de la AEPD</td>
                      </tr>
                      <tr>
                        <td>Videovigilancia</td>
                        <td>1 mes</td>
                        <td>
                          Instrucción 1/2006 de la AEPD
                          <br />
                          Ley Orgánica 4/1997
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">
                  Datos de navegación
                </h3>
                <p>
                  En relación a los datos de navegación que se puedan tratar a
                  través del sitio web, en caso de que se recojan datos
                  sometidos a la normativa, se recomienda consultar la Política
                  de Cookies publicada en nuestro sitio web.
                </p>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">
                  Derechos de los interesados
                </h3>
                <p>
                  La normativa en materia de protección de datos otorga una
                  serie de derechos a los interesados o titulares de los datos,
                  usuarios del sitio web o usuarios de los perfiles de las redes
                  sociales de DOS POR DOS GRUPO IMAGEN, S.L.
                </p>
                <p>
                  Estos derechos que asisten a las personas interesadas son los
                  siguientes:
                </p>

                <ul className="privacidad-page__list">
                  <li>
                    <strong>Derecho de acceso:</strong> derecho a obtener
                    información sobre si sus propios datos están siendo objeto
                    de tratamiento, la finalidad del tratamiento que se esté
                    realizando, las categorías de datos que se trate, los
                    destinatarios o categorías de destinatarios, el plazo de
                    conservación y el origen de dichos datos.
                  </li>
                  <li>
                    <strong>Derecho de rectificación:</strong> derecho a obtener
                    la rectificación de los datos personales inexactos o
                    incompletos.
                  </li>
                  <li>
                    <strong>Derecho de supresión:</strong> derecho a obtener la
                    supresión de los datos en los siguientes supuestos:
                    <ul>
                      <li>
                        Cuando los datos ya no sean necesarios para la finalidad
                        para la cual fueron recabados
                      </li>
                      <li>
                        Cuando el titular de los mismos retire el consentimiento
                      </li>
                      <li>Cuando el interesado se oponga al tratamiento</li>
                      <li>
                        Cuando deban suprimirse en cumplimiento de una
                        obligación legal
                      </li>
                      <li>
                        Cuando los datos se hayan obtenido en virtud de un
                        servicio de sociedad de la información en base a lo
                        dispuesto en el art. 8 apdo. 1 del Reglamento Europeo
                        sobre Protección de datos.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Derecho de oposición:</strong> derecho a oponerse a
                    un determinado tratamiento basado en el consentimiento del
                    interesado.
                  </li>
                  <li>
                    <strong>Derecho de limitación:</strong> derecho a obtener la
                    limitación del tratamiento de los datos cuando se de alguno
                    de los siguientes supuestos:
                    <ul>
                      <li>
                        Cuando el interesado impugne la exactitud de los datos
                        personales, durante un plazo que permita a la empresa
                        verificar la exactitud de los mismos.
                      </li>
                      <li>
                        Cuando el tratamiento sea ilícito y el interesado se
                        oponga a la supresión de los datos.
                      </li>
                      <li>
                        Cuando la empresa ya no necesite los datos para los
                        fines para los que fueron recabados, pero el interesado
                        los necesite para la formulación, el ejercicio o la
                        defensa de reclamaciones.
                      </li>
                      <li>
                        Cuando el interesado se haya opuesto al tratamiento
                        mientras se verifica si los motivos legítimos de la
                        empresa prevalecen sobre los del interesado.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Derecho a la portabilidad:</strong> derecho a
                    obtener los datos en un formato estructurado, de uso común y
                    de lectura mecánica, y a transmitirlos a otro responsable
                    del tratamiento cuando:
                    <ul>
                      <li>El tratamiento esté basado en el consentimiento</li>
                      <li>
                        El tratamiento se efectúe por medios automatizados
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>
                      Derecho a presentar una reclamación ante la autoridad de
                      control competente
                    </strong>
                  </li>
                </ul>

                <p>
                  Los interesados podrán ejercitar los derechos indicados,
                  dirigiéndose a DOS POR DOS GRUPO IMAGEN, S.L., mediante
                  escrito, remitido a la siguiente dirección: URB. JUAN ASCANIO
                  S/N – 35220 – TELDE – LAS PALMAS indicando en la línea de
                  Asunto el derecho que desea ejercitar.
                </p>
                <p>
                  En este sentido DOS POR DOS GRUPO IMAGEN, S.L. atenderá su
                  solicitud a la mayor brevedad posible y teniendo en cuenta los
                  plazos previstos en la normativa en materia de protección de
                  datos.
                </p>
              </section>

              <section className="privacidad-page__section fade_bottom">
                <h3 className="privacidad-page__section-title">Seguridad</h3>
                <p>
                  Las medidas de seguridad adoptadas por DOS POR DOS GRUPO
                  IMAGEN, S.L. son aquellas requeridas, de conformidad con lo
                  establecido en el artículo 32 del RGPD. En este sentido, DOS
                  POR DOS GRUPO IMAGEN, S.L., teniendo en cuenta el estado de la
                  técnica, los costes de aplicación y la naturaleza, el alcance,
                  el contexto y los fines del tratamiento, así como los riesgos
                  de probabilidad y gravedad variables para los derechos y las
                  libertades de las personas físicas, tiene establecidas las
                  medidas técnicas y organizativas apropiadas para garantizar el
                  nivel de seguridad adecuado al riesgo existente.
                </p>
                <p>
                  En todo caso, DOS POR DOS GRUPO IMAGEN, S.L. tiene
                  implementados los mecanismos suficientes para:
                </p>

                <ul className="privacidad-page__list">
                  <li>
                    Garantizar la confidencialidad, integridad, disponibilidad y
                    resiliencia permanentes de los sistemas y servicios de
                    tratamiento.
                  </li>
                  <li>
                    Restaurar la disponibilidad y el acceso a los datos
                    personales de forma rápida, en caso de incidente físico o
                    técnico.
                  </li>
                  <li>
                    Verificar, evaluar y valorar, de forma regular, la eficacia
                    de las medidas técnicas y organizativas implantadas para
                    garantizar la seguridad del tratamiento.
                  </li>
                  <li>
                    Seudonimizar y cifrar los datos personales, en su caso.
                  </li>
                </ul>
              </section>
            </div>

            <div className="privacidad-page__mobile-social-section">
              <div className="privacidad-page__mobile-social-header">
                <h3 className="privacidad-page__mobile-social-title">
                  Síguenos
                </h3>
              </div>
              <SocialIcons orientation="horizontal" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacidadPage;

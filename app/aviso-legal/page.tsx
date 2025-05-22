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

import "./aviso-legal-page.scss";

const AvisoLegalPage: React.FC = () => {
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
        <div className="aviso-legal-page">
          <div className="aviso-legal-page__container">
            <div className="aviso-legal-page__header">
              <h1 className="aviso-legal-page__title char-animation">
                AVISO LEGAL
              </h1>
            </div>

            <div className="aviso-legal-page__content">
              <section className="aviso-legal-page__section">
                <h3 className="aviso-legal-page__section-title fade_bottom">Objeto</h3>
                <p>
                  El presente aviso legal regula el uso y utilización del sitio
                  web iidos.com, del que es titular DOS POR DOS GRUPO IMAGEN,
                  S.L. (en adelante, EL PROPIETARIO DE LA WEB).
                </p>
                <p>
                  La navegación por el sitio web de EL PROPIETARIO DE LA WEB le
                  atribuye la condición de USUARIO del mismo y conlleva su
                  aceptación plena y sin reservas de todas y cada una de las
                  condiciones publicadas en este aviso legal, advirtiendo de que
                  dichas condiciones podrán ser modificadas sin notificación
                  previa por parte de EL PROPIETARIO DE LA WEB, en cuyo caso se
                  procederá a su publicación y aviso con la máxima antelación
                  posible.
                </p>
                <p>
                  Por ello es recomendable leer atentamente su contenido en caso
                  de desear acceder y hacer uso de la información y de los
                  servicios ofrecidos desde este sitio web.
                </p>
                <p>
                  El usuario, además, se obliga a hacer un uso correcto del
                  sitio web de conformidad con las leyes, la buena fe, el orden
                  público, los usos del tráfico y el presente Aviso Legal, y
                  responderá frente a EL PROPIETARIO DE LA WEB o frente a
                  terceros, de cualesquiera daños y perjuicios que pudieran
                  causarse como consecuencia del incumplimiento de dicha
                  obligación.
                </p>
                <p>
                  Cualquier utilización distinta a la autorizada está
                  expresamente prohibida, pudiendo EL PROPIETARIO DE LA WEB
                  denegar o retirar el acceso y su uso en cualquier momento.
                </p>
              </section>

              <section className="aviso-legal-page__section">
                <h3 className="aviso-legal-page__section-title fade_bottom">
                  Identificación
                </h3>
                <p>
                  EL PROPIETARIO DE LA WEB, en cumplimiento de la Ley 34/2002,
                  de 11 de julio, de Servicios de la Sociedad de la Información
                  y de Comercio Electrónico, le informa de que:
                </p>
                <ul className="aviso-legal-page__list">
                  <li>
                    <strong>Su denominación social es:</strong> DOS POR DOS
                    GRUPO IMAGEN, S.L.
                  </li>
                  <li>
                    <strong>Su CIF es:</strong> B35590314
                  </li>
                  <li>
                    <strong>Su domicilio social está en:</strong> URB. JUAN
                    ASCANIO S/N – 35220 – TELDE – LAS PALMAS
                  </li>
                  <li>
                    <strong>REGISTRO MERCANTIL LAS PALMAS</strong>
                  </li>
                  <li>TOMO 1472 SECCION 8 INSCRP 1 HOJA GC-22868 FOLIO206</li>
                </ul>
              </section>

              <section className="aviso-legal-page__section">
                <h3 className="aviso-legal-page__section-title fade_bottom">
                  Comunicaciones
                </h3>
                <p>
                  Para comunicarse con nosotros, ponemos a su disposición
                  diferentes medios de contacto que detallamos a continuación:
                </p>
                <ul className="aviso-legal-page__list">
                  <li>
                    <strong>Tfno:</strong> 928712222
                  </li>
                  <li>
                    <strong>Email:</strong> hola@dospordosgrupoimagen.com
                  </li>
                </ul>
                <p>
                  Todas las notificaciones y comunicaciones entre los usuarios y
                  PROPIETARIO DE LA WEB se considerarán eficaces, a todos los
                  efectos, cuando se realicen a través de cualquier medio de los
                  detallados anteriormente.
                </p>
              </section>

              <section className="aviso-legal-page__section">
                <h3 className="aviso-legal-page__section-title fade_bottom">
                  Condiciones de acceso y utilización
                </h3>
                <p>
                  El sitio web y sus servicios son de acceso libre y gratuito.
                  No obstante, PROPIETARIO DE LA WEB puede condicionar la
                  utilización de algunos de los servicios ofrecidos en su web a
                  la previa cumplimentación del correspondiente formulario.
                </p>
                <p>
                  El usuario garantiza la autenticidad y actualidad de todos
                  aquellos datos que comunique a PROPIETARIO DE LA WEB y será el
                  único responsable de las manifestaciones falsas o inexactas
                  que realice.
                </p>
                <p>
                  El usuario se compromete expresamente a hacer un uso adecuado
                  de los contenidos y servicios de PROPIETARIO DE LA WEB y a no
                  emplearlos para, entre otros:
                </p>
                <ul className="aviso-legal-page__list">
                  <li>
                    Difundir contenidos delictivos, violentos, pornográficos,
                    racistas, xenófobos, ofensivos, de apología del terrorismo
                    o, en general, contrarios a la ley o al orden público.
                  </li>
                  <li>
                    Introducir en la red virus informáticos o realizar
                    actuaciones susceptibles de alterar, estropear, interrumpir
                    o generar errores o daños en los documentos electrónicos,
                    datos o sistemas físicos y lógicos de PROPIETARIO DE LA WEB
                    o de terceras personas; así como obstaculizar el acceso de
                    otros usuarios al sitio web y a sus servicios mediante el
                    consumo masivo de los recursos informáticos a través de los
                    cuales PROPIETARIO DE LA WEB presta sus servicios.
                  </li>
                  <li>
                    Intentar acceder a las cuentas de correo electrónico de
                    otros usuarios o a áreas restringidas de los sistemas
                    informáticos de PROPIETARIO DE LA WEB o de terceros y, en su
                    caso, extraer información.
                  </li>
                  <li>
                    Vulnerar los derechos de propiedad intelectual o industrial,
                    así como violar la confidencialidad de la información de
                    PROPIETARIO DE LA WEB o de terceros.
                  </li>
                  <li>Suplantar la identidad de cualquier otro usuario.</li>
                  <li>
                    Reproducir, copiar, distribuir, poner a disposición de, o
                    cualquier otra forma de comunicación pública, transformar o
                    modificar los contenidos, a menos que se cuente con la
                    autorización del titular de los correspondientes derechos o
                    ello resulte legalmente permitido.
                  </li>
                  <li>
                    Recabar datos con finalidad publicitaria y de remitir
                    publicidad de cualquier clase y comunicaciones con fines de
                    venta u otras de naturaleza comercial sin que medie su
                    previa solicitud o consentimiento.
                  </li>
                </ul>
                <p>
                  Todos los contenidos del sitio web, como textos, fotografías,
                  gráficos, imágenes, iconos, tecnología, software, así como su
                  diseño gráfico y códigos fuente, constituyen una obra cuya
                  propiedad pertenece a PROPIETARIO DE LA WEB, sin que puedan
                  entenderse cedidos al usuario ninguno de los derechos de
                  explotación sobre los mismos más allá de lo estrictamente
                  necesario para el correcto uso de la web.
                </p>
                <p>
                  En definitiva, los usuarios que accedan a este sitio web
                  pueden visualizar los contenidos y efectuar, en su caso,
                  copias privadas autorizadas siempre que los elementos
                  reproducidos no sean cedidos posteriormente a terceros, ni se
                  instalen a servidores conectados a redes, ni sean objeto de
                  ningún tipo de explotación.
                </p>
                <p>
                  Asimismo, todas las marcas, nombres comerciales o signos
                  distintivos de cualquier clase que aparecen en el sitio web
                  son propiedad de PROPIETARIO DE LA WEB, sin que pueda
                  entenderse que el uso o acceso al mismo atribuya al usuario
                  derecho alguno sobre los mismos.
                </p>
                <p>
                  La distribución, modificación, cesión o comunicación pública
                  de los contenidos y cualquier otro acto que no haya sido
                  expresamente autorizado por el titular de los derechos de
                  explotación quedan prohibidos.
                </p>
                <p>
                  El establecimiento de un hiperenlace no implica en ningún caso
                  la existencia de relaciones entre PROPIETARIO DE LA WEB y el
                  propietario del sitio web en la que se establezca, ni la
                  aceptación y aprobación por parte de PROPIETARIO DE LA WEB de
                  sus contenidos o servicios.
                </p>
                <p>
                  PROPIETARIO DE LA WEB no se responsabiliza del uso que cada
                  usuario le dé a los materiales puestos a disposición en este
                  sitio web ni de las actuaciones que realice en base a los
                  mismos.
                </p>
              </section>

              <section className="aviso-legal-page__section">
                <h3 className="aviso-legal-page__section-title fade_bottom">
                  Exclusión de garantías y de responsabilidad en el acceso y la
                  utilización
                </h3>
                <p>
                  El contenido del presente sitio web es de carácter general y
                  tiene una finalidad meramente informativa, sin que se
                  garantice plenamente el acceso a todos los contenidos, ni su
                  exhaustividad, corrección, vigencia o actualidad, ni su
                  idoneidad o utilidad para un objetivo específico.
                </p>
                <p>
                  PROPIETARIO DE LA WEB excluye, hasta donde permite el
                  ordenamiento jurídico, cualquier responsabilidad por los daños
                  y perjuicios de toda naturaleza derivados de:
                </p>
                <ul className="aviso-legal-page__list">
                  <li>
                    La imposibilidad de acceso al sitio web o la falta de
                    veracidad, exactitud, exhaustividad y/o actualidad de los
                    contenidos, así como la existencia de vicios y defectos de
                    toda clase de los contenidos transmitidos, difundidos,
                    almacenados, puestos a disposición, a los que se haya
                    accedido a través del sitio web o de los servicios que se
                    ofrecen.
                  </li>
                  <li>
                    La presencia de virus o de otros elementos en los contenidos
                    que puedan producir alteraciones en los sistemas
                    informáticos, documentos electrónicos o datos de los
                    usuarios.
                  </li>
                  <li>
                    El incumplimiento de las leyes, la buena fe, el orden
                    público, los usos del tráfico y el presente aviso legal como
                    consecuencia del uso incorrecto del sitio web. En
                    particular, y a modo ejemplificativo, PROPIETARIO DE LA WEB
                    no se hace responsable de las actuaciones de terceros que
                    vulneren derechos de propiedad intelectual e industrial,
                    secretos empresariales, derechos al honor, a la intimidad
                    personal y familiar y a la propia imagen, así como la
                    normativa en materia de competencia desleal y publicidad
                    ilícita.
                  </li>
                </ul>
                <p>
                  Asimismo, PROPIETARIO DE LA WEB declina cualquier
                  responsabilidad respecto a la información que se halle fuera
                  de esta web y no sea gestionada directamente por nuestro
                  webmaster. La función de los links que aparecen en esta web es
                  exclusivamente la de informar al usuario sobre la existencia
                  de otras fuentes susceptibles de ampliar los contenidos que
                  ofrece este sitio web. PROPIETARIO DE LA WEB no garantiza ni
                  se responsabiliza del funcionamiento o accesibilidad de los
                  sitios enlazados; ni sugiere, invita o recomienda la visita a
                  los mismos, por lo que tampoco será responsable del resultado
                  obtenido. PROPIETARIO DE LA WEB no se responsabiliza del
                  establecimiento de hipervínculos por parte de terceros.
                </p>
              </section>

              <section className="aviso-legal-page__section">
                <h3 className="aviso-legal-page__section-title fade_bottom">
                  Procedimiento en caso de realización de actividades de
                  carácter ilícito
                </h3>
                <p>
                  En el caso de que cualquier usuario o un tercero considere que
                  existen hechos o circunstancias que revelen el carácter
                  ilícito de la utilización de cualquier contenido y/o de la
                  realización de cualquier actividad en las páginas web
                  incluidas o accesibles a través del sitio web, deberá enviar
                  una notificación a PROPIETARIO DE LA WEB identificándose
                  debidamente y especificando las supuestas infracciones.
                </p>
              </section>

              <section className="aviso-legal-page__section">
                <h3 className="aviso-legal-page__section-title fade_bottom">
                  Publicaciones
                </h3>
                <p>
                  La información administrativa facilitada a través del sitio
                  web no sustituye la publicidad legal de las leyes, normativas,
                  planes, disposiciones generales y actos que tengan que ser
                  publicados formalmente a los diarios oficiales de las
                  administraciones públicas, que constituyen el único
                  instrumento que da fe de su autenticidad y contenido. La
                  información disponible en este sitio web debe entenderse como
                  una guía sin propósito de validez legal.
                </p>
              </section>

              <section className="aviso-legal-page__section">
                <h3 className="aviso-legal-page__section-title fade_bottom">
                  Legislación aplicable
                </h3>
                <p>
                  Las condiciones presentes se regirán por la legislación
                  española vigente.
                </p>
                <p>La lengua utilizada será el Castellano.</p>
              </section>
            </div>

            <div className="aviso-legal-page__mobile-social-section">
              <div className="aviso-legal-page__mobile-social-header">
                <h3 className="aviso-legal-page__mobile-social-title">
                  Síguenos
                </h3>
              </div>
              <SocialIcons orientation="horizontal" />
            </div>
          </div>
        </div><Footer />
      </div>        
    </div>
  );
};

export default AvisoLegalPage;

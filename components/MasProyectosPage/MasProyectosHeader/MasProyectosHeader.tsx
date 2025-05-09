import React from "react";
import "./MasProyectosHeader.scss";

interface MasProyectosHeaderProps {
  titleRef: React.RefObject<HTMLHeadingElement>;
}

const MasProyectosHeader: React.FC<MasProyectosHeaderProps> = ({
  titleRef,
}) => {
  return (
    <div className="mas-proyectos-header">
      <div className="mas-proyectos-header__content">
        <p className="mas-proyectos-header__label">dosxdos</p>
        <h1
          className="mas-proyectos-header__title char-animation"
          ref={titleRef}
        >
          Nuestros últimos y gran proyectos
        </h1>
        <p className="mas-proyectos-header__description">
          Somos un equipo creativo que diseña espacios de marca únicos y
          experiencias visuales memorables para nuestros clientes.
        </p>
      </div>
    </div>
  );
};

export default MasProyectosHeader;

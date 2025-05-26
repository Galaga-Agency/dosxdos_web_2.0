"use client";

import React, { useRef } from "react";
import { teamMembers } from "@/data/team";
import HoverCard from "@/components/ui/HoverCard/HoverCard";
import "./TeamSection.scss";

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="team-section">
      <div className="team-section__container">
        <div className="team-section__header">
          <h3 className="team-section__label label">(Nuestro equipo)</h3>

          <h2 className="team-section__title fade_bottom">
            El talento detrás de cada espacio <br />
            El compromiso detrás de{" "}
            <span className="highlight">cada detalle</span>
          </h2>
        </div>

        <p className="team-section__subtitle">
          Sabemos que el diseño empieza por las personas. Por eso, cada uno de
          nuestros departamentos aporta algo único: experiencia, innovación,
          pasión por los materiales, atención al detalle. Juntos, hacemos
          posible que cada proyecto sea fiel a su propósito.
        </p>

        <div className="team-section__grid">
          {teamMembers.map((member: any, index) => (
            <div key={member.id} className="team-section__card-wrapper">
              <HoverCard
                id={member.id}
                title={member.name}
                description={member.position}
                email={member.email}
                imageUrl={member.imageUrl}
                linkUrl={`/equipo/${member.id}`}
                showLink={false} // Hide the link for team members
                showLinkUrl={false} // Don't wrap card in Link
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

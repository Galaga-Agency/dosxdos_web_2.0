"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./NuestrosClientesGridSection.scss";

interface ClientLogo {
  id: string;
  name: string;
  src: string;
}

const NuestrosClientesGridSection: React.FC = () => {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Import clients data after component mounts
    import("@/data/clients")
      .then((clientsModule) => {
        setClients(clientsModule.clients);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading clients data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="nuestros-clientes-grid">
      <div className="nuestros-clientes-grid__container container">
          {loading
            ? // Loading skeleton
              Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="nuestros-clientes-grid__item"
                  style={{ opacity: 0.3 }}
                >
                  <div className="nuestros-clientes-grid__logo-wrapper">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#f0f0f0",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              ))
            : clients.map((client, index) => (
                <div
                  key={client.id}
                  className="nuestros-clientes-grid__item"
                  data-index={index}
                >
                  <div className="nuestros-clientes-grid__logo-wrapper">
                    <Image
                      src={client.src}
                      alt={`Logo de ${client.name}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="nuestros-clientes-grid__logo"
                    />
                  </div>
                  <span className="nuestros-clientes-grid__name">
                    {client.name}
                  </span>
                </div>
              ))}
        </div>
    </section>
  );
};

export default NuestrosClientesGridSection;

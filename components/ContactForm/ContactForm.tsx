"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";

import "./ContactForm.scss";

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  useGSAP(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll(".form-group"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: "hola@dospordosgrupoimagen.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Mensaje enviado exitosamente");
      reset();
    } catch (error) {
      toast.error("Error al enviar el mensaje");
      console.error("Error de envío:", error);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <Toaster position="top-right" />

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="contact-form"
      >
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Nombre completo"
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
              })}
            />
            <span className="input-border"></span>
          </div>
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido",
                },
              })}
            />
            <span className="input-border"></span>
          </div>
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Asunto"
              {...register("subject", {
                required: "El asunto es obligatorio",
                minLength: {
                  value: 3,
                  message: "El asunto debe tener al menos 3 caracteres",
                },
              })}
            />
            <span className="input-border"></span>
          </div>
          {errors.subject && (
            <span className="error-message">{errors.subject.message}</span>
          )}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <textarea
              placeholder="Describe tu proyecto"
              {...register("message", {
                required: "El mensaje es obligatorio",
                minLength: {
                  value: 10,
                  message: "El mensaje debe tener al menos 10 caracteres",
                },
              })}
            ></textarea>
            <span className="input-border"></span>
          </div>
          {errors.message && (
            <span className="error-message">{errors.message.message}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          <span>Enviar Mensaje</span>
          <div className="btn-overlay"></div>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

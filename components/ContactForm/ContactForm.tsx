"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

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
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>();

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

      // Simple success animation
      if (formRef.current) {
        gsap.to(formRef.current, {
          y: -5,
          duration: 0.2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
      }
    } catch (error) {
      toast.error("Error al enviar el mensaje");
      console.error("Error de envío:", error);

      // Error shake animation
      if (formRef.current) {
        gsap.to(formRef.current, {
          x: 5,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 3,
        });
      }
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
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Su nombre completo"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo electrónico inválido",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Asunto</label>
          <input
            type="text"
            placeholder="Asunto de su mensaje"
            {...register("subject", {
              required: "El asunto es obligatorio",
              minLength: {
                value: 3,
                message: "El asunto debe tener al menos 3 caracteres",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.subject && (
            <span className="error-message">{errors.subject.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Mensaje</label>
          <textarea
            placeholder="Cuéntenos sobre su proyecto"
            rows={5}
            {...register("message", {
              required: "El mensaje es obligatorio",
              minLength: {
                value: 10,
                message: "El mensaje debe tener al menos 10 caracteres",
              },
            })}
            disabled={isSubmitting}
          ></textarea>
          {errors.message && (
            <span className="error-message">{errors.message.message}</span>
          )}
        </div>

        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
          fullWidth
          className="contact-form__submit-btn"
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default ContactForm;

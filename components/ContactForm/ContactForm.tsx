"use client";

import React, { useRef, useEffect } from "react";
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
  const formGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>();

  // Initialize animation for form groups
  useEffect(() => {
    if (formGroupRefs.current.length > 0) {
      gsap.fromTo(
        formGroupRefs.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.5,
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

      toast.success("Mensaje enviado exitosamente", {
        style: {
          borderLeft: "3px solid #e63322",
          padding: "16px",
          color: "#281528",
        },
        iconTheme: {
          primary: "#e63322",
          secondary: "#FFFFFF",
        },
      });

      reset();

      // Enhanced success animation
      if (formRef.current) {
        gsap
          .timeline()
          .to(formRef.current, {
            y: -5,
            duration: 0.2,
            ease: "power2.out",
          })
          .to(formRef.current, {
            y: 0,
            duration: 0.3,
            ease: "bounce.out",
          });
      }
    } catch (error) {
      toast.error("Error al enviar el mensaje", {
        style: {
          borderLeft: "3px solid #e63322",
          padding: "16px",
          color: "#281528",
        },
      });

      console.error("Error de envío:", error);

      // Enhanced error shake animation
      if (formRef.current) {
        gsap
          .timeline()
          .to(formRef.current, {
            x: -5,
            duration: 0.1,
            ease: "power2.inOut",
          })
          .to(formRef.current, {
            x: 5,
            duration: 0.1,
            ease: "power2.inOut",
            repeat: 2,
            yoyo: true,
          })
          .to(formRef.current, {
            x: 0,
            duration: 0.1,
            ease: "power2.out",
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
        <div
          className="form-group"
          ref={(el) => (formGroupRefs.current[0] = el) as any}
        >
          <label>Nombre</label>
          <div className="input-container">
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
            <div className="input-line"></div>
          </div>
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div
          className="form-group"
          ref={(el) => (formGroupRefs.current[1] = el) as any}
        >
          <label>Correo electrónico</label>
          <div className="input-container">
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
            <div className="input-line"></div>
          </div>
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div
          className="form-group"
          ref={(el) => (formGroupRefs.current[2] = el) as any}
        >
          <label>Asunto</label>
          <div className="input-container">
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
            <div className="input-line"></div>
          </div>
          {errors.subject && (
            <span className="error-message">{errors.subject.message}</span>
          )}
        </div>

        <div
          className="form-group"
          ref={(el) => (formGroupRefs.current[3] = el) as any}
        >
          <label>Mensaje</label>
          <div className="input-container">
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
            <div className="input-line"></div>
          </div>
          {errors.message && (
            <span className="error-message">{errors.message.message}</span>
          )}
        </div>

        <div
          className="form-submit"
          ref={(el) => (formGroupRefs.current[4] = el) as any}
        >
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            fullWidth
            className="contact-form__submit-btn"
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

import "./ZohoContactForm.scss";

interface ContactFormInputs {
  // Page 1 - Company data (ALL MANDATORY)
  company: string; // SingleLine - Razón social
  cif: string; // SingleLine1 - CIF / NIF
  address: string; // SingleLine2 - Dirección fiscal
  city: string; // SingleLine3 - Población
  postalCode: string; // SingleLine4 - Código postal
  province: string; // SingleLine5 - Provincia
  phone: string; // PhoneNumber - Teléfono
  email: string; // Email - Correo electrónico

  // Page 2 - Contact person (ALL MANDATORY)
  firstName: string; // Name_First - Nombre
  lastName: string; // Name_Last - Apellidos
  contactPhone: string; // PhoneNumber1 - Teléfono móvil/fijo
  contactEmail: string; // Email1 - Correo electrónico
  administration: string; // SingleLine6 - Administración

  // Page 3 - Required fields (ALL MANDATORY)
  howDidYouKnow: string; // Checkbox - ¿Cómo nos conociste?
  acceptTerms: boolean; // TermsConditions - Términos y condiciones
  signature: string; // Signature - Firma
  signerName: string; // Name1_First - Nombre del firmante
  signerPosition: string; // Name1_Last - Cargo del firmante
}

const ZohoContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const formGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>();

  // Initialize animation for form groups
  useEffect(() => {
    if (formGroupRefs.current.length > 0) {
      gsap.fromTo(
        formGroupRefs.current.filter((ref) => ref !== null),
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
  }, [currentStep]);

  const validateStep = async (step: number) => {
    let fieldsToValidate: (keyof ContactFormInputs)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = [
          "company",
          "cif",
          "address",
          "city",
          "postalCode",
          "province",
          "phone",
          "email",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "firstName",
          "lastName",
          "contactPhone",
          "contactEmail",
          "administration",
        ];
        break;
      case 3:
        fieldsToValidate = [
          "howDidYouKnow",
          "acceptTerms",
          "signature",
          "signerName",
          "signerPosition",
        ];
        break;
    }

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    console.log("=== FORM SUBMISSION STARTED ===");
    console.log("Form data:", data);

    try {
      console.log("=== SENDING REQUEST TO API ===");
      const response = await fetch("/api/submit-to-zoho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("=== API RESPONSE RECEIVED ===");
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.log("Error response body:", errorData);
        throw new Error("Error al enviar el formulario");
      }

      const result = await response.json();
      console.log("Success result:", result);

      toast.success(
        "¡Formulario enviado exitosamente! Te contactaremos pronto.",
        {
          style: {
            borderLeft: "3px solid #e63322",
            padding: "16px",
            color: "#281528",
          },
          iconTheme: {
            primary: "#e63322",
            secondary: "#FFFFFF",
          },
        }
      );

      reset();
      setCurrentStep(1);

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
      console.log("=== ERROR OCCURRED ===");
      console.error("Full error:", error);

      toast.error(
        "Error al enviar el formulario. Por favor, inténtalo de nuevo.",
        {
          style: {
            borderLeft: "3px solid #e63322",
            padding: "16px",
            color: "#281528",
          },
        }
      );

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

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
            <span>1</span>
            <label>Datos de la empresa</label>
          </div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
            <span>2</span>
            <label>Contacto</label>
          </div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <span>3</span>
            <label>Finalizar</label>
          </div>
        </div>
        <div className="progress-line">
          <div
            className="progress-fill"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="contact-form"
      >
        {/* STEP 1 - COMPANY DATA */}
        {currentStep === 1 && (
          <div className="form-step">
            <h3>Datos de la empresa</h3>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[0] = el) as any}
            >
              <label>Razón social *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Nombre de la empresa"
                  {...register("company", {
                    required: "La razón social es obligatoria",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.company && (
                <span className="error-message">{errors.company.message}</span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[1] = el) as any}
            >
              <label>CIF / NIF *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="B12345678"
                  {...register("cif", {
                    required: "El CIF/NIF es obligatorio",
                    minLength: {
                      value: 9,
                      message: "Debe tener 9 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.cif && (
                <span className="error-message">{errors.cif.message}</span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[2] = el) as any}
            >
              <label>Dirección fiscal *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Calle, número, piso"
                  {...register("address", {
                    required: "La dirección fiscal es obligatoria",
                    minLength: {
                      value: 5,
                      message: "Debe tener al menos 5 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.address && (
                <span className="error-message">{errors.address.message}</span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[3] = el) as any}
            >
              <label>Población *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Ciudad"
                  {...register("city", {
                    required: "La población es obligatoria",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.city && (
                <span className="error-message">{errors.city.message}</span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[4] = el) as any}
            >
              <label>Código postal *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="28001"
                  {...register("postalCode", {
                    required: "El código postal es obligatorio",
                    pattern: {
                      value: /^[0-9]{5}$/,
                      message: "Debe tener exactamente 5 dígitos",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.postalCode && (
                <span className="error-message">
                  {errors.postalCode.message}
                </span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[5] = el) as any}
            >
              <label>Provincia *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Provincia"
                  {...register("province", {
                    required: "La provincia es obligatoria",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.province && (
                <span className="error-message">{errors.province.message}</span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[6] = el) as any}
            >
              <label>Teléfono *</label>
              <div className="input-container">
                <input
                  type="tel"
                  placeholder="600000000"
                  {...register("phone", {
                    required: "El teléfono es obligatorio",
                    pattern: {
                      value: /^[6-9][0-9]{8}$/,
                      message: "Formato: 600000000 (9 dígitos)",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[7] = el) as any}
            >
              <label>Correo electrónico *</label>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="empresa@ejemplo.com"
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

            <div className="form-navigation">
              <PrimaryButton
                type="button"
                onClick={nextStep}
                className="next-btn"
              >
                Siguiente
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* STEP 2 - CONTACT PERSON */}
        {currentStep === 2 && (
          <div className="form-step">
            <h3>Persona de contacto principal</h3>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[8] = el) as any}
            >
              <label>Nombre *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Nombre"
                  {...register("firstName", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.firstName && (
                <span className="error-message">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[9] = el) as any}
            >
              <label>Apellidos *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Apellidos"
                  {...register("lastName", {
                    required: "Los apellidos son obligatorios",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.lastName && (
                <span className="error-message">{errors.lastName.message}</span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[10] = el) as any}
            >
              <label>Teléfono móvil / fijo *</label>
              <div className="input-container">
                <input
                  type="tel"
                  placeholder="600000000"
                  {...register("contactPhone", {
                    required: "El teléfono de contacto es obligatorio",
                    pattern: {
                      value: /^[6-9][0-9]{8}$/,
                      message: "Formato: 600000000 (9 dígitos)",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.contactPhone && (
                <span className="error-message">
                  {errors.contactPhone.message}
                </span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[11] = el) as any}
            >
              <label>Correo electrónico *</label>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="contacto@ejemplo.com"
                  {...register("contactEmail", {
                    required: "El correo de contacto es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo electrónico inválido",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.contactEmail && (
                <span className="error-message">
                  {errors.contactEmail.message}
                </span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[12] = el) as any}
            >
              <label>Administración (nombre + e-mail) *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Nombre administrador + email@ejemplo.com"
                  {...register("administration", {
                    required: "Los datos de administración son obligatorios",
                    minLength: {
                      value: 10,
                      message: "Debe incluir nombre y email",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.administration && (
                <span className="error-message">
                  {errors.administration.message}
                </span>
              )}
            </div>

            <div className="form-navigation">
              <PrimaryButton
                type="button"
                onClick={prevStep}
                className="prev-btn"
              >
                Anterior
              </PrimaryButton>
              <PrimaryButton
                type="button"
                onClick={nextStep}
                className="next-btn"
              >
                Siguiente
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* STEP 3 - FINAL INFO */}
        {currentStep === 3 && (
          <div className="form-step">
            <h3>Información adicional</h3>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[13] = el) as any}
            >
              <label>¿Cómo nos conociste? *</label>
              <div className="input-container">
                <select
                  {...register("howDidYouKnow", {
                    required: "Debes seleccionar una opción",
                  })}
                  disabled={isSubmitting}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Página web">Página web</option>
                  <option value="Redes Sociales">Redes Sociales</option>
                  <option value="Evento">Evento</option>
                  <option value="Chat">Chat</option>
                  <option value="Referencia de cliente o fabricante">
                    Referencia de cliente o fabricante
                  </option>
                  <option value="Otro">Otro</option>
                </select>
                <div className="input-line"></div>
              </div>
              {errors.howDidYouKnow && (
                <span className="error-message">
                  {errors.howDidYouKnow.message}
                </span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[14] = el) as any}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  {...register("acceptTerms", {
                    validate: (value) =>
                      value === true ||
                      "Debes aceptar los términos y condiciones",
                  })}
                  disabled={isSubmitting}
                  style={{
                    width: "18px",
                    height: "18px",
                    marginRight: "0.5rem",
                    accentColor: "#e63322",
                  }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      clearErrors("acceptTerms");
                    }
                  }}
                />
                Acepto los términos y condiciones *
              </label>
              {errors.acceptTerms && (
                <span className="error-message">
                  {errors.acceptTerms.message}
                </span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[15] = el) as any}
            >
              <label>Firma *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Escribe tu firma digital"
                  {...register("signature", {
                    required: "La firma es obligatoria",
                    minLength: {
                      value: 3,
                      message: "Debe tener al menos 3 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.signature && (
                <span className="error-message">
                  {errors.signature.message}
                </span>
              )}
            </div>

            <h4>Información del firmante</h4>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[16] = el) as any}
            >
              <label>Nombre del firmante *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Nombre del firmante"
                  {...register("signerName", {
                    required: "El nombre del firmante es obligatorio",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.signerName && (
                <span className="error-message">
                  {errors.signerName.message}
                </span>
              )}
            </div>

            <div
              className="form-group"
              ref={(el) => (formGroupRefs.current[17] = el) as any}
            >
              <label>Cargo del firmante *</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Director, Gerente, etc."
                  {...register("signerPosition", {
                    required: "El cargo del firmante es obligatorio",
                    minLength: {
                      value: 3,
                      message: "Debe tener al menos 3 caracteres",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <div className="input-line"></div>
              </div>
              {errors.signerPosition && (
                <span className="error-message">
                  {errors.signerPosition.message}
                </span>
              )}
            </div>

            <div className="form-navigation">
              <PrimaryButton
                type="button"
                onClick={prevStep}
                className="prev-btn"
              >
                Anterior
              </PrimaryButton>
              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? "Enviando..." : "Enviar Formulario"}
              </PrimaryButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ZohoContactForm;

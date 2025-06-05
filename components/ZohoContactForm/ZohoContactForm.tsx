"use client";

import React, { useRef, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton/SecondaryButton";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import CustomSelect from "@/components/ui/CustomSelect/CustomSelect";
import SignatureCanvas from "@/components/SignatureCanvas/SignatureCanvas";
import {
  animateFormGroups,
  animateSuccess,
  animateError,
} from "@/utils/animations/form-anim";
import { useFormSteps } from "@/hooks/useFormSteps";

import "./ZohoContactForm.scss";

interface ContactFormInputs {
  // Page 1 - Company data (ALL MANDATORY)
  company: string;
  cif: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  phone: string;
  email: string;

  // Page 2 - Contact person (ALL MANDATORY)
  firstName: string;
  lastName: string;
  contactPhone: string;
  contactEmail: string;
  administration: string;

  // Page 3 - Required fields (ALL MANDATORY)
  howDidYouKnow: string;
  acceptTerms: boolean;
  signature: string;
  signerName: string;
  signerPosition: string;
}

const ZohoContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const formGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [signatureData, setSignatureData] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ContactFormInputs>();

  const { currentStep, nextStep, prevStep, setCurrentStep } =
    useFormSteps(trigger);

  // Animate form groups on step change
  useEffect(() => {
    animateFormGroups(formGroupRefs.current);
  }, [currentStep]);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    console.log("=== FORM SUBMISSION STARTED ===");

    const formData = {
      ...data,
      signature: signatureData,
    };

    console.log("Form data:", formData);

    try {
      console.log("=== SENDING REQUEST TO API ===");
      const response = await fetch("/api/submit-to-zoho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

      // Set success state - THIS REPLACES THE FORM
      setIsSuccess(true);
      setIsError(false);

      // Success animation
      if (formRef.current) {
        animateSuccess(formRef.current);
      }

      // Auto-reset after 10 seconds
      setTimeout(() => {
        reset();
        setCurrentStep(1);
        setSignatureData("");
        setIsSuccess(false);
      }, 10000);
    } catch (error) {
      console.log("=== ERROR OCCURRED ===");
      console.error("Full error:", error);

      // Set error state - THIS REPLACES THE FORM
      setIsError(true);
      setIsSuccess(false);

      // Error shake animation
      if (formRef.current) {
        animateError(formRef.current);
      }

      // Clear error state after 8 seconds and allow retry
      setTimeout(() => {
        setIsError(false);
      }, 8000);
    }
  };

  return (
    <div className="contact-form-wrapper">
      {/* FORM REPLACED BY SUCCESS FEEDBACK */}
      {isSuccess && (
        <div className="feedback-screen success">
          <div className="feedback-content">
            <div className="feedback-icon">✅</div>
            <h2>¡Formulario enviado exitosamente!</h2>
            <p>
              Gracias por contactarnos. Hemos recibido tu información y nos
              pondremos en contacto contigo muy pronto.
            </p>
            <div className="feedback-details">
              <p>
                Nuestro equipo revisará tu solicitud y te responderá en un plazo
                máximo de 24 horas.
              </p>
            </div>
            <div className="countdown">
              <small>
                Esta página se reseteará automáticamente en 10 segundos...
              </small>
            </div>
          </div>
        </div>
      )}

      {/* FORM REPLACED BY ERROR FEEDBACK */}
      {isError && (
        <div className="feedback-screen error">
          <div className="feedback-content">
            <div className="feedback-icon">❌</div>
            <h2>Error al enviar el formulario</h2>
            <p>Lo sentimos, ha ocurrido un error al procesar tu solicitud.</p>
            <div className="feedback-details">
              <p>
                Por favor, verifica tu conexión a internet e inténtalo de nuevo.
                Si el problema persiste, puedes contactarnos directamente.
              </p>
            </div>
            <div className="countdown">
              <small>Podrás intentar de nuevo en 8 segundos...</small>
            </div>
          </div>
        </div>
      )}

      {/* NORMAL FORM - ONLY SHOWN WHEN NO SUCCESS/ERROR */}
      {!isSuccess && !isError && (
        <>
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

                <div className="form-grid">
                  {/* How did you know - Full width */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[13] = el) as any}
                  >
                    <CustomSelect
                      label="¿Cómo nos conociste? *"
                      error={errors.howDidYouKnow}
                      isLoading={isSubmitting}
                      options={[
                        { value: "Página web", label: "Página web" },
                        { value: "Redes Sociales", label: "Redes Sociales" },
                        { value: "Evento", label: "Evento" },
                        { value: "Chat", label: "Chat" },
                        {
                          value: "Referencia de cliente o fabricante",
                          label: "Referencia de cliente o fabricante",
                        },
                        { value: "Otro", label: "Otro" },
                      ]}
                      onChange={(value) => setValue("howDidYouKnow", value)}
                      onBlur={() => trigger("howDidYouKnow")}
                      value={watch("howDidYouKnow")}
                    />
                  </div>
                  {/* Company Name - Full width */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[0] = el) as any}
                  >
                    <CustomInput
                      label="Razón social *"
                      placeholder="Nombre de la empresa"
                      error={errors.company}
                      isLoading={isSubmitting}
                      {...register("company", {
                        required: "La razón social es obligatoria",
                        minLength: {
                          value: 2,
                          message: "Debe tener al menos 2 caracteres",
                        },
                      })}
                    />
                  </div>

                  {/* CIF - Compact */}
                  <div
                    className="form-group compact"
                    ref={(el) => (formGroupRefs.current[1] = el) as any}
                  >
                    <CustomInput
                      label="CIF / NIF *"
                      placeholder="B12345678"
                      error={errors.cif}
                      isLoading={isSubmitting}
                      {...register("cif", {
                        required: "El CIF/NIF es obligatorio",
                        minLength: {
                          value: 9,
                          message: "Debe tener 9 caracteres",
                        },
                      })}
                    />
                  </div>

                  {/* Phone - Compact */}
                  <div
                    className="form-group compact"
                    ref={(el) => (formGroupRefs.current[2] = el) as any}
                  >
                    <CustomInput
                      label="Teléfono *"
                      type="tel"
                      placeholder="600000000"
                      error={errors.phone}
                      isLoading={isSubmitting}
                      {...register("phone", {
                        required: "El teléfono es obligatorio",
                        pattern: {
                          value: /^[6-9][0-9]{8}$/,
                          message: "Formato: 600000000 (9 dígitos)",
                        },
                      })}
                    />
                  </div>

                  {/* Address - Full width */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[3] = el) as any}
                  >
                    <CustomInput
                      label="Dirección fiscal *"
                      placeholder="Calle, número, piso"
                      error={errors.address}
                      isLoading={isSubmitting}
                      {...register("address", {
                        required: "La dirección fiscal es obligatoria",
                        minLength: {
                          value: 5,
                          message: "Debe tener al menos 5 caracteres",
                        },
                      })}
                    />
                  </div>

                  {/* City */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[4] = el) as any}
                  >
                    <CustomInput
                      label="Población *"
                      placeholder="Ciudad"
                      error={errors.city}
                      isLoading={isSubmitting}
                      {...register("city", {
                        required: "La población es obligatoria",
                        minLength: {
                          value: 2,
                          message: "Debe tener al menos 2 caracteres",
                        },
                      })}
                    />
                  </div>

                  {/* Postal Code - Compact */}
                  <div
                    className="form-group compact"
                    ref={(el) => (formGroupRefs.current[5] = el) as any}
                  >
                    <CustomInput
                      label="Código postal *"
                      placeholder="28001"
                      error={errors.postalCode}
                      isLoading={isSubmitting}
                      {...register("postalCode", {
                        required: "El código postal es obligatorio",
                        pattern: {
                          value: /^[0-9]{5}$/,
                          message: "Debe tener exactamente 5 dígitos",
                        },
                      })}
                    />
                  </div>

                  {/* Province */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[6] = el) as any}
                  >
                    <CustomInput
                      label="Provincia *"
                      placeholder="Provincia"
                      error={errors.province}
                      isLoading={isSubmitting}
                      {...register("province", {
                        required: "La provincia es obligatoria",
                        minLength: {
                          value: 2,
                          message: "Debe tener al menos 2 caracteres",
                        },
                      })}
                    />
                  </div>

                  {/* Email - Full width */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[7] = el) as any}
                  >
                    <CustomInput
                      label="Correo electrónico *"
                      type="email"
                      placeholder="empresa@ejemplo.com"
                      error={errors.email}
                      isLoading={isSubmitting}
                      {...register("email", {
                        required: "El correo electrónico es obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Correo electrónico inválido",
                        },
                      })}
                    />
                  </div>
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

                <div className="form-grid">
                  {/* First Name */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[8] = el) as any}
                  >
                    <CustomInput
                      label="Nombre *"
                      placeholder="Nombre"
                      error={errors.firstName}
                      isLoading={isSubmitting}
                      {...register("firstName", {
                        required: "El nombre es obligatorio",
                        minLength: {
                          value: 2,
                          message: "Debe tener al menos 2 caracteres",
                        },
                      })}
                    />
                  </div>

                  {/* Last Name */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[9] = el) as any}
                  >
                    <CustomInput
                      label="Apellidos *"
                      placeholder="Apellidos"
                      error={errors.lastName}
                      isLoading={isSubmitting}
                      {...register("lastName", {
                        required: "Los apellidos son obligatorios",
                        minLength: {
                          value: 2,
                          message: "Debe tener al menos 2 caracteres",
                        },
                      })}
                    />
                  </div>

                  {/* Contact Phone - Compact */}
                  <div
                    className="form-group compact"
                    ref={(el) => (formGroupRefs.current[10] = el) as any}
                  >
                    <CustomInput
                      label="Teléfono móvil / fijo *"
                      type="tel"
                      placeholder="600000000"
                      error={errors.contactPhone}
                      isLoading={isSubmitting}
                      {...register("contactPhone", {
                        required: "El teléfono de contacto es obligatorio",
                        pattern: {
                          value: /^[6-9][0-9]{8}$/,
                          message: "Formato: 600000000 (9 dígitos)",
                        },
                      })}
                    />
                  </div>

                  {/* Contact Email */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[11] = el) as any}
                  >
                    <CustomInput
                      label="Correo electrónico *"
                      type="email"
                      placeholder="contacto@ejemplo.com"
                      error={errors.contactEmail}
                      isLoading={isSubmitting}
                      {...register("contactEmail", {
                        required: "El correo de contacto es obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Correo electrónico inválido",
                        },
                      })}
                    />
                  </div>

                  {/* Administration - Full width */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[12] = el) as any}
                  >
                    <CustomInput
                      label="Administración (nombre + e-mail) *"
                      placeholder="Nombre administrador + email@ejemplo.com"
                      error={errors.administration}
                      isLoading={isSubmitting}
                      {...register("administration", {
                        required:
                          "Los datos de administración son obligatorios",
                        minLength: {
                          value: 10,
                          message: "Debe incluir nombre y email",
                        },
                      })}
                    />
                  </div>
                </div>

                <div className="form-navigation">
                  <SecondaryButton
                    lightBg
                    type="button"
                    onClick={prevStep}
                    className="prev-btn"
                  >
                    Anterior
                  </SecondaryButton>
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

                <div className="form-grid">
                  {/* How did you know - Full width */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[13] = el) as any}
                  >
                    <CustomSelect
                      label="¿Cómo nos conociste? *"
                      error={errors.howDidYouKnow}
                      isLoading={isSubmitting}
                      options={[
                        { value: "Página web", label: "Página web" },
                        { value: "Redes Sociales", label: "Redes Sociales" },
                        { value: "Evento", label: "Evento" },
                        { value: "Chat", label: "Chat" },
                        {
                          value: "Referencia de cliente o fabricante",
                          label: "Referencia de cliente o fabricante",
                        },
                        { value: "Otro", label: "Otro" },
                      ]}
                      onChange={(value) => setValue("howDidYouKnow", value)}
                      onBlur={() => trigger("howDidYouKnow")}
                      value={watch("howDidYouKnow")}
                    />
                  </div>

                  {/* Terms and conditions - Full width */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[14] = el) as any}
                  >
                    <CustomCheckbox
                      label="Acepto los términos y condiciones *"
                      {...register("acceptTerms", {
                        validate: (value) =>
                          value === true ||
                          "Debes aceptar los términos y condiciones",
                      })}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        if (e.target.checked) {
                          clearErrors("acceptTerms");
                        }
                      }}
                    />
                    {errors.acceptTerms && (
                      <span className="error-message">
                        {errors.acceptTerms.message}
                      </span>
                    )}
                  </div>

                  {/* Signature - Full width */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[15] = el) as any}
                  >
                    <SignatureCanvas
                      onSignatureChange={(signature) => {
                        setSignatureData(signature);
                        setValue("signature", signature);
                        if (signature) {
                          clearErrors("signature");
                        }
                      }}
                      error={errors.signature?.message}
                    />
                    {/* Hidden input for form validation */}
                    <input
                      type="hidden"
                      {...register("signature", {
                        required: "La firma es obligatoria",
                      })}
                    />
                  </div>
                </div>

                <h4>Información del firmante</h4>

                <div className="form-grid">
                  {/* Signer Name */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[16] = el) as any}
                  >
                    <CustomInput
                      label="Nombre del firmante *"
                      placeholder="Nombre del firmante"
                      error={errors.signerName}
                      isLoading={isSubmitting}
                      {...register("signerName", {
                        required: "El nombre del firmante es obligatorio",
                        minLength: {
                          value: 2,
                          message: "Debe tener al menos 2 caracteres",
                        },
                      })}
                    />
                  </div>

                  {/* Signer Position */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[17] = el) as any}
                  >
                    <CustomInput
                      label="Cargo del firmante *"
                      placeholder="Director, Gerente, etc."
                      error={errors.signerPosition}
                      isLoading={isSubmitting}
                      {...register("signerPosition", {
                        required: "El cargo del firmante es obligatorio",
                        minLength: {
                          value: 3,
                          message: "Debe tener al menos 3 caracteres",
                        },
                      })}
                    />
                  </div>
                </div>

                <div className="form-navigation">
                  <SecondaryButton
                    lightBg
                    type="button"
                    onClick={prevStep}
                    className="prev-btn"
                  >
                    Anterior
                  </SecondaryButton>
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
        </>
      )}
    </div>
  );
};

export default ZohoContactForm;

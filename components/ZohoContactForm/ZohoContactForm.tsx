"use client";

import React, { useRef, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton/SecondaryButton";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import CustomSelect from "@/components/ui/CustomSelect/CustomSelect";
import CustomFileUpload from "@/components/CustomFileUpload/CustomFileUpload";
import {
  animateFormGroups,
  animateSuccess,
  animateError,
} from "@/utils/animations/form-anim";
import { useFormSteps } from "@/hooks/useFormSteps";

import "./ZohoContactForm.scss";
import { IoIosSend } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

interface ContactFormInputs {
  // Paso 1 - Información personal
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  howDidYouKnow: string;

  // Paso 2 - Servicios de interés (múltiple selección)
  servicios: string[];
  otrosDetalles?: string; // Optional - only when "Otros" is selected
  message?: string; // Optional

  // Paso 3 - Archivos adjuntos (optional)
  attachments?: File[]; // File attachments
}

const ZohoContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const formGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showOtrosInput, setShowOtrosInput] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

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

  // Handle service selection
  const handleServiceChange = (serviceId: string, checked: boolean) => {
    let updatedServices;
    if (checked) {
      updatedServices = [...selectedServices, serviceId];
    } else {
      updatedServices = selectedServices.filter((id) => id !== serviceId);
    }
    setSelectedServices(updatedServices);
    setValue("servicios", updatedServices);

    // Show/hide "Otros" input field
    if (serviceId === "otros") {
      setShowOtrosInput(checked);
      if (!checked) {
        setValue("otrosDetalles", "");
      }
    }
  };

  // Handle file changes
  const handleFilesChange = (files: File[]) => {
    setAttachedFiles(files);
    setValue("attachments", files);
  };

  // Reset form completely
  const resetFormCompletely = () => {
    reset();
    setCurrentStep(1);
    setSelectedServices([]);
    setShowOtrosInput(false);
    setAttachedFiles([]);
    setIsSuccess(false);
    setIsError(false);
  };

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    console.log("=== FORM SUBMISSION STARTED ===");

    // Create FormData for file upload
    const formData = new FormData();

    // Add regular form fields
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("howDidYouKnow", data.howDidYouKnow);
    formData.append("servicios", JSON.stringify(selectedServices));

    if (data.otrosDetalles) {
      formData.append("otrosDetalles", data.otrosDetalles);
    }

    if (data.message) {
      formData.append("message", data.message);
    }

    // Add files
    attachedFiles.forEach((file, index) => {
      formData.append(`attachment_${index}`, file);
    });

    formData.append("attachmentCount", attachedFiles.length.toString());

    console.log("Form data prepared with", attachedFiles.length, "files");

    try {
      console.log("=== SENDING REQUEST TO API ===");
      const response = await fetch("/api/submit-to-zoho", {
        method: "POST",
        body: formData, // No Content-Type header - let browser set it with boundary
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

      // Set success state
      setIsSuccess(true);
      setIsError(false);

      // Success animation
      if (formRef.current) {
        animateSuccess(formRef.current);
      }

      // Auto-reset after 10 seconds
      setTimeout(() => {
        resetFormCompletely();
      }, 10000);
    } catch (error) {
      console.log("=== ERROR OCCURRED ===");
      console.error("Full error:", error);

      // Set error state
      setIsError(true);
      setIsSuccess(false);

      // Error shake animation
      if (formRef.current) {
        animateError(formRef.current);
      }

      // Clear error state after 8 seconds
      setTimeout(() => {
        setIsError(false);
      }, 8000);
    }
  };

  return (
    <div
      className={`contact-form-wrapper ${
        isSuccess || isError ? "feedback-active" : ""
      }`}
    >
      {/* SUCCESS FEEDBACK */}
      {isSuccess && (
        <div className="feedback-screen success">
          <div className="feedback-content">
            <div className="feedback-icon">
              <FaCheck />
            </div>
            <h2>¡Mensaje enviado exitosamente!</h2>
            <p>
              Gracias por contactarnos. Hemos recibido tu consulta
              {attachedFiles.length > 0 &&
                ` y ${attachedFiles.length} archivo${
                  attachedFiles.length > 1 ? "s" : ""
                } adjunto${attachedFiles.length > 1 ? "s" : ""}`}
              . Nos pondremos en contacto contigo muy pronto.
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

      {/* ERROR FEEDBACK */}
      {isError && (
        <div className="feedback-screen error">
          <div className="feedback-content">
            <div className="feedback-icon">
              <RxCross2 />
            </div>
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

      {/* NORMAL FORM */}
      {!isSuccess && !isError && (
        <>
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress-steps">
              <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                <span>1</span>
                <label>Tus datos</label>
              </div>
              <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                <span>2</span>
                <label>¿Cómo podemos ayudarte?</label>
              </div>
              <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                <span>3</span>
                <label>Archivos adjuntos</label>
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
            {/* STEP 1 - PERSONAL DATA */}
            {currentStep === 1 && (
              <div className="form-step">
                <h3>Cuéntanos sobre ti</h3>

                <div className="form-grid">
                  {/* First Name */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[0] = el) as any}
                  >
                    <CustomInput
                      label="Nombre *"
                      placeholder="Tu nombre"
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
                    ref={(el) => (formGroupRefs.current[1] = el) as any}
                  >
                    <CustomInput
                      label="Apellidos *"
                      placeholder="Tus apellidos"
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

                  {/* Phone */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[2] = el) as any}
                  >
                    <CustomInput
                      label="Teléfono *"
                      type="tel"
                      placeholder="600 000 000"
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

                  {/* Email */}
                  <div
                    className="form-group"
                    ref={(el) => (formGroupRefs.current[3] = el) as any}
                  >
                    <CustomInput
                      label="Correo electrónico *"
                      type="email"
                      placeholder="tu@email.com"
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

                  {/* How did you know us */}
                  <div
                    className="form-group full-width"
                    ref={(el) => (formGroupRefs.current[4] = el) as any}
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

            {/* STEP 2 - SERVICES */}
            {currentStep === 2 && (
              <div className="form-step">
                <h3>¿En qué podemos ayudarte?</h3>
                <p className="step-description">
                  Selecciona todos los servicios que te interesen:
                </p>

                <div className="services-grid">
                  <div className="form-group full-width">
                    <div className="services-checkboxes">
                      <CustomCheckbox
                        label="Consultoría"
                        onChange={(e) =>
                          handleServiceChange("consultoria", e.target.checked)
                        }
                        checked={selectedServices.includes("consultoria")}
                      />

                      <CustomCheckbox
                        label="Diseño de Interiores"
                        onChange={(e) =>
                          handleServiceChange(
                            "diseno-de-interiores",
                            e.target.checked
                          )
                        }
                        checked={selectedServices.includes(
                          "diseno-de-interiores"
                        )}
                      />

                      <CustomCheckbox
                        label="Fabricación e Impresión"
                        onChange={(e) =>
                          handleServiceChange(
                            "fabricacion-impresion",
                            e.target.checked
                          )
                        }
                        checked={selectedServices.includes(
                          "fabricacion-impresion"
                        )}
                      />

                      <CustomCheckbox
                        label="Montaje y Mantenimiento"
                        onChange={(e) =>
                          handleServiceChange(
                            "montaje-mantenimiento",
                            e.target.checked
                          )
                        }
                        checked={selectedServices.includes(
                          "montaje-mantenimiento"
                        )}
                      />

                      <CustomCheckbox
                        label="Comunicación"
                        onChange={(e) =>
                          handleServiceChange("comunicacion", e.target.checked)
                        }
                        checked={selectedServices.includes("comunicacion")}
                      />

                      <CustomCheckbox
                        label="Eventos"
                        onChange={(e) =>
                          handleServiceChange("eventos", e.target.checked)
                        }
                        checked={selectedServices.includes("eventos")}
                      />

                      <CustomCheckbox
                        label="Otros"
                        onChange={(e) =>
                          handleServiceChange("otros", e.target.checked)
                        }
                        checked={selectedServices.includes("otros")}
                      />
                    </div>

                    {selectedServices.length === 0 && (
                      <span className="error-message">
                        Por favor, selecciona al menos un servicio
                      </span>
                    )}
                  </div>

                  {/* Conditional "Otros" input */}
                  {showOtrosInput && (
                    <div className="form-group full-width otros-details">
                      <CustomInput
                        label="Especifica otros servicios *"
                        placeholder="Describe qué otros servicios necesitas..."
                        error={errors.otrosDetalles}
                        isLoading={isSubmitting}
                        multiline={true}
                        rows={3}
                        {...register("otrosDetalles", {
                          required: selectedServices.includes("otros")
                            ? "Por favor, especifica qué otros servicios necesitas"
                            : false,
                          minLength: {
                            value: 5,
                            message: "Debe tener al menos 5 caracteres",
                          },
                        })}
                      />
                    </div>
                  )}
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
                    disabled={selectedServices.length === 0}
                    className="next-btn"
                  >
                    Siguiente
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* STEP 3 - FILE ATTACHMENTS */}
            {currentStep === 3 && (
              <div className="form-step">
                {/* Show loading content when submitting */}
                {isSubmitting ? (
                  <div className="submitting-content">
                    <div className="submitting-icon">
                      <IoIosSend />
                    </div>
                    <h4>Procesando tu consulta...</h4>
                    <p>Estamos enviando tu información y archivos adjuntos.</p>
                  </div>
                ) : (
                  <>
                    <h3>Archivos adjuntos</h3>
                    <p className="step-description">
                      Si tienes documentos, planos, imágenes de referencia o
                      cualquier material que pueda ayudarnos a entender mejor tu
                      proyecto, puedes adjuntarlos aquí. Este paso es opcional.
                    </p>
                    <div className="form-grid">
                      <div
                        className="form-group full-width"
                        ref={(el) => (formGroupRefs.current[8] = el) as any}
                      >
                        <CustomFileUpload
                          label="Documentos del proyecto (opcional)"
                          files={attachedFiles}
                          onFilesChange={handleFilesChange}
                          isLoading={isSubmitting}
                          maxFiles={5}
                          maxSizePerFile={10}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.dwg,.zip,.rar"
                        />
                      </div>
                    </div>

                    <br />

                    {/* Message section */}
                    <div className="message-section">
                      <div
                        className="form-group full-width"
                        ref={(el) => (formGroupRefs.current[9] = el) as any}
                      >
                        <CustomInput
                          label="Mensaje (opcional)"
                          placeholder="Cuéntanos más sobre tu proyecto, adjunta archivos si lo necesitas y cualquier detalle adicional..."
                          error={errors.message}
                          isLoading={isSubmitting}
                          multiline={true}
                          rows={4}
                          {...register("message", {
                            minLength: {
                              value: 10,
                              message: "Debe tener al menos 10 caracteres",
                            },
                          })}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="form-navigation">
                  <SecondaryButton
                    lightBg
                    type="button"
                    onClick={prevStep}
                    className="prev-btn"
                    disabled={isSubmitting}
                  >
                    Anterior
                  </SecondaryButton>
                  <PrimaryButton
                    type="submit"
                    isLoading={isSubmitting}
                    className="submit-btn"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Consulta"}
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

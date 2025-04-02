import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { gsap } from "gsap";

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface UseContactFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  toEmail?: string;
}

export const useContactForm = ({
  onSuccess,
  onError,
  toEmail = "hola@dospordosgrupoimagen.com",
}: UseContactFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      setIsSubmitting(true);

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: toEmail,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Mensaje enviado exitosamente");
      reset();

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Error al enviar el mensaje");
      console.error("Error de envío:", error);

      // Call onError callback if provided
      if (onError) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to animate form elements
  const animateForm = (formRef: React.RefObject<HTMLFormElement>) => {
    if (formRef.current) {
      // Make sure form is visible first
      gsap.set(formRef.current.querySelectorAll(".form-group"), {
        opacity: 0,
        y: 30,
      });

      // Then animate with a slight delay
      gsap.to(formRef.current.querySelectorAll(".form-group"), {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.3,
      });

      // Animate submit button separately
      gsap.fromTo(
        formRef.current.querySelector(".submit-btn"),
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: 0.8,
          ease: "back.out(1.7)",
        }
      );
    }
  };

  // Function to animate successful submission
  const animateSuccess = (formRef: React.RefObject<HTMLFormElement>) => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 0 },
        {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    animateForm,
    animateSuccess,
  };
};

export default useContactForm;

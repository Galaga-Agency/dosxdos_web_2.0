import { useState } from "react";

export const useFormSteps = (trigger: any) => {
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = async (step: number) => {
    const fieldsMap = {
      1: [
        "company",
        "cif",
        "address",
        "city",
        "postalCode",
        "province",
        "phone",
        "email",
      ],
      2: [
        "firstName",
        "lastName",
        "contactPhone",
        "contactEmail",
        "administration",
      ],
      3: [
        "howDidYouKnow",
        "acceptTerms",
        "signature",
        "signerName",
        "signerPosition",
      ],
    };

    return await trigger(fieldsMap[step as keyof typeof fieldsMap]);
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

  return { currentStep, nextStep, prevStep, setCurrentStep };
};

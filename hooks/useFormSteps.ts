import { useState } from "react";

export const useFormSteps = (trigger: any) => {
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = async (step: number) => {
    const fieldsMap = {
      1: ["firstName", "lastName", "phone", "email", "howDidYouKnow"],
      2: [
        // No mandatory fields for step 2 - only service selection is required but handled separately
      ],
      3: [
        // No mandatory fields for step 3 - file upload is optional
      ],
    };

    return await trigger(fieldsMap[step as keyof typeof fieldsMap]);
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3)); // Changed from 2 to 3
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return { currentStep, nextStep, prevStep, setCurrentStep };
};

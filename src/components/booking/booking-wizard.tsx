"use client";

import { motion } from "framer-motion";

interface BookingWizardProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

const stepTitles = [
  "Select Service",
  "Choose Date & Time",
  "Your Details",
  "Confirmation",
];

export function BookingWizard({
  currentStep,
  totalSteps,
  children,
}: BookingWizardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex items-center gap-3">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    step <= currentStep ? "#9C8974" : "#E5E7EB",
                  scale: step === currentStep ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
              >
                {step}
              </motion.div>
              {step < totalSteps && (
                <div
                  className={`w-12 h-1 rounded transition-colors duration-300 ${
                    step < currentStep ? "bg-[#9C8974]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-lg font-medium text-[#1A1A1A]">
          {stepTitles[currentStep - 1]}
        </p>
      </div>

      {/* Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

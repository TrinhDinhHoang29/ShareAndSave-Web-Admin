import React from "react";
import { Check } from "lucide-react";

type StepProps = {
  currentStep: number; // 1–3
};

const steps = [
  // { number: 1, label: "Thông tin cá nhân" },
  { number: 1, label: "Loại bài đăng" },
  { number: 2, label: "Thông tin bài đăng" },
];

export const StepProgress: React.FC<StepProps> = ({ currentStep }) => {
  return (
    <div className="w-full mb-8">
      {/* Step Indicators */}
      <div className="flex w-full items-center justify-between relative z-10">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 -z-10">
                  <div className="absolute w-full h-full bg-gray-200 dark:bg-zinc-700 rounded" />
                  <div
                    className={`absolute h-full bg-blue-600 rounded transition-all duration-500 ease-out`}
                    style={{
                      width: currentStep > step.number ? "100%" : "0%",
                    }}
                  />
                </div>
              )}

              {/* Step Circle */}
              <div className="relative">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                    isCompleted
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : isCurrent
                      ? "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100"
                      : "bg-white text-gray-400 border-gray-300 dark:bg-zinc-800 dark:border-zinc-600 dark:text-gray-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>

                {/* Ping effect */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
                )}
              </div>

              {/* Label */}
              <div className="mt-3 text-center text-sm font-medium">
                <span
                  className={`${
                    isCompleted || isCurrent
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

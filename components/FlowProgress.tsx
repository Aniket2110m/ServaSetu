interface FlowProgressProps {
  title: string;
  currentStep: 1 | 2 | 3 | 4;
}

const steps = [
  "Select Service",
  "Schedule",
  "Address",
  "Payment",
];

export default function FlowProgress({ title, currentStep }: FlowProgressProps) {
  const totalSteps = steps.length;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="px-6 md:px-8 py-12 mb-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl shadow-xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <span className="text-sm font-bold text-white">{Math.round(progressPercent)}% Complete</span>
        </div>

        <div className="relative h-2 w-full rounded-full bg-white/30">
          <div className="absolute h-full rounded-full bg-white" style={{ width: `${progressPercent}%` }}></div>
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-400 shadow-md"
            style={{ left: `calc(${progressPercent}% - 8px)` }}
          ></div>
        </div>

        <div className="grid grid-cols-4 w-full text-[11px] font-bold uppercase tracking-wider text-white/80">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCurrent = stepNumber === currentStep;
            const isLast = stepNumber === totalSteps;

            return (
              <div
                key={step}
                className={`${isCurrent ? "text-white" : "text-white/60"} ${
                  isLast ? "text-right" : "px-4 first:px-0"
                }`}
              >
                {stepNumber}. {step}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
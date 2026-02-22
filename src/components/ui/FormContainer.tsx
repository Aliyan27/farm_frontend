import type { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  Header: {
    title: string;
    desc: string;
  };
  Body: {
    title: string;
    desc: string;
  };
  Footer: {
    title: string;
  };
}

const FormContainer = (props: FormContainerProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        {/* Header / Title Section */}
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {props.Header.title}{" "}
          </h1>
          <p className="text-muted-foreground text-lg">{props.Header.desc}</p>
        </div>

        {/* Main Card */}
        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="border-b bg-muted/40 px-6 py-5">
            <h2 className="text-xl font-semibold">{props.Body.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {props.Body.desc}
            </p>
          </div>

          {/* Form Container */}
          <div className="p-6 md:p-8">{props.children}</div>
        </div>

        {/* Footer hint */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          {props.Footer.title}
        </p>
      </div>
    </div>
  );
};

export default FormContainer;

import { useEffect, useState } from "react";
import InitiateRoute from "./routes";
import { Loader } from "lucide-react";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token?.trim()) {
      globalThis.authToken = token.trim();
    }

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
        <div className="relative">
          <Loader className="h-20 w-20 animate-[spin_1s_linear_infinite] text-primary" />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
        </div>
        <p className="mt-6 text-lg font-medium text-muted-foreground">
          Initializing Farm Dashboard...
        </p>
      </div>
    );
  }

  return <InitiateRoute />;
}

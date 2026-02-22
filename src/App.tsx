import { useEffect, useState } from "react";
import InitiateRoute from "./routes";
import { Loader } from "lucide-react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      globalThis.authToken = storedToken;
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <InitiateRoute />
    </>
  );
}

export default App;

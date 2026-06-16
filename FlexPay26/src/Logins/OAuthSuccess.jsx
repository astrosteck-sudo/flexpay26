import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function OAuthSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      window.location.href = "/";
    }
  }, []);

  return <p className="discord-div">Logging in...</p>;
}
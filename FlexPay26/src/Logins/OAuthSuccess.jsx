import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function OAuthSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const user = JSON.parse(
      decodeURIComponent(params.get("user"))
    );

    console.log('token', token)
    console.log('user', user)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/";
  }, []);

  return <div className="discord-div">Signing you in...</div>;
}
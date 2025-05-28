"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import "./login-page.scss";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import Footer from "@/components/layout/Footer/footer";

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  // Create refs for the inputs
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [status, router]);

  const onSubmit = async (data: LoginFormValues) => {
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      if (res?.ok) {
        window.location.href = "/admin";
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ocurrió un error durante el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  // Get the props from React Hook Form's register
  const usernameRegister = register("username", {
    required: "El nombre de usuario es requerido",
  });
  const passwordRegister = register("password", {
    required: "La contraseña es requerida",
  });

  return (
    <>
      {" "}
      <div className="login-page">
        <div className="login-container">
          <h1>Iniciar Sesión</h1>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label="Nombre de Usuario"
              type="text"
              name={usernameRegister.name}
              onChange={usernameRegister.onChange}
              onBlur={usernameRegister.onBlur}
              inputRef={usernameRegister.ref}
              error={errors.username}
              isLoading={loading}
              placeholder="Nombre de usuario"
            />

            <CustomInput
              label="Contraseña"
              type="password"
              name={passwordRegister.name}
              onChange={passwordRegister.onChange}
              onBlur={passwordRegister.onBlur}
              inputRef={passwordRegister.ref}
              error={errors.password}
              isLoading={loading}
              placeholder="******"
            />

            <PrimaryButton type="submit" fullWidth disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </PrimaryButton>
          </form>
        </div>
      </div>
      <Footer />{" "}
    </>
  );
}

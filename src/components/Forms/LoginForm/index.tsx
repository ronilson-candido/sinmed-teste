"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import usePasswordToggle from "@/hooks/usePasswordToggle";
import { formatStringAsNumber } from "@/utils/number-format";
import { toast, Toaster } from "sonner";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  scope: string;
}

export default function LoginForm() {
  const { InputType, Icon, toggleVisibility } = usePasswordToggle();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: cpf,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        document.cookie = `token={token}; path=/;`;
        const decodedToken: DecodedToken = jwtDecode(token);
        const userRole = decodedToken.scope;

        switch (userRole) {
          case "ROLE_ADMIN":
            router.push("/auth/admin");
            break;
          case "ROLE_AFFILIATE":
            router.push("/auth/filiado");
            break;
          case "ROLE_JURIDICAL":
            router.push("/auth/juridico");
            break;
          case "ROLE_MARKETING":
            router.push("/auth/marketing");
            break;
          default:
            router.push("/login");
            break;
        }
      } else {
        toast.error("Credenciais Inválidas! Tente novamente.", {
          style: {
            backgroundColor: "#9c1515",
          },
        });
        console.error("Erro no login:", data.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className={styles.loginArea}>
      <h2>Login</h2>
      <div className={styles.separator}></div>
      <p>Informe seus dados para entrar</p>

      <Toaster
        richColors
        toastOptions={{
          style: {
            color: "white",
          },
        }}
        position="top-right"
      />
      <form onSubmit={handleLogin}>
        <div className={styles.cpfInput}>
          <h3>CPF</h3>
          <input
            autoComplete="off"
            type="text"
            id="cpf"
            value={cpf}
            placeholder="Digite seu CPF"
            maxLength={11}
            onChange={(e) => setCpf(formatStringAsNumber(e.target.value))}
          />
        </div>
        <div className={styles.passwordInput}>
          <h3>Senha</h3>
          <input
            type={InputType}
            autoComplete="off"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={toggleVisibility}>
            <Icon />
          </span>
        </div>
        <a>Esqueceu a senha?</a>
        <button className={styles.loginBtn} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

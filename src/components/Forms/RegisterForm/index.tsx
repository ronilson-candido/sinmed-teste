"use client";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import BigFormField from "./_components/big-form-field";
import styles from "./styles.module.scss";
import SmallFormField from "./_components/small-form-field";
import { Check } from "lucide-react";
import {
  allowOnlyLetters,
  formatCEP,
  formatCPF,
  formatPhoneNumber,
  formatStringAsNumber,
} from "@/utils/number-format";

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, setValue, watch, getValues } = useForm();
  const [paymentData, setPaymentData] = useState<string[]>([]);
  const [crmFile, setCrmFile] = useState<string | null>(null);
  const [crmImage, setCrmImage] = useState<string | ArrayBuffer | null>(null);
  const [idImage, setIdImage] = useState<string | ArrayBuffer | null>(null);
  const [crmFileName, setCrmFileName] = useState<string | null>(null);
  const [idFileName, setIdFileName] = useState<string | null>(null);
  const [isCrmFileSelected, setIsCrmFileSelected] = useState(false);
  const [isIdFileSelected, setIsIdFileSelected] = useState(false);

  const [city, state, street, neighborhood, number, phone] = watch([
    "city",
    "state",
    "street",
    "neighborhood",
    "number",
    "phone",
  ]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name" || name === "issuingAgency" || name === "office") {
      setValue(name, allowOnlyLetters(value));
    } else if (name === "cpf") {
      setValue(name, formatCPF(value));
    } else if (name === "phone") {
      setValue(name, formatPhoneNumber(value));
    } else if (name === "cep") {
      setValue(name, formatCEP(value));
    } else if (name === "crm" || name === "companyRegistration") {
      setValue(name, formatStringAsNumber(value));
    } else {
      setValue(name, value);
    }
  };

  const handleCrmBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const data = new FileReader();
    data.onload = () => {
      const Base64String = data.result;
      setCrmImage(Base64String);
      setPaymentData((prev) => [...prev, Base64String as string]);
      setValue("crmFileInput", Base64String);
    };
    data.readAsDataURL(files[0]);
  };

  const handleIdBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const data = new FileReader();
    data.onload = () => {
      const Base64String = data.result;
      setIdImage(Base64String);
      setPaymentData((prev) => [...prev, Base64String as string]);
      setValue("idFileInput", Base64String);
    };
    data.readAsDataURL(files[0]);
  };

  const validateNextStep = () => {
    const values = getValues();

    if (currentStep === 1) {
      if (
        !values.name ||
        !values.email ||
        !values.password ||
        !values.duplicatedPassword ||
        !values.birthDate ||
        !values.cpf
      ) {
        toast.error("Preencha todos os campos.");
        return false;
      }

      if (values.password !== values.duplicatedPassword) {
        toast.error("As senhas não coincidem!", {
          style: {
            backgroundColor: "#9c1515",
          },
        });
        return false;
      }
    } else if (currentStep === 2) {
      if (
        !values.cep ||
        !values.phone ||
        !values.city ||
        !values.state ||
        !values.street ||
        !values.neighborhood ||
        !values.number
      ) {
        toast.error("Preencha todos os campos.");
        return false;
      }
    } else if (currentStep === 3) {
      if (
        !values.companyName ||
        !values.crm ||
        !values.companyRegistration ||
        !values.situation ||
        !values.office
      ) {
        toast.error("Preencha todos os campos.");
        return false;
      }
    }
    return true;
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);

    const submitData = {
      ...data,
      paymentData,
    };
    console.log(submitData);
  };

  const checkCEP = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!e.target.value) return;
    const cep = e.target.value.replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          toast.error("CEP inválido. Por favor, verifique e tente novamente.", {
            style: {
              backgroundColor: "#9c1515",
            },
          });

          return;
        }

        setValue("city", data.localidade);
        setValue("state", data.uf);
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
      })
      .catch(() => {
        toast.error("Erro ao buscar o CEP. Tente novamente mais tarde.");
      });
  };

  const nextStep = () => {
    if (validateNextStep()) {
      setCurrentStep((currentStep) => currentStep + 1);
    }
    const values = getValues();
    console.log(values);
  };

  const previousStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <div className={styles.registerArea}>
          <Toaster
            richColors
            toastOptions={{
              style: {
                background: "#9c1515",
                color: "white",
              },
            }}
            position="top-right"
          />
          <h2>Registro</h2>
          <div className={styles.separator}></div>
          {currentStep === 1 && (
            <>
              <p>Informe seus dados pessoais</p>
              <BigFormField
                label="Nome Completo"
                type="text"
                {...register("name")}
                onChange={handleChange}
              />
              <BigFormField
                label="Email"
                type="email"
                {...register("email")}
                onChange={handleChange}
              />
              <div className={styles.smallGrid}>
                <SmallFormField
                  label="Senha"
                  type="password"
                  {...register("password")}
                  onChange={handleChange}
                />
                <SmallFormField
                  label="Repita a senha"
                  type="password"
                  {...register("duplicatedPassword")}
                  onChange={handleChange}
                />
                <SmallFormField
                  label="Data de Nascimento"
                  type="date"
                  {...register("birthDate")}
                  onChange={handleChange}
                />
                <SmallFormField
                  label="CPF"
                  type="text"
                  {...register("cpf")}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <p>Dados adicionais</p>
              <div className={styles.smallGrid}>
                <SmallFormField
                  label="CEP"
                  type="text"
                  {...register("cep")}
                  onChange={handleChange}
                  onBlur={checkCEP}
                  max={9}
                />
                <SmallFormField
                  label="Telefone"
                  type="text"
                  {...register("phone")}
                  onChange={handleChange}
                />
                <SmallFormField
                  label="Cidade"
                  type="text"
                  value={city || ""}
                  {...register("city")}
                  onChange={handleChange}
                  readOnly={true}
                />
                <SmallFormField
                  label="Estado"
                  type="text"
                  value={state || ""}
                  {...register("state")}
                  onChange={handleChange}
                  readOnly={true}
                />
              </div>
              <BigFormField
                label="Rua"
                type="text"
                value={street || ""}
                {...register("street")}
                onChange={handleChange}
                readOnly={true}
              />
              <div className={styles.smallGrid}>
                <SmallFormField
                  label="Bairro"
                  type="text"
                  value={neighborhood || ""}
                  {...register("neighborhood")}
                  onChange={handleChange}
                  readOnly={true}
                />
                <SmallFormField
                  label="Número"
                  type="text"
                  {...register("number")}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <p>Informe seus dados médicos</p>
              <BigFormField
                label="Nome da Empresa"
                type="text"
                {...register("companyName")}
                onChange={handleChange}
              />
              <div className={styles.smallGrid}>
                <SmallFormField
                  label="CRM"
                  type="text"
                  {...register("crm")}
                  onChange={handleChange}
                />
                <SmallFormField
                  label="Matrícula"
                  type="text"
                  {...register("companyRegistration")}
                  onChange={handleChange}
                />
                <SmallFormField
                  label="Situação"
                  type="select"
                  {...register("situation")}
                  onChange={handleChange}
                  options={[
                    "Recém-formado",
                    "Residente",
                    "Médico Privado",
                    "Médico Estadual",
                  ]}
                />
                <SmallFormField
                  label="Cargo"
                  type="text"
                  {...register("office")}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {currentStep === 4 && (
            <>
              <p>Insira foto do seus documentos (Crm e ID)</p>
              <div className={styles.insertArea}>
                <div>
                  <h4>CRM</h4>
                  <input
                    id="crmFileInput"
                    type="file"
                    accept="image/*"
                    {...register("crmFileInput")}
                    onChange={handleCrmBase64}
                  />
                  <label
                    htmlFor="crmFileInput"
                    className={styles.customFileUpload}
                  >
                    Inserir
                  </label>
                  {crmImage && (
                    <span className={styles.firstSpan}>
                      <Check size={20} />
                    </span>
                  )}
                </div>
                <div>
                  <h4 className={styles.secondHeading}>ID</h4>
                  <input
                    type="file"
                    id="idFileInput"
                    accept="image/*"
                    {...register("idFileInput")}
                    onChange={handleIdBase64}
                  />
                  <label
                    htmlFor="idFileInput"
                    className={`${styles.customFileUpload} ${styles.firstLabel}`}
                  >
                    Inserir
                  </label>

                  {idImage && (
                    <span className={styles.secondSpan}>
                      <Check size={20} />
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.buttonGroup}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={previousStep}
              className={styles.prevButton}
            >
              Voltar
            </button>
          )}
          {currentStep < 4 && (
            <button
              type="button"
              onClick={nextStep}
              className={styles.nextButton}
            >
              Avançar
            </button>
          )}
          {currentStep == 4 && (
            <button type="submit" className={styles.finishButton}>
              Finalizar
            </button>
          )}
        </div>
      </form>
    </>
  );
}

"use client";

import React, { useState } from "react";

const convertFileToBase64 = (
  file: File,
  callback: (base64: string) => void
) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    if (reader.result) {
      callback(reader.result.toString());
    }
  };
  reader.readAsDataURL(file);
};

export default function NewsForm() {
  const [mainImageBase64, setMainImageBase64] = useState<string | null>(null);

  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      convertFileToBase64(file, (base64) => {
        setMainImageBase64(base64);
      });
    }
  };

  async function processForm(formData: FormData) {
    const title = formData.get("title");
    const body = formData.get("body");
    const mainImage = formData.get("mainImage") as File;
    const asideImages = formData.getAll("asideImages") as File[];

    console.log("Title:", title);
    console.log("Body:", body);
    console.log("Main Image base64:", mainImageBase64); // Aqui você deve obter a base64 do estado
    console.log("Aside images:", asideImages);
  }

  return (
    <div>
      <h2>Cadastrar Notícia</h2>
      <form action={processForm}>
        <div>
          <label>Título:</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea name="body" />
        </div>
        <div>
          <label>Imagem Principal:</label>
          <input
            type="file"
            name="mainImage"
            onChange={handleMainImageChange}
          />
        </div>
        <div>
          <label>Imagens Secundárias:</label>
          <input type="file" name="asideImages" multiple />
        </div>
        <div>
          <label>Imagem Principal em Base64:</label>
          <textarea
            readOnly
            value={mainImageBase64 ?? "Nenhuma imagem selecionada"}
            style={{ width: "100%", height: "150px" }}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

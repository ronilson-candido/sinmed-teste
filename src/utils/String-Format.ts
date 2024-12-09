export function Base64Format(base64: string | null) {
  if (!base64) {
    return "Nenhuma imagem selecionada!";
  }
  if (!base64.startsWith("data:image/jpeg;base64,")) {
    return base64.slice(22);
  }
  return base64.slice(23);
}


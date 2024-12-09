"use client";

export function formatCPF(value: string) {
  value = value.replace(/\D/g, "");
  value = value.substring(0, 11);

  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  }
  if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
  }
  return value;
}

export function formatCEP(value: string) {
  value = value.replace(/\D/g, "");
  value = value.substring(0, 8);

  if (value.length > 5) {
    value = value.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  }
  return value;
}

export function formatPhoneNumber(value: string) {
  value = value.replace(/\D/g, "");
  value = value.substring(0, 11);

  if (value.length > 6) {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1)$2-$3");
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1)$2");
  } else {
    value = value.replace(/(\d*)/, "($1");
  }

  return value;
}

export function formatStringAsNumber(value: string) {
  value = value.replace(/\D/g, "");
  return value;
}

export function allowOnlyLetters(value: string) {
  return value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
}

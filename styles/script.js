const texArea = document.getElementById("textarea_a");
const mensajeEncriptado = document.getElementById("textarea_b");
const btnCopiar = document.getElementById("btn__copiar");

const PATTERNS = [
  ['e', 'enter'],
  ['i', 'imes'],
  ['a', 'ai'],
  ['o', 'ober'],
  ['u', 'ufat']
];
function btnEncriptar() {
  const textoEncriptado = encriptar(texArea.value);
  mensajeEncriptado.value = textoEncriptado;
  texArea.value = "";
  mensajeEncriptado.style.backgroundImage = 'none';
  return;
}
function removeAccents(str) {
  return str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
}
function encriptar(stringEncriptado) {
  stringEncriptado = removeAccents(stringEncriptado);
  stringEncriptado = stringEncriptado.replace(/[^\w\s]/g, '');
  stringEncriptado = stringEncriptado.toLowerCase();
  PATTERNS.forEach(([char, replacement]) => {
    stringEncriptado = stringEncriptado.replace(new RegExp(char, 'g'), replacement);
  });
  return stringEncriptado;
}
function btnDesencriptar() {
  const textoEncriptado = desencriptar(texArea.value);
  mensajeEncriptado.value = textoEncriptado;
  texArea.value = "";
  return;
}
function desencriptar(stringDesencriptado) {
  stringDesencriptado = stringDesencriptado.toLowerCase();
  PATTERNS.forEach(([char, replacement]) => {
    stringDesencriptado = stringDesencriptado.replace(new RegExp(replacement, 'g'), char);
  });
  return stringDesencriptado;
}
function copyText() {
  const textarea = document.getElementById("textarea_b");
  const text = textarea.value;
  if (text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        textarea.value = "";
        alert("Texto copiado al portapapeles");
      })
      .catch((error) => {
        console.error("Error al copiar texto:", error);
      });
  } else {
    alert("No hay texto para copiar");
  }
}
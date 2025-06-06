// Fonction pour convertir un texte en SHA-1 (hachage)
async function sha1(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

document.getElementById("checkButton").addEventListener("click", async () => {
  const password = document.getElementById("passwordInput").value;
  const resultElement = document.getElementById("result");

  if (!password) {
    resultElement.textContent = "⚠️ Veuillez entrer un mot de passe.";
    return;
  }

  resultElement.textContent = "⏳ Vérification en cours...";

  const hashed = await sha1(password);
  const prefix = hashed.slice(0, 5);
  const suffix = hashed.slice(5);

  // Appel API HIBP (Have I Been Pwned)
  try {
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await response.text();

    const found = text.split("\n").some(line => {
      const [hashSuffix, count] = line.split(":");
      return hashSuffix === suffix;
    });

    resultElement.textContent = found
      ? "🔴 Ce mot de passe a été compromis !"
      : "🟢 Ce mot de passe n'a pas été trouvé dans les fuites.";
  } catch (error) {
    // En cas d'erreur lors de l'appel API
    
    resultElement.textContent = "❌ Erreur lors de la vérification.";

    console.error(error);

  }
});

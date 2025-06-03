// Fonction pour transformer un mot de passe en SHA-1 (hachage)
async function sha1(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex.toUpperCase();
}

// Fonction principale appelée au clic
async function verifierMotDePasse() {
  const password = document.getElementById("passwordInput").value.trim();
  const result = document.getElementById("result");

  if (!password) {
    result.textContent = "❌ Veuillez entrer un mot de passe.";
    return;
  }

  result.textContent = "⏳ Vérification en cours...";

  try {
    const hash = await sha1(password);
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    // Utilisation du proxy CORS fiable
   const response = await fetch(`https://api.allorigins.win/raw?url=https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await response.text();

    const lignes = text.split("\n");
    const compromis = lignes.some(line => {
      const [hashSuffix] = line.trim().split(":");
      return hashSuffix === suffix;
    });

    result.textContent = compromis
      ? "🔴 Ce mot de passe a été trouvé dans une fuite de données !"
      : "🟢 Ce mot de passe n'a pas été trouvé dans les fuites connues.";

  } catch (err) {
    console.error(err);
    result.textContent = "❌ Une erreur est survenue. Vérifie ta connexion ou relance en local.";
  }
}

// Événement bouton
document.getElementById("checkButton").addEventListener("click", verifierMotDePasse);
// Événement entrée clavier
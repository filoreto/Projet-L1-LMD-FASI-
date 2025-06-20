// Fonction pour hasher le mot de passe en SHA-1
async function sha1(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.toUpperCase();
}

// Fonction principale de vérification du mot de passe
async function verifierMotDePasse(){
  const password = document.getElementById("passwordInput").value.trim();
  const result = document.getElementById("result");

  if (!password) {
    result.textContent = "❌ Veuillez entrer un mot de passe.";
    return;
  }

  result.textContent = "Vérification en cours...";

  try {
    const hash = await sha1(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const response = await fetch(
      `https://api.allorigins.win/raw?url=https://api.pwnedpasswords.com/range/${prefix}`
    );
    const text = await response.text();

    const lignes = text.split("\n");
    const compromis = lignes.some((line) => {
      const [hashSuffix] = line.trim().split(":");
      return hashSuffix === suffix;
    });

    if (compromis) {
      const mdpFort = genererMotDePasse(12); // mot de passe généré
      result.innerHTML = `
         ${password} a été compromi dans une fuite des données !<br>
         Voici un mot de passe fort que vous pouvez utiliser :
        <br><input type="text" id="mdpGenere" value="${mdpFort}" readonly>
        <button onclick="copierMotDePasse()">Copier</button>
      `;
    } else {
      result.textContent =
        "Ce mot de passe n'a pas été trouvé dans les fuites connues.";
      result.style.color = "green";
    }
  } catch (err) {
    console.error(err);
    result.textContent =
      "❌ Une erreur est survenue. Vérifie ta connexion ou relance en local.";
  }
}

// Fonction pour générer un mot de passe fort
function genererMotDePasse(longueur = 12) {
  const majuscules = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minuscules = "abcdefghijklmnopqrstuvwxyz";
  const chiffres = "0123456789";
  const symboles = "!@#$%^&*()-_=+[]{}<>?/";

  const tous = majuscules + minuscules + chiffres + symboles;

  let motDePasse = "";
  for (let i = 0; i < longueur; i++) {
    const index = Math.floor(Math.random() * tous.length);
    motDePasse += tous[index];
  }

  return motDePasse;
}

// Fonction pour copier le mot de passe généré
function copierMotDePasse() {
  const champ = document.getElementById("mdpGenere");
  champ.select();
  champ.setSelectionRange(0, 99999); // compatibilité mobile
  document.execCommand("copy");
  alert(" Mot de passe copié !");
}

// Événement bouton vérification
document
  .getElementById("checkButton")
  .addEventListener("click", verifierMotDePasse);

 // Fonction pour générer un mot de passe fort
function genererMotDePasse(longueur = 16) {
  const majuscules = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minuscules = "abcdefghijklmnopqrstuvwxyz";
  const chiffres = "0123456789";
  const symboles = "!@#$%^&*()-_=+[]{}<>?/";

  const tous = majuscules + minuscules + chiffres + symboles;
  let motDePasse = "";

  for (let i = 0; i < longueur; i++) {
    const index = Math.floor(Math.random() * tous.length);
    motDePasse += tous[index];
  }

  return motDePasse;
}

// Quand on clique sur le bouton, un mot de passe est généré
function afficherMotDePasseGenere() {
  const mot = genererMotDePasse(16);
  const champ = document.getElementById("result");
  champ.innerHTML = `
    <p>Voici un mot de passe fort généré :</p>
    <input type="text" id="mdpGenere" value="${mot}" readonly>
    <button onclick="copierMotDePasse()"> Copier</button>
  `;
  champ.value = mot;
}

// Bouton pour copier le mot de passe
function copierMotDePasse() {
  const champ = document.getElementById("mdpGenere");
  champ.select();
  champ.setSelectionRange(0, 99999); // pour mobile
  document.execCommand("copy");
  alert("Mot de passe copié !");
}
 
  

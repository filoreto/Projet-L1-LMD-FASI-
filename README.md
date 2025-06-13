# 🔐 PassBook+

**PassBook+** est une application web simple et éducative qui permet à un utilisateur de :
- Vérifier si son mot de passe a déjà été compromis via des fuites de données (utilise l’API [Have I Been Pwned](https://haveibeenpwned.com/))
- Générer un mot de passe fort et sécurisé automatiquement si le sien est compromis
- Copier ce mot de passe en un clic

---

## 🚀 Fonctionnalités

- ✅ Vérification de mot de passe en temps réel (via hachage SHA-1 et API HIBP)
- 🔁 Génération automatique d’un mot de passe sécurisé 
- 📋 Bouton "Copier" pour utiliser facilement le mot de passe suggéré
- 💡 Interface simple, éducative et légère (HTML + JS pur)

---

## 🛠️ Technologies utilisées

- HTML5 / CSS3 (base simple)
- JavaScript (ES6)
- API [Have I Been Pwned – Pwned Passwords](https://haveibeenpwned.com/API/v3#PwnedPasswords)
- `crypto.subtle` pour le hachage SHA-1 dans le navigateur

---

## 💻 Démarrage rapide

1. **Cloner ce dépôt** ou télécharger le `.zip`
2. **Ouvrir le dossier avec Visual Studio Code**
3. **Lancer avec Live Server** (clic droit sur `index.html` → "Open with Live Server")

> ⚠️ L'application **doit être lancée sur un serveur local** (localhost) car `crypto.subtle.digest()` ne fonctionne pas en mode `file://`.

---


---

## 🔒 Limites connues

- Utilise un proxy public (`allorigins.win`) qui peut parfois être lent ou instable
- Pas de base de données : l’outil est volontairement simple et local
- Ne stocke rien, ne conserve rien (ce qui est bon pour la vie privée !)

---

## 🧠 Ce projet m’a permis d’apprendre :

- Le fonctionnement d’une API externe
- Le concept de hachage et de sécurité des mots de passe
- Le JavaScript moderne (`async`, `await`, `fetch`)
- L’interaction DOM + logique JS + retour utilisateur

---


## 🧑‍💻 Auteur

Projet réalisé par TETO FILORETO CHRISTIAN
L1 LMD FASI


---
Ce projet est open-source — tu peux le modifier, le partager ou t’en inspirer librement.

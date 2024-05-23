// Ci-dessous un booléan qui dira si le menu de la burger box s'affiche ou pas. Au départ, il ne s'affiche pas
let menuVisible = false;

// Ci-dessous la fonction qui fait basculer le menu de la burger box de visible à pas visible et inversement
function toggleMenu() {
  const menu = document.getElementById('menuContainer');
  menu.style.display = menuVisible ? 'none' : 'block';
  menuVisible = !menuVisible;
}

// Ci-dessous les définitions des 2 tableaux, de celui du jeu initial de 30 cartes, créé avec l'API
// Et le jeu du joueur, qui sera tiré au hasard des 30 cartes
let jeuInitial30Cartes = [];
let jeuJoueur = [];

let favoris = []; // Tableau pour stocker les identifiants des cartes favoris


// La fonction obtenirCartes va chercher les données dans l'url de l'API indiquée dans l'énoncé
// Celle-ci est appelée par afficherCartes
async function obtenirCartes() {
  const response = await fetch('https://hp-api.lainocs.fr/characters');
  return await response.json();
}

// afficherCartes affiche les 30 cartes, récupérées de l'API, au lancement de l'application
async function afficherCartes() {
  const charactersContainer = document.getElementById('characters');
  jeuInitial30Cartes = await obtenirCartes();

  jeuInitial30Cartes.forEach(character => {
    const card = creerCarte(character);
    charactersContainer.appendChild(card);
  });
}

// creerCarte créer l'élément HTML représentant une carte de personnages
// fonction appelée par afficherCartes (ci-dessus)
function creerCarte(character) {
  const card = document.createElement('div');
  card.classList.add('card');

  const { id, name, image, actor, house } = character;

  // Ceci vérifie si la carte est dans les favoris
  const isFavorite = favoris.includes(id);

  // Bouton pour ajouter ou retirer la carte des favoris
  const favoriteBtn = document.createElement('button');
  favoriteBtn.classList.add('favorite-btn');
  favoriteBtn.setAttribute('data-character-id', id);
  favoriteBtn.textContent = isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris';

  favoriteBtn.addEventListener('click', () => {
    toggleFavorite(id);
  });

  // UN coeur est créé pour afficher le symbole de favori
  const favoriteIcon = document.createElement('span');
  favoriteIcon.classList.add('favorite-icon');
  favoriteIcon.textContent = isFavorite ? '❤️' : ''; // Utilisez le symbole du cœur

  card.innerHTML = `
    <h2>${id} - ${name}</h2>
    <img src="${image}" alt="${name}">
    <div>
      <p><strong>Actor:</strong> ${actor}</p>
      <p><strong>House:</strong> ${house}</p>
    </div>
  `;

  // Bouton de favori et l'icône de favori à la carte
  card.appendChild(favoriteBtn);
  card.appendChild(favoriteIcon);

  return card;
}


// Ci-dessous la fonction qui tire aléatoirement 5 cartes, pour le joueur
async function tirerCartesJoueur() {
    jeuJoueur = [];
    let cartesRestantes = [...jeuInitial30Cartes];
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * cartesRestantes.length);
      const carteTiree = cartesRestantes.splice(index, 1)[0];
      jeuJoueur.push(carteTiree);
      jeuInitial30Cartes = jeuInitial30Cartes.filter(carte => carte.id !== carteTiree.id);
    }
    afficherCartesJoueur(jeuJoueur);
  }

// Ci-dessous la fonction qui affiche les 5 cartes du joueur
function afficherCartesJoueur(jeuJoueur) {
  const charactersContainer = document.getElementById('characters');
  charactersContainer.innerHTML = '';

  jeuJoueur.forEach(character => {
    const card = creerCarte(character);
    charactersContainer.appendChild(card);
  });
}

// Ci-dessous la fonction qui affiche toutes les cartes
async function afficherToutesLesCartes() {
  const charactersContainer = document.getElementById('characters');
  charactersContainer.innerHTML = '';

  jeuInitial30Cartes = await obtenirCartes(); // Récupère les cartes de l'API à nouveau

  jeuInitial30Cartes.forEach(character => {
    const card = creerCarte(character);
    charactersContainer.appendChild(card);
  });
}

// Ci-dessous la fonction qui affiche les cartes filtrées par maison
function afficherCartesParMaison(maison) {
  const charactersContainer = document.getElementById('characters');
  charactersContainer.innerHTML = '';

  const cartesMaison = jeuInitial30Cartes.filter(character => character.house === maison);
  cartesMaison.forEach(character => {
    const card = creerCarte(character);
    charactersContainer.appendChild(card);
  });
}

// Ci-dessous la fonction qui gère la séquence d'échange de carte
async function echangerCarte() {
    const carteID = parseInt(prompt("Veuillez entrer le numéro de la carte que vous souhaitez échanger :"));
    
    // Vérifier si la carte avec le numéro saisi est présente dans le jeu du joueur
    const index = jeuJoueur.findIndex(carte => carte.id === carteID);
    if (index !== -1) {
      // Retirer la carte choisie du jeu du joueur
      const carteEchangee = jeuJoueur[index];
  
      // Nous décidons que 1 fois sur 3 l'échange sera refusé, pour simuler un cas où la carte ne trouve pas preneur
      // Et 2 fois sur 3, la carte est acceptée pour échange (si refusé, le joueur peut réessayer plus tard)
      // Générer un nombre aléatoire entre 1 et 3 pour déterminer si le système accepte ou refuse l'échange
      const nombreAleatoire = Math.floor(Math.random() * 3) + 1;
  
      if (nombreAleatoire === 1 || nombreAleatoire === 2) { // Accepte l'échange à 2/3 de chance
        // Sélectionner une carte aléatoire parmi les cartes restantes dans le jeu
        const indexCarteAleatoire = Math.floor(Math.random() * jeuInitial30Cartes.length);
        const nouvelleCarte = jeuInitial30Cartes[indexCarteAleatoire];
  
        // Proposer la carte au joueur
        const confirmation = window.confirm(`Cette carte vous est proposée en échange :\n${nouvelleCarte.id} - ${nouvelleCarte.name}\n\nL'acceptez-vous ?`);
  
        if (confirmation) {
          // Si la nouvelle carte échangée est de la maison Ravenclaw, allumez la LED bleue
          if (nouvelleCarte.house === 'Ravenclaw') {
            // await allumerLEDBleue();     mis en commentaire vu que les pbs sécurité empêchent le fonctionnement
            alert("envoi de l'ordre d'allumer la LED bleue");
          }
          if (nouvelleCarte.house === 'Gryffindor') {
            // await allumerLEDRouge();     mis en commentaire vu que les pbs sécurité empêchent le fonctionnement
            alert("envoi de l'ordre d'allumer la LED rouge");
          }
          if (nouvelleCarte.house === 'Slytherin') {
            // await allumerLEDVerte();     mis en commentaire vu que les pbs sécurité empêchent le fonctionnement
            alert("envoi de l'ordre d'allumer la LED verte");
          }
          if (nouvelleCarte.house === 'Hufflepuff') {
            // await allumerLEDJaune();     mis en commentaire vu que les pbs sécurité empêchent le fonctionnement
            alert("envoi de l'ordre d'allumer la LED jaune");
          }
          if (nouvelleCarte.house === '') {
            // await allumerLEDViolet();     mis en commentaire vu que les pbs sécurité empêchent le fonctionnement
            alert("envoi de l'ordre d'allumer la LED violet");
          }
          
          // Retirer la carte échangée du jeu du joueur
          jeuJoueur.splice(index, 1);
          // Ajouter la nouvelle carte au jeu du joueur
          jeuJoueur.push(nouvelleCarte);
          alert(`La carte ${carteEchangee.name} (ID: ${carteID}) a été échangée avec succès. Tapez OK puis vous verrez votre nouveau jeu, avec la nouvelle carte qui apparaitra sur la droite`);
        } else {
          alert("Vous avez refusé, il n'y a pas d'échange");
        }
      } else {
        alert("Votre carte proposée n'a pas trouvé preneur. Vous pouvez ré-essayer plus tard");
        // await allumerLEDViolet();     mis en commentaire vu que les pbs sécurité empêchent le fonctionnement
      }
      
      // Afficher les cartes mises à jour du joueur
      afficherCartesJoueur(jeuJoueur);
    } else {
      alert("Vous ne possédez pas cette carte.");
    }
  }

// Fonction pour allumer la LED bleue
async function allumerLEDBleue() {
    try {
        const response = await fetch('http://192.168.1.52:5000/led/allumer_bleu', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        console.log(data); 
        alert(data.message); 
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la requete LED Bleue');
    }
}

// Fonction pour allumer la LED verte, à travers le fetch sur adresse fixe du réseau wifi domestique
async function allumerLEDVerte() {
    try {
        const response = await fetch('http://192.168.1.52:5000/led/allumer_vert', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        console.log(data); 
        alert(data.message); 
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la requete LED Verte');
    }
}

// Fonction pour allumer la LED rouge, à travers le fetch sur adresse fixe du réseau wifi domestique
async function allumerLEDRouge() {
    try {
        const response = await fetch('http://192.168.1.52:5000/led/allumer_rouge', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        console.log(data); 
        alert(data.message); 
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la requete LED Rouge');
    }
}

// Fonction pour allumer la LED jaune, à travers le fetch sur adresse fixe du réseau wifi domestique
async function allumerLEDJaune() {
    try {
        const response = await fetch('http://192.168.1.52:5000/led/allumer_jaune', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        console.log(data); 
        alert(data.message); 
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la requete LED Jaune');
    }
}

// Fonction pour allumer la LED violet, à travers le fetch sur adresse fixe du réseau wifi domestique
async function allumerLEDViolet() {
    try {
        const response = await fetch('http://192.168.1.52:5000/led/allumer_violet', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        console.log(data); 
        alert(data.message); 
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la requete LED Violet');
    }
}

// Fonction pour éteindre la LED, à travers le fetch sur adresse fixe du réseau wifi domestique
async function eteindreLED() {
    try {
        const response = await fetch('http://192.168.1.52:5000/led/eteindre', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        console.log(data); 
        alert(data.message); 
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l action éteindre la LED');
    }
}

document.addEventListener('DOMContentLoaded', function () {
  afficherCartes();
});


// Fonction pour afficher le détail d'une carte
function afficherDetailCarte() {
  const carteID = parseInt(prompt("Veuillez entrer le numéro de la carte que vous souhaitez afficher :"));
  if (carteID >= 1 && carteID <= 30) {
      const character = jeuInitial30Cartes.find(carte => carte.id === carteID);
      if (character) {
          const charactersContainer = document.getElementById('characters');
          charactersContainer.innerHTML = '';

          const card = creerCarteDetail(character);
          charactersContainer.appendChild(card);
      } else {
          alert("Cette carte n'existe pas.");
      }
  } else {
      alert("Numéro de carte invalide. Veuillez entrer un numéro entre 1 et 30.");
  }
}

// Fonction qui crée la carte détaillée, avec toutes les informations présentes dans l'API, 
// Fonction appelée par afficherDetailCartes (ci-dessus)
function creerCarteDetail(character) {
  const card = document.createElement('div');
  card.classList.add('card-detail');

  const { id, name, image, actor, house, patronus, blood, birthday, gender, eyes, hairs, wand, role } = character;

  card.innerHTML = `
      <h2>${id} - ${name}</h2>
      <img src="${image}" alt="${name}">
      <div>
          <p><strong>Actor:</strong> ${actor}</p>
          <p><strong>House:</strong> ${house}</p>
          <p><strong>Patronus:</strong> ${patronus || 'Inconnu'}</p>
          <p><strong>Ascendance:</strong> ${blood || 'Inconnue'}</p>
          <p><strong>Date of birth:</strong> ${birthday ? new Date(birthday).toLocaleDateString() : 'Inconnue'}</p>
          <p><strong>Color of hair:</strong> ${hairs || 'Inconnue'}</p>
          <p><strong>Color of eyes:</strong> ${eyes || 'Inconnue'}</p>
          <p><strong>Wand:</strong> ${wand ? `${wand.wood} wood, ${wand.core} core` : 'Inconnue'}</p>
          <p><strong>Role:</strong> ${role || 'Inconnu'}</p>
      </div>
  `;

  return card;
}

// Fonction qui gère les cartes favories, avec l'information du tableau favoris
function toggleFavorite(characterId) {
  const index = favoris.indexOf(characterId);
  if (index === -1) {
    // La carte n'est pas déjà dans les favoris, donc l'ajouter
    favoris.push(characterId);
  } else {
    // La carte est déjà dans les favoris, donc la retirer
    favoris.splice(index, 1);
  }

  // Mettre à jour l'affichage des cartes pour refléter les changements de favoris
  afficherToutesLesCartes();
}

let backgroundIsDefault = true;

function changerImageFond() {
  const body = document.body;
  
  if (backgroundIsDefault) {
    body.style.backgroundImage = `var(--background-alternative)`;
  } else {
    body.style.backgroundImage = `var(--background-default)`;
  }
  
  backgroundIsDefault = !backgroundIsDefault; // Inverse l'état de l'image de fond
}

// Fonction openNav ouvre la barre de navigation latérale. Est appelée depuis toggleMenu
function openNav() {
  document.getElementById("sidenav").style.width = "250px";
}

// Fonction closeNav ferme la barre de navigation latérale. Est appelée depuis toggleMenu
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}

// Fonction toggleMenu, appelée depuis un clic sur la burger box, ouvre et ferme la barre de navigation latérale
function toggleMenu() {
  const sidenav = document.getElementById("sidenav");
  if (sidenav.style.width === "250px") {
    closeNav();
  } else {
    openNav();
  }
}

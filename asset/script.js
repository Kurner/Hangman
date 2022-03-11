const word = document.getElementById('word');
const wrongLetters = document.getElementById('lettersUsed');
const notif = document.getElementById('notifContainer');
const popupVictory = document.getElementById('popupContainerVictory');
const popupDefeat = document.getElementById('popupContainerDefeat');
const wordDisplay = document.getElementById('wordDisplay');

//On récupére les différents éléments composant la victime
const victimParts = document.querySelectorAll('.victim');
console.log(victimParts);

//Création du tableau des mots possibles
const wordsToFind = ['becode', 'programming', 'project', 'charleroi', 'coach', 'documentation', 'dog', 'progress', 'javascript', 'procrastination' ];

//Choix aléatoire d'un mot du tableau 'wordsToFind'
let wordSelected = wordsToFind[Math.floor(Math.random() * wordsToFind.length)];

const wrongLettersUsed = [];
const correctLetters = [];

function notifBox()
{
        // Affiche le msg si la lettre a déjà été tapé
        notif.style.display = "block";

        // Cache le msg après quelques secondes
        setTimeout(function() {
            notif.style.display = "none";
        }, 1000);

}

function victim()
{
    
    wrongLetters.innerHTML = wrongLettersUsed.map(letter => letter);

    //Affiche les parties de la victime en fonction du nombre d'erreurs
    victimParts.forEach((part,index) => {
        const errors = wrongLettersUsed.length;

        if(index < errors) {
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }
    });

    //Condition de défaite
    setTimeout(function() {
        if(wrongLettersUsed.length === victimParts.length)
        {
            popupDefeat.style.display = "flex"; 
        }

    });
}

function wordToFind()
{
    word.innerHTML = `
    ${wordSelected
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    // On enlève/remplace les espaces dans le résultat
    const checkWin = word.innerText.replace(/ /g, '');

    // Condition de victoire
    setTimeout(function() {
        if(checkWin === wordSelected)        
        {
            popupVictory.style.display = "flex"; 
            wordDisplay.innerHTML = "The word was '" + wordSelected + "' !";
        }
    });
   
    // for(let i = 0; i < wordSelected.length; i++)
    // {
    //     const html = `<p class="word">_</p>`;
    // }
}

window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        let letter = e.key;

        //Si le mot contient la lettre envoyé
        if(wordSelected.includes(letter))
        {
            if(!correctLetters.includes(letter))
            {
                correctLetters.push(letter);
                wordToFind();
            }
            else
            {
                notifBox();
                console.log('Déjà tapée !')
            }
        }
        else
        {
            //Si le tableau "wrongLetters" ne contient pas la lettre envoyé
            if(!wrongLettersUsed.includes(letter))
            {
                wrongLettersUsed.push(letter);
                victim();
            }
            else
            {
                notifBox();
                console.log('Déjà tapée !');
            }
        }
    }
});

function newGame()
{
    //Supprime le contenu des tableaux
    correctLetters.splice(0);
    wrongLettersUsed.splice(0);

    wordSelected = wordsToFind[Math.floor(Math.random() * wordsToFind.length)];

    wordToFind();
    victim();
    popupVictory.style.display = "none";
    popupDefeat.style.display = "none";
}


document.getElementById("replayV").addEventListener("click", () => {

newGame();

});

document.getElementById("replayD").addEventListener("click", () => {

    newGame();
    
    });

wordToFind();
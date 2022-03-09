const word = document.getElementById('word');
const wrongLetters = document.getElementById('lettersUsed');

//On récupére les différents éléments composant la victime
const victimParts = document.querySelectorAll('.victim');
console.log(victimParts);

//Création du tableau des mots possibles
const wordsToFind = ['becode', 'programming', 'project', 'charleroi', 'coach', 'documentation', 'dog', 'progress', 'javascript', 'anticonstitutionnellement' ];

//Choix aléatoire d'un mot du tableau 'wordsToFind'
let wordSelected = wordsToFind[Math.floor(Math.random() * wordsToFind.length)];

const wrongLettersUsed = [];
const correctLetters = [];

function victim()
{
    wrongLetters.innerHTML = wrongLettersUsed.map(letter => letter);

    //Affiche les parties de la victime en fonction du nombre d'erreurs
    victimParts.forEach((part,index) => {
        const errors = wrongLettersUsed.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });
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
                console.log('yes');
            }
            else
            {
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
                console.log(wrongLettersUsed);
            }
            else
            {
                console.log('Déjà tapée !');
            }
        }
    }
});
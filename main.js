
const result = document.getElementById('result');
const sound =  document.getElementById('sound');
const btn =  document.getElementById('search-btn');
let searchQuery='';
let submit = document.getElementById('myForm');

//==========SUBMIT BUTTON=============
btn.addEventListener('click', () => {
    searchQuery =  document.getElementById('inp-word').value;
    fetchAPI();
});

//==========SUBMIT ENTER=============
submit.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery =  document.getElementById('inp-word').value;
    fetchAPI();
});

//==========FETCH API=============
async function fetchAPI () {
    const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    result.innerHTML = 
    `
    <div class="word">
                <h3>${data[0].word} </h3>
                <button onclick='playSound()' id="search-btn"><i class='bx bxs-volume-full'></i></button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
                <p class="word-meaning">
                <li>${data[0].meanings[0].definitions[0].definition}</li>
                <li>${data[0].meanings[0].definitions[1].definition}</li>
                <li>${data[0].meanings[0].definitions[2].definition}</li>
                </p>
                <p class="word-example">
                ${data[0].meanings[0].definitions[0].example}
                </p>
    `
    sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    console.log(sound);
}

function playSound() {
    sound.play();
}


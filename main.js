const result = document.getElementById('result');
const sound = document.getElementById('sound');
const searchBtn = document.getElementById('search-btn');
const inputWord = document.getElementById('inp-word');
const myForm = document.getElementById('myForm');

// Event listeners
searchBtn.addEventListener('click', handleSearch);
myForm.addEventListener('submit', handleSubmit);

// Functions
async function handleSearch() {
  const searchQuery = inputWord.value;
  await fetchAPI(searchQuery);
}

async function handleSubmit(e) {
  e.preventDefault();
  const searchQuery = inputWord.value;
  await fetchAPI(searchQuery);
}

async function fetchAPI(searchQuery) {
  try {
    const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`;
    const response = await fetch(baseURL);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function updateUI(data) {
  const wordDetails = `
    <div class="word">
      <h3>${data[0].word}</h3>
      <button onclick='playSound()' id="result-btn"><i class='bx bxs-volume-full'></i></button>
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
  `;
  result.innerHTML = wordDetails;
  sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
}

function playSound() {
  sound.play();
}

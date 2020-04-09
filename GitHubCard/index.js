/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/e94canales')
  .then ( response => {
    let userData = response.data
    cards.appendChild(createCard(userData))
  })
  .catch ( error => {
    console.log('Theres an error -', error);
    
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['e94canales', 'JHaydenDev', 'Ladrillo', 'bigknell', 'justsml', 'luishrd'];


axios.get('https://api.github.com/users/e94canales/followers')
  .then ( response => {
    const followers = response.data    
    followers.forEach(user => {
      const username = user.login
      axios.get(`https://api.github.com/users/${username}`)
        .then ( response => {
          const userData = response.data
          cards.appendChild(createCard(userData))
        })
    })
  })
  .catch ( error => {
    console.log('Theres an error - ', error)
  })


// followersArray.forEach(person => {
//   axios.get(`https://api.github.com/users/${person}`)
//   .then ( response => {
//     let userData = response.data
//     cards.appendChild(createCard(userData))
//     console.log(response)
//   })
//   .catch ( error => {
//     console.log('Theres an error -', error);
    
//   })
// })


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
const cards = document.querySelector('.cards')

function createCard (cardData){
  // INIT 

  const card = document.createElement('div')
  const portrait = document.createElement('img')
  const cardInfo = document.createElement('div')
  const name = document.createElement('h3')
  const username = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const profileLink = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const repo = document.createElement('p')
  const bio = document.createElement('p')


  // STRUCTURE

  card.appendChild(portrait)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(repo)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)

  // CLASSES
  card.classList.add('card')
  cardInfo.classList.add('card-info')
  name.classList.add('name')
  username.classList.add('username')

  // CONTENTS
  portrait.src = cardData.avatar_url
  name.textContent = cardData.name
  username.textContent = cardData.login
  location.textContent = `Location: ${cardData.location}`
  profile.textContent = 'Profile: '
  profileLink.setAttribute('href', cardData.html_url)
  profileLink.textContent = cardData.html_url
  profile.appendChild(profileLink)
  followers.textContent = `Followers: ${cardData.followers}`
  following.textContent = `Following: ${cardData.following}`
  bio.textContent = `Bio: ${cardData.bio}`
  repo.textContent = `Repositories: ${cardData.public_repos}`


  return card
  

}

// cards.appendChild(createCard(someData))

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

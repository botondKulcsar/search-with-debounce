const userCardContainer = document.querySelector('#user-cards')
const searchInput = document.querySelector('#search')
let users = []

fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => {
    users = data
  })

function debounce (cb, delay) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

const showResults = debounce(e => {
  let displayedUsers = []
  const value = e.target.value.toLowerCase().trim()
  if (!value) {
    userCardContainer.innerHTML = ''
    return
  }
  for (const user of users) {
    if (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    ) {
      displayedUsers.push(`<div class="card">
      <div class="header" data-header>${user.name}</div>
      <div class="body" data-body>${user.email}</div>
    </div>`)
    }
  }

  userCardContainer.innerHTML = displayedUsers.join('')
}, 500)

searchInput.addEventListener('input', e => {
  showResults(e)
})

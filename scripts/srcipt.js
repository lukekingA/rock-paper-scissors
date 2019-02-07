$(document).ready(populate)


const plays = {
  rock: {
    name: 'rock',
    image: '#',
  },
  paper: {
    name: 'paper',
    image: '#',
  },
  scissors: {
    name: 'scissors',
    image: '#',
  }
}

let game = {
  player: {
    currentPlay: '',
    wins: 0,
  },
  computer: {
    currentPlay: '',
    wins: 0,
  },
  games: 0,
  win() {
    let player = this.player.currentPlay
    let comp = this.computer.currentPlay
    if (player == 'rock' && comp == 'paper' ||
      player == 'scissors' && comp == 'rock' ||
      player == 'paper' && comp == 'scissors') {
      this.setBanner('lose')
      this.computer.wins++
    } else if (player == comp) {
      this.setBanner('draw')
    } else {
      this.setBanner('win')
      this.player.wins++
    }
    game.games++
  },
  reset() {
    game.player.wins = 0
    game.computer.wins = 0
    game.games = 0
    update()
  },
  setBanner(condition) {
    let element = document.getElementById(condition)
    element.classList.remove('d-none')
    setTimeout(() => element.classList.add('d-none'), 3000)

  }
}

function populate() {
  let template = ''
  template += `<div">`
  for (let play in plays) {
    //populate buttons
    template += `<button id=${plays[play].name} type="button" data-type="plays" class="btn-lg mx-3">${plays[play].name}</button>`
  }
  template += `<button id="reset"class="btn-sm">Reset</button>`
  template += `</div>`
  template += `<div>`
  //populate winning and losing banners
  template += `<h1 id="win" class="display1 d-none">You Win</h1>`
  template += `<h1 id="lose" class="display1 d-none">You Lose</h1>`
  template += `<h1 id="draw" class="display1 d-none">Draw</h1>`
  template += `</div>`
  document.getElementById('app').innerHTML = template
  let btnArr = Array.from(document.getElementsByTagName('button'))
  btnArr.forEach(button => {
    if (button.dataset.type == 'plays') {
      button.addEventListener('click', buttonClick)
    }
    if (button.id == 'reset') {
      button.addEventListener('click', game.reset)
    }
  })
}

function buttonClick(event) {
  game.player.currentPlay = event.target.id
  computerPlay()
  game.win()
  update()
}

function computerPlay() {
  let playStrings = Object.keys(plays)
  let random = Math.floor(Math.random() * playStrings.length)
  game.computer.currentPlay = playStrings[random]

}

function update() {
  document.getElementById('gameTotal').innerText = game.games
  document.getElementById('yourTotal').innerText = game.player.wins
  document.getElementById('compTotal').innerText = game.computer.wins
}
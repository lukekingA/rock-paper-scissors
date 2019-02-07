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
    $('#player img').remove()
    $("#computer img").remove()
    game.update()
  },
  setBanner(condition) {
    let element = document.getElementById(condition)
    element.classList.remove('d-none')
    $('#mobile-margin').toggleClass('mt-5')
    setTimeout(() => {
      element.classList.add('d-none')
      $('#mobile-margin').toggleClass('mt-5')
    }, 1000)
  },
  computerPlay() {
    let playStrings = Object.keys(plays)
    let random = Math.floor(Math.random() * playStrings.length)
    let playstring = playStrings[random]
    game.computer.currentPlay = playStrings[random]
    $("#computer").html('<img class="img-fluid"src=images/' + playstring + '.svg>')
  },
  buttonClick(event) {
    game.player.currentPlay = event.target.id
    $("#player").html('<img class="img-fluid"src=images/' + event.target.id + '-left.svg>')
    game.computerPlay()
    game.win()
    game.update()
  },
  update() {
    $('#gameTotal').text(game.games)
    $('#yourTotal').text(game.player.wins)
    $('#compTotal').text(game.computer.wins)
  }
}

function populate() {
  let template = ''
  template += `<div">`
  for (let play in plays) {
    //populate buttons
    template += `<button id=${plays[play].name} type="button" data-type="plays" class="btn-sm btn-sm-lg mx-3">${plays[play].name}</button>`
  }
  template += `<button id="reset"class="btn-sm">Reset</button>`
  template += `</div>`
  template += `<div class="text-center mt-2">`
  //populate winning and losing banners
  template += `<h1 id="win" class="display1 d-none mb-0 text-white text-border">You Win</h1>`
  template += `<h1 id="lose" class="display1 d-none mb-0 text-white text-border">You Lose</h1>`
  template += `<h1 id="draw" class="display1 d-none mb-0 text-white text-border">Draw</h1>`
  template += `</div>`
  $('#app').html(template)
  let btnArr = Array.from($('button'))
  btnArr.forEach(button => {
    if (button.dataset.type == 'plays') {
      button.addEventListener('click', game.buttonClick)
    }
    if (button.id == 'reset') {
      button.addEventListener('click', game.reset)
    }
  })
}
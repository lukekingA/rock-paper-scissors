$(document).ready(populate)

const plays = {
  rock: {
    name: 'rock',
    image: '#',
    idNum: 1
  },
  paper: {
    name: 'paper',
    image: '#',
    idNum: 2
  },
  scissors: {
    name: 'scissors',
    image: '#',
    idNum: 3
  }
}

function populate() {
  let template = ''
  for (let play in plays) {
    //debugger
    template += `<button id=${plays[play].name} type="button" class="btn-lg mx-3">${plays[play].name}</button>`
  }

  function buttonClick(event) {
    document.getElementById(event.eventTarget)
  }


  document.getElementById('app').innerHTML = template
}
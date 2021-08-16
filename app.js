// variables gloriables

const formularioUI = document.querySelector('#form');
const listMusic = document.getElementById('list');
let arrayMusic = [];


// funciones
const CrearItem = (song) => {

    let item = {
      song: song,
      state: false
    }
  
    arrayMusic.push(item);
  
    return item;
  
  }

  const save = () => {

    localStorage.setItem('playlist', JSON.stringify(arrayMusic));
    readMusic();
  
  }
  

  const readMusic = () => {

    listMusic.innerHTML = '';
    arrayMusic = JSON.parse(localStorage.getItem('playlist'));
    
    if(arrayMusic === null){
        arrayMusic = [];
    }else{
  
        arrayMusic.forEach(element => {
  
        if(element.state){
          listMusic.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.song}</b> - ${element.state}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
        }else{
            listMusic.innerHTML += `<div class="alert alert-info" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.song}</b> - ${element.state}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
        }
      });
  
    }
  }

  const Eliminar = (song) => {
    let arrayIndex;
    arrayMusic.forEach((element, index) =>{
      if (element.song === song) {
        arrayIndex = index;
      }
    });
    arrayMusic.splice(arrayIndex, 1);
    save();
  }

  const Editar = (song) => {
    let arrayIndex = arrayMusic.findIndex((element) =>
      element.song === song);
      console.log(arrayMusic[arrayIndex])
      arrayMusic[arrayIndex].state = true;
      save()
  }

// EventListener
formularioUI.addEventListener('submit', (e) => {

    e.preventDefault();
    let music = document.querySelector('#music').value;
  
    CrearItem(music);
    save();
  
    formularioUI.reset();
  
  });

document.addEventListener('DOMContentLoaded', readMusic);

listMusic.addEventListener('click',(e) => {
    e.preventDefault();
    

    if (e.target.innerHTML ==='done' || e.target.innerHTML ==='delete' ) {
      let text = e.path[2].childNodes[1].innerHTML;
      if (e.target.innerHTML === 'delete') {
        Eliminar(text)
      }

      if (e.target.innerHTML === 'done') {
        Editar(text)
      }
    }

})
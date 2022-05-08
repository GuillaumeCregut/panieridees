import React, { useState } from 'react'
import Cart from '../../components/cart/Cart';

import PostIt from '../../components/postit/PostIt';

import './Home.scss';

const Home = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [textIdea, setTextIdea] = useState('');
  
  //draggable events
  function allowDrop(ev){
    ev.preventDefault();
  }
  const repoIdea=document.getElementById('homeRepo');
  repoIdea.addEventListener('drop',function (e){
    drop(e);
  });
  repoIdea.addEventListener('dragover',function (e){
    allowDrop(e);
  });
  function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    let Id_PostIt = ev.target.id;
  }

  function drop(ev){
    let target=0;
    ev.preventDefault();
    let data=ev.dataTransfer.getData("text");
    let targetDiv=ev.target.id;
    if(targetDiv==='homeRepo'){
      alert('Dépot');
    }
  }


  return (
    <div className='Home'>
      <h2>Accueil</h2>
      <div className='HomeContainer'>
        <div className="HomeLeft">
          <div className="HomePostItContainer" draggable="true" id="HomePostItContainer">
            <PostIt
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              textIdea={textIdea}
              setTextIdea={setTextIdea}
            />
          </div>
        </div>
        <div className="HomeRight">
          <div className="HomeRepo" id="homeRepo">
            Déposer votre idée ici
          </div>
          <Cart />
        </div>
      </div>
    </div>
  )
}

export default Home
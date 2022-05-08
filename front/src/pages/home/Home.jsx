import axios from 'axios';
import React, { useState } from 'react'
import Cart from '../../components/cart/Cart';
import PostIt from '../../components/postit/PostIt';
import bellSound from '../../assets/bell.ogg';
import './Home.scss';

const Home = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [textIdea, setTextIdea] = useState('');
  let idPostIt=0;

  //draggable events
  function allowDrop(ev){
    ev.preventDefault();
  }


  function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    idPostIt = ev.target.id;
    if(idPostIt!=='HomePostItContainer')
    {
      ev.preventDefault();
    }
  }

  function drop(ev){
    ev.preventDefault();
    let data=ev.dataTransfer.getData("text");
    let targetDiv=ev.target.id;
    if((targetDiv==='homeRepo')&&(idPostIt==='HomePostItContainer') ){
      ev.target.appendChild(document.getElementById(data));
      const newIdea={
        state : false,
        name:textIdea,
        theme:selectedTheme
      }
      const url=`${process.env.REACT_APP_API_URL}ideas`;
      axios
        .post(url,newIdea)
        .then((result)=>{
          if(result.status===201){
            //animate, then restore,play sound
            playSound();
          }
        })
        .catch((err)=>{
          if(err.code==='ERR_NETWORK'){
           // alert(`L'API est hébergée par Heroku, il faut attendre 15 sec pour son démarrage. Veuillez réessayer dans 15 sec.`)
          }
          animatePostIt();
        })
    }
  }

  const reattribute=()=>{
    const leftPanel=document.getElementById('HomeLeft');
    leftPanel.appendChild(document.getElementById('HomePostItContainer'));
  }

  const playSound=()=>{
    let audio = new Audio(bellSound);
    audio.play();
  }

//Animation
  const animatePostIt=()=>{
    const postItContainer=document.getElementById('HomePostItContainer');
    const translatePostIt=new KeyframeEffect(
      postItContainer,
      [
        {transform: 'translateY(0%) scale(1)'
      },
        {transform : 'translateY(200px) scale(0)'
      }
      ],
      {
        duration : 1000,
        iterations:1
      }
    );
    const postItAnim=new Animation(translatePostIt,document.timeline);
    postItAnim.play();
    Promise.all(
      postItContainer
        .getAnimations().map(
          (animation)=>{
            return animation.finished
          }
        )
        ).then(()=>{
          reattribute();
        }
    );
  }

  return (
    <div className='Home'>
      <h2>Accueil</h2>
      <div className='HomeContainer'>
        <div className="HomeLeft" id="HomeLeft">
          <div
            className="HomePostItContainer"
            draggable="true"
            id="HomePostItContainer"
            onDragStart={(e)=>drag(e)}>
            <PostIt
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              textIdea={textIdea}
              setTextIdea={setTextIdea}
            />
          </div>
        </div>
        <div className="HomeRight">
          <div
            className="HomeRepo"
            id="homeRepo"
            onDrop={(e)=>drop(e)}
            onDragOver={(e)=>allowDrop(e)}>
            Déposer votre idée ici
          </div>
          <Cart />
          <button onClick={reattribute}>Go</button>
        </div>
      </div>
    </div>
  )
}

export default Home
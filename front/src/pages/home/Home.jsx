import React,{useState} from 'react'
import Cart from '../../components/cart/Cart';

import PostIt from '../../components/postit/PostIt';

import './Home.scss';

const Home = () => {
  const [selectedTheme, setSelectedTheme]=useState('');
  const [textIdea,setTextIdea]=useState('');

  return (
    <div className='Home'>
      <h2>Accueil</h2>
      <div className='HomeContainer'>
        <div className="HomeLeft">
          <PostIt 
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            textIdea={textIdea}
            setTextIdea={setTextIdea}
          />
        </div>
        <div className="HomeRight">
          <div className="HomeRepo">
            Déposer votre idée ici
          </div>
          <Cart />
        </div>
      </div>
    </div>
  )
}

export default Home
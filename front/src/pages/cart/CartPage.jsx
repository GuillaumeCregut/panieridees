import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IdeaCard from '../../components/ideacard/IdeaCard';
import Trash from '../../components/trash/Trash';
import bellSound from '../../assets/bell.ogg';
import wrongSound from '../../assets/wrong.mp3';
import './CartPage.scss';

const CartPage = (props) => {
    const [ideas, setIdeas] = useState([]);
    const [reload,setReload] = useState(false);
    let idIdea=0;

    useEffect(() => {
        const getIdeas = async () => {
            const url = `${process.env.REACT_APP_API_URL}ideas/notprocessed/`;
            await axios
                .get(url)
                .then((result) => {
                    if (result.status === 200) {
                        setIdeas(result.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getIdeas();
    }, []);

    //Draggable
    function drop(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        let targetDiv = ev.target.id;
        if ((targetDiv === "dustRepo") && (idIdea === data)) {
          ev.target.innerHTML = '';
          try{
             ev.target.appendChild(document.getElementById(data));
             updateIdea(data);
             idIdea=0;
          }
          catch(err){
              console.log(err);
              reattribute(idIdea);
          }
          
        }
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text/plain", ev.target.id);
        idIdea = ev.target.id;
    }
    
    const updateIdea=async (id)=>{
        const url= `${process.env.REACT_APP_API_URL}ideas/${id}`;
        //temp
        animateIdea(id);
        /*await axios
                .put(url,{state: true})
                .then((result)=>{
                    if(result.status===204)
                    {
                        //animation
                    }
                    else{
                        //abort
                        reattribute(id);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    reattribute(id);
                })*/
    }

    const reattribute = (id) => {
        const leftPanel = document.getElementById('ideaContainer');
        const theIdea=document.getElementById(id);
        leftPanel.appendChild(theIdea);
        const Repo = document.getElementById('dustRepo');
        Repo.innerHTML = ' Glisser ici une fois traité';
        let audio = new Audio(wrongSound);
        audio.play();
    }

    const animateIdea = (id) => {
        const container = document.getElementById(id);
        const translateContainer = new KeyframeEffect(
          container,
          [
            {
              transform: 'translateY(0%) scale(1)'
            },
            {
              transform: 'translateY(350px) scale(0)'
            }
          ],
          {
            duration: 1000,
            iterations: 1
          }
        );
    
        const anim = new Animation(translateContainer, document.timeline);
        anim.play();
    
        Promise.all(
          container
            .getAnimations().map(
              (animation) => {
                return animation.finished
              }
            )
        ).then(() => {
            let audio = new Audio(bellSound);
            audio.play();
            const Repo = document.getElementById('dustRepo');
            Repo.innerHTML = ' Glisser ici une fois traité';
            container.classList.add('HiddenCard');
        }
        );
    }

    return (
        <div className='CartPage'>
            <h2>Boite à idées</h2>
            <div className="PageContainer">
                <div className="LeftSide">
                    <span className='CartPageListTitle'>Contenu de la boite à idées</span>
                    <div className="ideaContainer" id="ideaContainer">
                    {ideas&&ideas.map((idea)=>{
                        return(
                           
                            <IdeaCard 
                                key={idea._id}
                                id={idea._id}
                                name={idea.name}
                                theme={idea.theme.name}
                                color={idea.theme.color}
                                createdAt={idea.createdDate}
                                drag={drag}
                                updateIdea= {updateIdea}
                            />
                            
                        )
                    })}
                    </div>
                </div>
                <div className="RightSide">
                    <div
                        className="dustRepo"
                        id="dustRepo"
                        onDrop={(e) => drop(e)}
                        onDragOver={(e) => allowDrop(e)}
                     >
                        Glisser ici une fois traité
                    </div>
                    <div className="Dustbin">
                       <Trash 
                       reload={reload}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage

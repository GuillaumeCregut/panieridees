import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './Settings.scss';
import ThemeCard from '../../components/themecard/ThemeCard';

const Settings = () => {
    const [themes,setThemes]=useState([]);
    const [name,setName]=useState('');
    const [color, setColor]=useState('#000000');
    const [reload, setReload]=useState(false);
    useEffect(()=>{
        const getThemes = async()=>{
            const url=`${process.env.REACT_APP_API_URL}themes`;
            await axios
                .get(url)
                .then((result)=>{
                    if(result.status===200){
                        setThemes(result.data)
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    if(err.code==='ERR_NETWORK'){
                        alert(`L'API est hébergée par Heroku, il faut attendre 15 sec pour son démarrage. Veuillez réessayer dans 15 sec.`)
                      }
                })
        }
        getThemes();
    },[reload]);

    const handleCreate=async()=>{
        if(name===''){
            return -1;
        }
        const newTheme={
            color : color,
            name : name
        }
        const url=`${process.env.REACT_APP_API_URL}themes`;
        await axios
            .post(url,newTheme)
            .then((result)=>{
                if(result.status===201){
                    setReload(!reload);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div className='Settings'>
            <h2>Paramètres</h2>
            <div className="pageContainer">
                <div className="ExistingThemes">
                    <h3>Thèmes existants :</h3>
                    <div className="ThemesContainer">
                        {themes.map((theme)=>{
                            return(
                                <ThemeCard 
                                    key={theme._id}
                                    id={theme._id}
                                    name={theme.name}
                                    color={theme.color}
                                    setReload={setReload}
                                    reload={reload}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="NewTheme">
                        <h3>Créer un thème</h3>
                        <div className="NewThemeContainer">
                            <label htmlFor="name" className='LabelNewTheme'>Nom : 
                                <input
                                    type="text"
                                    id="name"
                                    placeholder='Nom du thème'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    />
                            </label>
                            <label htmlFor="color" className='LabelNewTheme'>Couleur : 
                                <input
                                    type="color"
                                    id="color"
                                    value={color}
                                    onChange={(e)=>setColor(e.target.value)}
                                    />
                            </label>
                            <button onClick={handleCreate} className="NewThemeButton">Créer le thème</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Settings

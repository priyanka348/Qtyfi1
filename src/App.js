import Hero from "./components/Hero/Hero";
import NavBar from "./components/NavBar/NavBar";
import {fetchTopAlbums,fetchNewAlbums, fetchSongs} from './api/api';
import { useEffect, useState } from "react";
import FAQAccordion from './components/FAQAccordion/FAQAccordion';
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Line from './components/Line/Line';
import Section from "./components/Section/Section";
import styles from './App.module.css';

function App() {
  const [topAlbumData, setTopAlbumData] = useState([]);
  const [newAlbumData, setNewAlbumData] = useState([]);
  const [songsData, setSongsData] = useState([]);
  const [filteredDataValues, setFilteredDataValues] = useState([]);
  const [value, setValue] = useState(0);
  

  

  const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(value);
  }
  
  const generateFilteredSongsData = (value) => {
    let key;
    if(value===0){
      filteredData(songsData);
      return;
    }
    else if(value===1){
      key="rock";
    }
    else if(value===2){
      key="pop";
    }
    else if(value===3){
      key="jazz";
    }
    else if(value===4){
      key="blues";
    }
    const res = songsData.filter(item => item.genre.key === key);
    filteredData(res);
  }
 useEffect(()=>{
  generateFilteredSongsData(value);
 },[value]);

 
 const generateTopAlbumData = async () => {
   try {
     const res = await fetchTopAlbums();
     setTopAlbumData(res);
    } catch (error) {
      console.error(error)
    }
  }

  const generateNewAlbumData= async () => {
    try{
     const data = await fetchNewAlbums();
     setNewAlbumData(data);
    }catch(err){
      console.error(err);
    }
  }

  const generateSongsData = async () => {
   try{
     const res = await fetchSongs();
     setSongsData(res);
     setFilteredDataValues(res);
   }catch(err){
     console.error(err);
   }
  }




  

  

  const filteredData = (val) => {
    setFilteredDataValues(val);
  }
  useEffect(()=>{
    generateTopAlbumData();
    generateNewAlbumData();
    generateSongsData();
  },[])

  
  return (
    <>
    <NavBar data={topAlbumData}/>
    <Hero/>
    <div className={styles.sectionWrapper}>
    <Section type="album" title="Top Albums" data={topAlbumData} /> 
    <Section type="album" title="New Albums" data={newAlbumData}/>
    <Line/>
    <Section type="song" title="Songs" data={songsData} filteredData={filteredData} filteredDataValues={filteredDataValues} value={value}  handleChange={handleChange}/>
    <Line />
    <FAQAccordion />
    </div>
    <MusicPlayer data={topAlbumData} />
    </>
  );
}

export default App;

import React, { useState } from "react";
import {Box, CircularProgress } from "@mui/material";
import Card from "../Card/Card";
import styles from "./Section.module.css";
import Carousel from '../Carousel/Carousel.jsx';
import BasicTabs from "../BasicTabs/BasicTabs.jsx";
const Section = ({ title, data, type ,value, filteredData=null,filteredDataValues=[],handleChange}) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
       <div className={styles.header}>
         <h3>{title}</h3>
         {type==='song'?null:(
           <h4 className={styles.toggleText} onClick={handleToggle}>
           {!toggle ? "show all" : "collapse"}
         </h4>
         )}
     </div>
      {type==='song'?<BasicTabs value={value} handleChange={handleChange}/>:null}
      {data?.length === 0 ? (
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
           <CircularProgress />
        </Box>
       
      ) : (type==='song'?
          (<div className={styles.cardWrapper}>
           <Carousel data={filteredDataValues} renderCardComponent={(item) => <Card data={item} type={type}/>}/>
          </div>):
          
          (<div className={styles.cardWrapper}>
          {toggle ? (
            <div className={styles.wrapper}>
              {data.map((item) => (
                <Card type={type} data={item} key={item.id} />
              ))}
            </div>
          ) : (
             <Carousel data={data} renderCardComponent={(item) => <Card data={item} type={type}/>}/>
          )}
        </div>)
          
        
      )}
    </div>
  );
};

export default Section;

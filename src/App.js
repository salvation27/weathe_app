import React,{useState,useEffect} from "react";
import {v4 as uuidv4} from 'uuid'
import {randomColor} from 'randomcolor'
// import Draggable from "react-draggable";

import {fetchWeather} from './api/fetchWaether'


function App() {

  const [item,setItem] = useState('')
  const [items,setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(()=>{
    localStorage.setItem('items',JSON.stringify(items))
  },[items])

 
const deleteItem = (id)=> {
 setItems(items.filter(item=>item.id !== id))
}

// const keyPres = (e) => {
//   const code = e.keyCode || e.which
//   if(code === 13) {
//    newItem()
//   }
// }

const [query,setQuery]= useState('')
const [weather,setWeather]= useState({})
// const [color,setColor] = useState(false)

const serch = async ()=>{
  // if(e.key==='Enter'){
    const data = await fetchWeather(query)
    setWeather(data)
    console.log(data)
    // if(data.cod === 200){
    //   setColor(true)
    // }
    const {main,name} = data
     if (data) {

       const newItem = {
         id: uuidv4(),
         main: main,
         code: data.cod,
         name: name,
         color: randomColor({
           luminosity: "light",
         }),
       };
       setItems((items) => [...items, newItem]);
      //  setItem("");
     } else {
       alert("Поле ввода пустое");
      //  setItem("");
     }
    setQuery('')
  // }
}

 const newItem = () => {
   if (item.trim() !== "") {
     const newItem = {
       id: uuidv4(),
       item: item,
       color: randomColor({
         luminosity: "light",
       }),
     };
     setItems((items) => [...items, newItem]);
     setItem("");
   } else {
     alert("Поле ввода пустое");
     setItem("");
   }
 };

//  color === true ? 'green' : 'red'
// console.log(color)

  return (
    <div className="App">
      <div className="wrapper">
        {/* <input
          value={item}
          type="text"
          placeholder="введите текст"
          // onKeyPress={(e) => keyPres(e)}
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="enter" onClick={newItem}>
          Создать
        </button> */}
        <div className="wrapper_wether">
          <h1>Погода</h1>
          <input
            type="text"
            className="serch"
            placeholder="введите страну"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            // onKeyPress={serch}
          />
          <button onClick={serch}>Load</button>
          <span>{query}</span>
          {/* <span className={`red `}>rrrrr</span> */}
          {weather.main && (
            <div className="city">
              <h2 className="city_name">
                Найдена страна:
                <span>{weather.name}</span>
                {/* <sup>{weather.sys.country}</sup> */}
              </h2>
              {/* <div className="city_temp">{weather.main.temp}</div> */}
            </div>
          )}
        </div>
        <div className="wrapper_list">
          {items.map((item, i) => {
            return (
              <div
                className="todoo_item"
                key={i}
                style={{ backgroundColor: item.color }}
              >
                {item.name}
                {item.main.temp}
                {' '}
                 {item.main.humidity}
                <button onClick={() => deleteItem(item.id)}>Удалить</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

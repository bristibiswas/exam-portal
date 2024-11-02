import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css";
import axios from 'axios';
const Index = () => {
  const navigate = useNavigate()

    const [openDropDown, setopenDropDown] = useState(false)
    const [selectedOption, setselectedOption] = useState({name: "Select" , id: "0"})

    const optionArray = [
        {name: "General Knowledge", id:"9"},
        {name: "Sports", id:"21"},
        {name: "Films", id:"11"},
        {name: "Mythology", id:"20"},
        {name: "Art", id:"25"},
    ]
    

    const handlegetQuestion = async () => {
        const data = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedOption.id}&type=multiple`)
        console.log(data.data);

        if (data.data.response_code === 0) {
          localStorage.setItem("Questions" , JSON.stringify(data.data.results))
          navigate('/question')
        }
        
        
    }

    

 
  return (
    <>
      <div className="container">
        <h2>Online Exam Portal</h2>
        <h3>Choose Exam Category</h3>

        <div className="select-menu active">
          <div className="select-btn"  onClick={() => {setopenDropDown(!openDropDown)}}>
            <span className="sBtn-text">{selectedOption.name}</span>
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 5.75L7 9.25L10.5 5.75"
                stroke="#131316"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          {openDropDown && <ul className="options">
            {optionArray?.map((option) =>{
                return (<li className="option" onClick={() =>{setopenDropDown(!openDropDown) ; setselectedOption(option)}}>
                  <span className="option-text" value={option.id}>{option.name}</span>
                 </li>)
            })}
          </ul>}
         
        </div>
        <button className="container_btn" onClick={handlegetQuestion} disabled={selectedOption.id === "0"}>Start</button>
      </div>
    </>
  );
};

export default Index;

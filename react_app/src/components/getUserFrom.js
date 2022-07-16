import React, {useState} from 'react';
import '../App.css'
function GetUser() {
    

    const [email, setEmail] = useState("");
    const [res, setRes ] = useState("");

    const handleInputChange = (e) => {
        
        const {id , value} = e.target;

        if(id === "searchEmail") {
            setEmail(value);
        }

    }

    const handleSubmit  = () => {
        const data = {email:email}
        fetch('http://localhost:8081/api/get_users', {
        // headers:{ "Access-Control-Allow-Origin": "*"},    
        method: 'POST',
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            setRes(data['full_name'])
          })
    }
    return(
        <div className="form">
            <div className="form-body">
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input  type="email" id="searchEmail" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                    <h3 >{res}</h3>
                </div>
            
                <div className="footer">
                    <button onClick={()=>handleSubmit()} type="submit" className="btn">search</button>
                </div>
            </div>
        </div>
       
    )       
}
export default GetUser
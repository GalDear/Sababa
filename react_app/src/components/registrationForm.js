import React, {useState,setState,useMemo} from 'react';
import '../App.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'
function RegistrationForm() {
    
    const [fulltName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [userType, setUserType] = useState("");
    const [description,setDescription] = useState("");
    const [gender,setGender] = useState("");

    const foundation= "",skills = ""

    const handlCountryChange = (e) => {
        setCountry(e)
    }

    const handlUserTypeChange = (e) => {
        setUserType(e)
    }
    const handlGenderChange = (e) => {
        setGender(e)
    }
    const handleInputChange = (e) => {
        
        const {id , value} = e.target;

        if(id === "fulltName"){
            setFirstName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
        if(id === "phoneNumber"){
            setPhoneNumber(value);
        }
        if(id === "userType"){
            setUserType(value);
        }
        if(id === "description"){
            setDescription(value);
        }

    }

    const handleSubmit  = () => {

        console.log(fulltName,email,password,confirmPassword,phoneNumber,country.label,userType.label,description,foundation,gender.label,skills);

        const data={full_name:fulltName,email:email,password:password,
        phone_number:phoneNumber,country:country.label,user_type:userType.label,description:description,
        foundation:foundation,gender:gender.label,skills:skills}
        fetch('http://192.168.10.57:8081/api/registration', {
            // headers:{ "Access-Control-Allow-Origin": "*"},    
            method: 'POST',
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
            if (data.error){
              alert(`Error`);
            }
            else 
              alert(`successfully created user: ${data.id}`);
            
          })
          .catch((error) => {
            alert(`${error} - Error`);
          });
        }
    
    const countryOptions = useMemo(() => countryList().getData(), [])
    const userTypeOptions = [{ value: 'client', label: 'client' },{ value: 'suplier', label: 'suplier' }]
    const genderOptions = [{value: 'male', label: 'male'},{value: 'female', label: 'female'}]

    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" htmlFor="fulltName">Full Name </label>
                    <input className="form__input" type="text" value={fulltName} onChange = {(e) => handleInputChange(e)} id="fulltName" placeholder="Full Name"/>
                </div>
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="phoneNumber">
                    <label className="form__label" htmlFor="phoneNumber">Phone number </label>
                    <input  type="text" id="phoneNumber" className="form__input" value={phoneNumber} onChange = {(e) => handleInputChange(e)} placeholder="phoneNumber"/>
                </div>
                <div className="country">
                    <label className="form__label" htmlFor="country">Country </label>
                    <Select id="country" className="form__select" options={countryOptions} value={country} onChange={(e) => handlCountryChange(e)} />
                </div>
                <div className="userType">
                    <label className="form__label" htmlFor="userType">User Type </label>
                    <Select id="userType" className="form__select" options={userTypeOptions} value={userType} onChange={(e) => handlUserTypeChange(e)} />
                </div>
                <div className="gender">
                    <label className="form__label" htmlFor="gender">Gender </label>
                    <Select id="userType" className="form__select" options={genderOptions} value={gender} onChange={(e) => handlGenderChange(e)} />
                </div>
                <div className="description">
                    <label className="form__label" htmlFor="description">Description </label>
                    <input  type="text" id="description" className="form__input" value={description} onChange = {(e) => handleInputChange(e)} placeholder="description"/>
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Register</button>
            </div>
        </div>
       
    )       
}

export default RegistrationForm
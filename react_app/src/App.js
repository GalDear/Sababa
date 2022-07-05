// import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import RegistrationForm from './components/registrationForm';
import GetUser from './components/getUserFrom';
function App() {
  return (
    <div className="App">
      <Header/>
      <RegistrationForm/>
      <GetUser/>
    </div>
  );
}

export default App;

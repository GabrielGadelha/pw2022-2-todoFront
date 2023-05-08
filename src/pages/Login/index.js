import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Topo from '../../components/Topo'
import './style.css'
import api from '../../services/api'

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e){
      e.preventDefault();
      const usu = {email,
      senha};
      
      api.post("/user/login", usu)
      .then((response)=>{
       
          if (response.data) {
            navigate('/entrada');
          }
          else {
            alert("Login ou senha inválidos")
          }
      })
      .catch(error =>{
          alert("Login ou senha inválidos")
          }
      )


}

  return (
      <div>  
        <Topo />
        <div className="central-container">
          <div className="login-container">
            <h1 style={{textAlign: "center"}}>Entrar</h1>
                  <form onSubmit={handleLogin} style={{padding: "30px"}}>
                  <div>
                    <label>E-mail</label> <br />
                    <input style={{background: "#F6F3F3", width: "370px", margin: "5px 0 5px 0"}}
                        value={email} 
                        onChange = {e=>setEmail(e.target.value)}
                          type= "text"
                          />
                  </div>
                  <div>
                    <label>Senha</label> <br />
                    <input style={{background: "#F6F3F3", width: "370px", margin: "5px 0 0 0"}}
                         value={senha}
                         onChange = {e=>setSenha(e.target.value)}
                         type= "password"
                         />
                  </div>
                        <button className="button-submit" type="submit"> Entrar </button>
                  </form>
          </div>
        </div>
      </div> 
    );
}

export default Login;
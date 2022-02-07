import React from 'react';
import handleLogin from '../controller/Login.controller';
import ReactDOM from 'react-dom';

class LoginForm extends React.Component{
    constructor(props) {
      super(props);
      this.state = {email: '',contrasena:''};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      (event.target.name=="email")?this.setState({email: event.target.value}):this.setState({contrasena: event.target.value});
    }
  
    handleSubmit(event){
  
      handleLogin(this.state);
      
      event.preventDefault();
    }
  
    render(){
      return(
  
        <div>
          <form onSubmit={this.handleSubmit}>
  
            <label>
              E-mail
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
            </label>
            <label>
              Password
              <input type="password" name="contrasena" value={this.state.contasena} onChange={this.handleChange}/>
            </label>
            <input type="submit" name="Iniciar sesi&ntildeo;n" />
  
          </form>
          
        </div>
  
    );
    }
  }

  export default LoginForm;
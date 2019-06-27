import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Login extends Component {

    state = {
        mail: '',
        password: '',
        msg: null
    }


    onChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        const { mail, password} = this.state;
        const user = {
            mail,
            password
        }
        this.props.login(user);
        this.props.clearErrors();
    }

  render() {
      
    // eslint-disable-next-line
    let mail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); 
    
    if(this.props.isAuthenticated) return <Redirect to='/dashboard' />
    
    return (
        <div>
            <form onSubmit={this.onSubmit}>
                <h5>LOGIN</h5>
                    <div className="form-group"> 
                    <input onChange={this.onChange} type="email" name="mail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Mail" />
                    {
                        (!mail.test(this.state.mail)) ? 
                            <small id="emailHelp" className="form-text text-muted">Please enter your email address</small>
                            :
                            <small id="emailHelp" className="form-text text-dark">That was great. <i className="fas fa-check"></i></small>

                    }

                    <input onChange={this.onChange}  type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    {
                        this.state.password.length >= 5 && this.state.password.length <= 50 ? 
                        <small id="passwordHelp" className="form-text text-dark">That was great. <i className="fas fa-check"></i></small>
                        : <small id="passwordHelp" className="form-text text-muted">Please enter min 5 chars max 50.</small>
                    }                                           
                        
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({ 
    isAuthenticated: state.auth.isAuthenticated   
    
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
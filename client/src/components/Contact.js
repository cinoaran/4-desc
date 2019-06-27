import React, { Component } from 'react';
import { connect } from 'react-redux';
import "leaflet/dist/leaflet.css";
import ManagementMap from "./map/managementMap";
import { sendContactData } from '../actions/contactActions';
import { clearContact } from '../actions/contactActions';
import { clearErrors } from '../actions/errorActions';


class Contact extends Component {
    state = {
        name: '',
        lastName: '',        
        mail: '',
        comment: ''       
    }


    onChange = e => {        

        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        const { name, lastName, mail, comment} = this.state;
        const mailMessage = {
            name,
            lastName,
            mail,
            comment
        }
        this.props.sendContactData(mailMessage);
        this.props.clearErrors();        
    }

    getAddress = () => {
        if(this.props.management){
            const { address } = this.props.management.details;
            return address
        }
    }

    render() {       
        
        let name = new RegExp(/^[a-zA-ZäÄöÖüÜß ]{3,30}$/i);
        let lastName = new RegExp(/^[a-zA-ZäÄöÖüÜß ]{3,30}$/i);
        // eslint-disable-next-line
        let mail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
             
        return (
            
            <div className="container"> 
               <div className="card p-4">
               {(Object.keys(this.props.contact.msg).length > 0) ? <h5>We got your email <i className="fas fa-check"></i></h5> : <h5>Contact Us</h5> }   
                <ManagementMap getAddress = {this.getAddress()}/>   
                <form onSubmit={this.onSubmit}>
               
                    <div className="form-row">
                        <div className="form-group col-md-6">    
                            <input onChange={this.onChange} type="text" name="name" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Your first name" required/>
                            {
                                (!name.test(this.state.name)) ? 
                                <small id="nameHelp" className="form-text text-muted">Name must contain at least 3 chars</small>
                                :
                                <small id="nameHelp" className="form-text text-dark">That was great. <i className="fas fa-check"></i></small>

                            }
                        
                        </div> 
                        <div className="form-group col-md-6"> 
                            <input onChange={this.onChange} type="text" name="lastName" className="form-control" id="exampleInputLastName" aria-describedby="lastNameHelp" placeholder="Your last name" required />
                            {
                                (!lastName.test(this.state.lastName)) ? 
                                <small id="lastNameHelp" className="form-text text-muted">Last name must contain at least 3 chars</small>
                                :
                                <small id="lastNameHelp" className="form-text text-dark">That was great. <i className="fas fa-check"></i></small>

                            }
                        
                        </div> 
                        <div className="form-group col-md-12">
                        <input onChange={this.onChange} type="email" name="mail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your email" required />
                            {
                                (!mail.test(this.state.mail)) ? 
                                <small id="emailHelp" className="form-text text-muted">Your valid email address please</small>
                                : <small id="emailHelp" className="form-text text-dark">That was great. <i className="fas fa-check"></i></small>
                            }
                        </div>  
                        <div className="form-group col-md-12">
                            <textarea onChange={this.onChange} name="comment" className="form-control" id="exampleComment" aria-describedby="commentHelp" placeholder="Your Comment" required/>
                            
                            {
                                (this.state.comment.length >= 10 && this.state.comment.length <= 200) ? 
                                <small id="commentHelp" className="form-text text-dark">That was great. <i className="fas fa-check"></i></small>
                                : <small id="commentHelp" className="form-text text-muted">Please enter your comments ( max 200 chars )</small>
                                
                            }
                        
                        </div> 

                        <div className="form-group col-md-12">
                            <button className="btn btn-primary btn-block">Send Message</button>
                        </div>
                    </div>    
                </form>
                </div>
            </div>    

                
           
        )
    }
}

const mapStateToProps = state => ({ 
    contact: state.contact,
    management: state.management.data[0]
});

export default connect(mapStateToProps, { sendContactData, clearErrors, clearContact })(Contact)
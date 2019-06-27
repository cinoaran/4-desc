import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOwnerData } from '../actions/ownerActions';

export class CreateOwner extends Component {

    state= {
        companyName: '',
        partner: '',
        web: '',
        mail:'',
        stars: '',
        type: '',
        tel: '',
        fax: '',
        status: "false",
        facility: {},
        credentials: {},
        address: {},
        file: null,
        fileError: null
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    }

    handleChangeCredentials = (e) => {  

        this.setState({ 
        
            credentials: {...this.state.credentials, [e.target.name]:e.target.value}
        })
/*         
        this.setState({
            ...this.state,
            credentials: [
                {
                    
                    mail: ( e.target.name === 'mail') ? e.target.value : this.state.credentials[0].mail,
                    password: ( e.target.name === 'password') ? e.target.value : this.state.credentials[0].password,
                    role: ( e.target.name === 'role') ? e.target.value : this.state.credentials[0].role,
                    logName: ( e.target.name === 'logName') ? e.target.value : this.state.credentials[0].logName
                }
            ]
        }) */ 
    }

    handleChangeAddress = (e) => { 
        
        this.setState({ 
            
            address: {...this.state.address, [e.target.name]:e.target.value}
            
        })
        
    }

    handleChangeFacility = (e) => { 
        
        this.setState({ 
            
            facility: {...this.state.facility, [e.target.name]:e.target.value}
            
        })
        
    }

    handleChangeUpload = (e) => {
        console.log(e.target.files[0].type)
        
        if(e.target.files[0].type !== 'image/png' || e.target.files[0].type !== 'image/gif' || e.target.files[0].type !== 'image/jpeg'){
            this.setState({
                fileError: 'Please select only gif, png, jpeg filetypes',
                
            }) 

        } else {
            this.setState({
                file: URL.createObjectURL(e.target.files[0]),
                fileName: e.target.files[0].name
            }) 
        }
                
        
    } 


    onSubmit = e => {
        e.preventDefault();
        this.props.addOwnerData(this.state);
    }

    render() {
       
        return (
            <div className="container"> 
               <div className="card p-4">
                <h4>Create new owner</h4>    
                  
                <form onSubmit={this.onSubmit}>
                <div className="form-row">
                <h5 className="col-md-12 text-center m-3">Upload owner images</h5>  
                    <div className="col-md-12 custom-control custom-checkbox">
                        <input type="file" className="custom-file-input" id="customFile" onChange= {this.handleChangeUpload } name="file" accept="image/x-png,image/gif,image/jpeg" required/>
                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>                    
                    {   
                            (this.state.file) ? 
                                <img src={this.state.file} alt="preview owner img"/> 
                            : 
                                <i className="fas fa-camera-retro"></i> 
                    } 
                    </div>
                    <h5 className="col-md-12 text-center m-3">Contact and location details</h5>  
                        <div className="form-group col-md-6"> 
                            <input onChange={this.onChange} type="text" name="companyName" className="form-control" id="companyName" aria-describedby="companyNameHelp" placeholder="Company name" required />
                            <small id="companyName" className="form-text text-muted">Company name must contain at least 3 chars</small>
                        </div> 
                        <div className="form-group col-md-6">    
                            <input onChange={this.onChange} type="text" name="partner" className="form-control" id="partner" aria-describedby="partnerHelp" placeholder="Partner name" required/>
                            <small id="partner" className="form-text text-muted">Partner name contain at least 3 chars</small>
                        </div> 
                        <div className="form-group col-md-6">    
                            <input onChange={this.onChange} type="text" name="web" className="form-control" id="url" aria-describedby="urlHelp" placeholder="http://www.owner-name.com" required/>
                            <small id="web" className="form-text text-muted">Name must contain at least 3 chars</small>
                        </div>
                        <div className="form-group col-md-6">
                        <input onChange={this.onChange} type="email" name="mail" className="form-control" id="email" aria-describedby="emailHelp" placeholder="info@owner.com" required />
                            <small id="email" className="form-text text-muted">Valid email address please</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeAddress} type="text" name="street" className="form-control" id="street" aria-describedby="streetHelp" placeholder="Main street 101" required />
                            <small id="street" className="form-text text-muted">Street and number</small>
                        </div>
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeAddress} type="text" name="zip" className="form-control" id="zip" aria-describedby="zipHelp" placeholder="998877" required />
                            <small id="zip" className="form-text text-muted">Zip code</small>
                        </div>  
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeAddress} type="text" name="city" className="form-control" id="city" aria-describedby="cityHelp" placeholder="Berlin" required />
                            <small id="city" className="form-text text-muted">Enter your city</small>
                        </div>
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeAddress} type="text" name="land" className="form-control" id="land" aria-describedby="landHelp" placeholder="Deutschland" required />
                            <small id="land" className="form-text text-muted">Enter your land</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeAddress} type="text" name="lat" className="form-control" id="lat" aria-describedby="latHelp" placeholder="58.98765" required />
                            <small id="lat" className="form-text text-muted">Enter your lat</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeAddress} type="text" name="lng" className="form-control" id="lng" aria-describedby="lngHelp" placeholder="13.54365" required />
                            <small id="lng" className="form-text text-muted">Enter your lng</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.onChange} type="text" name="tel" className="form-control" id="tel" aria-describedby="telHelp" placeholder="0049.30.987.65.43" required />
                            <small id="tel" className="form-text text-muted">Telephone number</small>
                        </div>

                        <div className="form-group col-md-6">
                        <input onChange={this.onChange} type="text" name="fax" className="form-control" id="fax" aria-describedby="faxHelp" placeholder="0049.30.555.66.22" required />
                            <small id="fax" className="form-text text-muted">Fax number</small>
                        </div> 
                        <h5 className="col-md-12 text-center m-3">Type and Facility infos</h5>     
                        <div className="form-group col-md-6">    
                            <select onChange={this.onChange} name="stars" className="form-control" id="stars" aria-describedby="starsHelp" defaultValue="null" required>
                                <option disabled value="null">Please select value</option>
                                <option value="0">0 star</option>
                                <option value="1">1 star</option>
                                <option value="2">2 stars</option>
                                <option value="3">3 stars</option>
                                <option value="4">4 stars</option>                                
                            </select>
                            <small id="starsHelp" className="form-text text-muted">Select stars</small>
                        </div>                        
                        <div className="form-group col-md-6">    
                            <select onChange={this.onChange} name="type" className="form-control" id="type" aria-describedby="typeHelp" defaultValue="null" required>
                                <option disabled value="null">Please select</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Pension">Pension</option>
                                <option value="Boardinghouse">Boardinghouse</option>
                                <option value="Holiday flat">Holiday flat</option>
                            </select>
                            <small id="typeHelp" className="form-text text-muted">Select type</small>
                        </div> 

                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeFacility} type="text" name="checkIn" className="form-control" id="checkIn" aria-describedby="checkInHelp" placeholder="10:00" required />
                            <small id="checkIn" className="form-text text-muted">CheckIn Time</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeFacility} type="text" name="checkOut" className="form-control" id="checkOut" aria-describedby="checkOutHelp" placeholder="14:00" required />
                            <small id="checkout" className="form-text text-muted">Checkout Time</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeFacility} type="text" name="card" className="form-control" id="card" aria-describedby="cardHelp" placeholder="Visa, Amex, Mastercard" required />
                            <small id="card" className="form-text text-muted">Accepted cards</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeFacility} type="text" name="priParking" className="form-control" id="priParking" aria-describedby="priParkingHelp" placeholder="Costs for private parking" required />
                            <small id="priParking" className="form-text text-muted">Private parking costs per day</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeFacility} type="text" name="pubParking" className="form-control" id="pubParking" aria-describedby="pubParkingHelp" placeholder="Costs for public parking" required />
                            <small id="pubParking" className="form-text text-muted">Public parking costs per day</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeFacility} type="text" name="bagage" className="form-control" id="bagage" aria-describedby="bagageHelp" placeholder="Costs for bagage storage" required />
                            <small id="bagage" className="form-text text-muted">Costs for storage per day</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeFacility} type="text" name="reception" className="form-control" id="reception" aria-describedby="receptionHelp" placeholder="Reception Hours" required />
                            <small id="reception" className="form-text text-muted">Time range for reception</small>
                        </div> 
                        <h5 className="col-md-12 text-center m-3">Temporarily Credentials</h5> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeCredentials} type="text" name="mail" className="form-control" id="mail" aria-describedby="mailHelp" placeholder="admin@owner.com" required />
                            <small id="mail" className="form-text text-muted">Login mail</small>
                        </div>  
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeCredentials} type="password" name="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="password" required />
                            <small id="password" className="form-text text-muted">Enter temporarily password</small>
                        </div>             
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeCredentials} type="text" name="role" className="form-control" id="role" aria-describedby="roleHelp" placeholder="role" required />
                            <small id="role" className="form-text text-muted">role</small>
                        </div> 
                        <div className="form-group col-md-6">
                        <input onChange={this.handleChangeCredentials} type="text" name="logName" className="form-control" id="logName" aria-describedby="logNameHelp" placeholder="Login name" required />
                            <small id="logName" className="form-text text-muted">Enter login name</small>
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


export default connect(null, {addOwnerData})(CreateOwner)

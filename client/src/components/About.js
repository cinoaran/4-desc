import React, { Component } from 'react';
import { connect } from 'react-redux';
import loader from '../loader/loader.gif';


class About extends Component {

   render() {
    
        return (
            <div className="container">
                <h5>About</h5>
                {
                (this.props.management) ?
                    <div className="row">
                        <div className="col-md-6">
                            <img src={  this.props.management.vision.image } className="img-fluid rounded float-left our-vision" alt="Our vision"></img>
                        </div>
                        <div className="col-md-6">   
                            <h5>Our Vision</h5>
                            <p>{this.props.management.vision.textDe}</p>
                        </div>
                    
                        <h5 className="col-md-12 text-center">Our Team</h5>
                        <div className="col-md-4">
                            <img src={  this.props.management.who[0].image } className="img-fluid rounded float-left who" alt="Who vision"></img>
                            <p>{this.props.management.who[0].textDe}</p>
                        </div>
                        <div className="col-md-4">
                            <img src={  this.props.management.who[1].image } className="img-fluid rounded float-left who" alt="Who vision"></img>
                            <p>{this.props.management.who[1].textDe}</p>
                        </div>
                        <div className="col-md-4">
                            <img src={  this.props.management.who[2].image } className="img-fluid rounded float-left who" alt="Who we are"></img>
                            <p>{this.props.management.who[2].textDe}</p>
                        </div>
                    </div>    
                       
                    
                : <img src={loader} alt="loading..." />
                
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({ 
    management: state.management.data[0]
  
  });

export default connect(mapStateToProps, null )(About);
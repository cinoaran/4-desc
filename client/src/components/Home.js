import React, { Component } from 'react'
import { connect } from 'react-redux';
import loader from '../loader/loader.gif';
import Carousel from './carousel/Carousel';

import Infopanel from './Infopanel';


class Home extends Component {

  getUrl = () => {
    const getImg = this.props.management.homeSlider.map(items => items.image)
    return getImg;
  }
  getTextEn = () => {
    const text = this.props.management.homeSlider.map(items => items.textEn)
    return text;
  }
  getTextDe = () => {
    const text = this.props.management.homeSlider.map(items => items.textDe)
    return text;
  }   
  
  render() {
  return (
      <div className="container">
        {
          (this.props.management)
          ? 
          <div>
          <div id="top-carousel"> 
          <h5 className="text-center">Welcome to {this.props.management.details.companyName}</h5> 
                  
          <div id="top-carousel">                    
            <Carousel getText={this.getTextDe()} getUrl={this.getUrl()}/>                  
          </div>     
          
          </div>
            <Infopanel /> 
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
export default connect(mapStateToProps, null)(Home);

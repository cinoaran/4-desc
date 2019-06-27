import React from 'react'



const Footer =(props) => {

const date = new Date();
const year = date.getFullYear(); 
  return (
    <footer className="navbar navbar-dark bg-default shadow-sm mt-5">
        <p className="text-center"> <span className='owner-text'>GRAND HOTEL </span> <i className="far fa-copyright"></i>{year}</p>
      
    </footer>
  )
}



export default Footer;
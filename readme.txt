============================================================
POST REQUEST TO http://localhost:9000/api/management/add
ADD MANAGEMENT

{
	"details":{    
    "companyName": "WEB-030",    
    "tel": "0049.30.711.22.33",
    "fax": "0049.30.555.22.55",
    "mail": "info@web-030.com",
    "logo": "/web030/logo.png",
    "address": {
            "street": "Burgerstr 33",
            "zip": "10965",
            "city": "Berlin",
            "land": "Deutschland",
            "lat": "52.613621",
            "lng": "13.485680"
        }

    },

    "credentials":
        {
            "mail": "cino2304@gmail.com",
            "password": "officepassword",
            "role": "office",
            "logName": "officelogname"
        }
    ,

    "homeSlider": [
        {
            "image":"/web030/homeslider/image1.png", 
            "textEn": "Text 1 eng",
            "textDe": "Text 1 de"
        },
        {
            "image":"/web030/homeslider/image2.png",
            "textEn": "Text 2 eng",
            "textDe": "Text 2 de"
        },
        {
            "image":"/web030/homeslider/image3.png",
            "textEn": "Text 3 eng",
            "textDe": "Text 3 de"
        },
        {
            "image":"/web030/homeslider/image4.png",
            "textEn": "Text 4 eng",
            "textDe": "Text 4 de"
        }
    ],
    "web": { 
                        "image": "/web030/infopanel/image1.png", 
                        "textEn": "Info panel text ENG",
                        "textDe": "Info panel text DE"
                    },
    "schedule": { 
                        "image": "/web030/infopanelschedule/image1.png", 
                        "textEn": "Schedule panel text ENG",
                        "textDe": "Schedule text DE"
                    },
    "budget": { 
                        "image": "/web030/infopanelbudget/image1.png", 
                        "textEn": "Budget panel text ENG",
                        "textDe": "Budget text DE"
                    },
    "finance": { 
                        "image": "/web030/infopanelfinance/image1.png", 
                        "textEn": "Budget panel text ENG",
                        "textDe": "Budget text DE"
                    },
    "vision": {

            "image": "/web030/vision/image1.png",
            "textEn": "Vision text ENG",
            "textDe": "Vision text DE"

    },
    "who": [
        {
            "image": "/web030/who/image1.png",
            "textEn": "Who text 1 ENG",
            "textDe": "Who text 1 DE"
        
        },
        {
            "image": "/web030/who/image2.png",
            "textEn": "Who text 2 ENG",
            "textDe": "Who text 2 DE"
        
        },
        {
            "image": "/web030/who/image3.png",
            "textEn": "Who text 3 ENG",
            "textDe": "Who text 3 DE"        
        }
    ],
    "bAccount": {
            "bName": "N26",
            "bNumber": "7879896534",
            "bSepa": "DE 929828727626525424323",
            "bHolder": "Johny Joe"
    }              
		
}

============================================================
POST REQUEST TO http://localhost:9000/api/auth/management

{
            "mail": "cino2304@gmail.com",
            "password": "officepassword"

}

RESPONSE
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZmZhMzI0ZTNkNjczMTk5MzZiNmMxMyIsImlhdCI6MTU2MDMyNTA2OSwiZXhwIjoxNTYwMzMzNjY5fQ.rYWeD1PW4R_rKqb3qHbeKnIMt3LaYn26RsGhPNaTld8",
    "management": {
        "id": "5cffa324e3d67319936b6c13",
        "redirect": "management-board",
        "logName": "officelogname"
    }
}

============================================================

GET REQUEST TO 
http://localhost:9000/api/management

 
============================================================

ADD DATA TO MONGO DB 
mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-pk116.mongodb.net:27017,cluster0-shard-00-01-pk116.mongodb.net:27017,cluster0-shard-00-02-pk116.mongodb.net:27017 --ssl --username cino --password cino-mern-hotel --authenticationDatabase admin --db web_030 --collection managements --type json --file ~/Desktop/PROJECT/project-hotel-server/data/web030.json  





import React, { Component } from 'react'
import { connect } from 'react-redux';
import logo from '../loader/loader.gif';
import Carousel from './carousel/Carousel';

import Infopanel from './Infopanel';

import { getManagementData } from '../actions/managementActions';
class Home extends Component {

  componentDidMount() {
    this.props.getManagementData();    
  }

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
      {console.log(this.getUrl())}      
      {console.log(this.getTextEn())}
      {console.log(this.getTextDe())}                
      <div id="top-carousel">                    
        <Carousel getText={this.getTextDe()} getUrl={this.getUrl()}/>                  
      </div>     
      
      </div>
        <Infopanel />        
      </div>
      
      : <img src={logo} alt="loading..." />
      }
        
      </div>
    )
  }
}
const mapStateToProps = state => ({ 
  management: state.management.data[0]

});
export default connect(mapStateToProps, { getManagementData })(Home);





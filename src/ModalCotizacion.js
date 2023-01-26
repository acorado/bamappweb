/* eslint-disable */
import React from 'react';

import { Button, Drawer, Space } from 'antd';
import axios from 'axios';

const { Meta } = Card;
var id;
export default class ModalCotizacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      dataStore:[]
  
};
this.traerData=this.traerData.bind(this);


}


async traerData()
{

  var a=[];
	try{


await	axios.get('http://localhost:1012/api/autos/'+this.props.id,{
			headers: {
				//'Authorization': 'Bearer ' + Cookies("token")
				//'Authorization' : 'Basic ZWxhc3RpYzpZcDlFaU9PVDZjOWY2V2lqMVlWNUlaMmI='
			}
		})
			.then(res => {
				this.setState({
					 datagrid: res.data 

				});

				//console.log(res.data.hits);

const {datagrid}=this.state;





			})

	}
	catch(err)
	{
		console.error(err);
	}
}




  componentDidMount() {
  try{

    for (var i = 0; i < 1; i++) {
      this.llenarGridData();
      }
  }catch(err){

  }
}

  render() {






    return (
      <>
      
{data}
<Divider/>
      </>
         );
  }
}

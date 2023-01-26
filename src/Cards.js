/* eslint-disable */
import React from 'react';
import {Drawer, Input, Modal, Space } from 'antd';
import { Button, Card, Divider, Select } from 'antd';
import axios from 'axios';



const { Meta } = Card;
var data;
var content;
var model;
var an;
var price;
var brand;
var totalCapital;
var precioint;
var totalFinanciar;
var bancoInteres;
var bancoAnio;
var aseguradoraCuota;
var nombreF;
var dpiF;

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  menu: [],
      datagrid:[],
      visible: false,
      datAuto:[],
      visibleModal: false,
  
};
this.llenarGridData=this.llenarGridData.bind(this);
this.mostrarModal=this.mostrarModal.bind(this);
this.cerrarModal=this.cerrarModal.bind(this);
this.verModalC=this.verModalC.bind(this);
this.cerrarModalC=this.cerrarModalC.bind(this);

}

cerrarModal()
{
  this.setState({visible: false});
}
verModalC()
{
  this.setState({visibleModal: true, visible: false});
  bancoAnio=parseInt(document.getElementById('anios').value);
  console.log(bancoAnio);
  
  bancoInteres=parseFloat(document.getElementById('banco').value);
  aseguradoraCuota=parseInt(document.getElementById('aseguradora').value);
nombreF=document.getElementById('NCompleto').value;
dpiF=document.getElementById('dpi').value;
  console.log(precioint);
  var intprestamo=bancoInteres*bancoAnio;
  var s=precioint*intprestamo;
  console.log(s);
totalCapital=s+parseInt(precioint);
console.log(totalCapital);
var totalseguro=aseguradoraCuota*bancoAnio;
console.log(totalCapital+totalseguro);
totalFinanciar=totalCapital+totalseguro;



}
cerrarModalC()
{
  this.setState({visibleModal: false});

  location.reload();

}




async mostrarModal(id)
{
  console.log(id);

let DataAutomobile;
for (let index = 0; index <2; index++) {
  await	axios.get('https://992c-138-94-254-66.ngrok.io/api/autos/'+id,{
    headers: {
      //'Authorization': 'Bearer ' + Cookies("token")
      //'Authorization' : 'Basic ZWxhc3RpYzpZcDlFaU9PVDZjOWY2V2lqMVlWNUlaMmI='
    }
  })
    .then(res => {
      this.setState({
         datAuto: res.data 

      });

      //console.log(res.data.hits);

const {datAuto}=this.state;
DataAutomobile=[];
DataAutomobile=this.state.datAuto;

console.log(DataAutomobile);


content=(<img src={`data:image/jpeg;base64,${DataAutomobile.imagen}`} />);
model=(<p>Modelo: {DataAutomobile.modelo}</p>);
brand=(<p>Marca: {DataAutomobile.marca}</p>);
price=(<p>Precio: {DataAutomobile.precio}</p>);
precioint=DataAutomobile.precio;

    })

  
}


  this.setState({visible: true});





}

async llenarGridData()
{

  var a=[];
	try{


await	axios.get('https://992c-138-94-254-66.ngrok.io/api/autos',{
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



data=[];
for (var i = 0; i < datagrid.length; i++) {

  console.log(datagrid[i].id);

let a=datagrid[i].id;

data.push(
<Card
   
    style={{ width: 740 }}
    cover={<img src={`data:image/jpeg;base64,${datagrid[i].imagen}`} />}
  >
    <Button onClick={() => this.mostrarModal(a)}>Cotizar</Button> <Button>Reservar</Button> 

    <Meta title={datagrid[i].marca+" Precio: "+datagrid[i].precio} description={"Modelo: "+datagrid[i].modelo} />
  </Card>
  
);



console.log(data);
}

//this.setState({ tables: data });

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

<Space>


      </Space>
      <Drawer
    title="Cotización"
        placement="right"
        open={this.state.visible}
        width={700}
        closable={false}
      >
        {content}
        <Divider/>
        {brand}
        {model}   
        {price}
        <Divider/>

        <Input type='text' placeholder='Nombre Completo' id='NCompleto'></Input>
     
        <Input type='text' placeholder='DPI' id='dpi'></Input>

        <select name="banco" id="banco"  width="120" >
  <option value="0.05">Banco 1</option>
  <option value="0.07">Banco 2</option>
  <option value="0.10">Banco 3</option>

</select>
<select name="aseguradora" id="aseguradora"  width="320" >
  <option value="150">Aseguradora 1</option>
  <option value="75">Aseguradora 2</option>
  <option value="300">Aseguradora 3</option>


</select>
        <select name="anios" id="anios"  width="120" >
  <option value="12">1 año</option>
  <option value="36">3 años</option>
  <option value="60">5 años</option>

</select>
<Divider/>
<Button onClick={() => this.verModalC(price)}>Generar</Button>
 <Button onClick={() => this.cerrarModal()}>Cancelar</Button>
      </Drawer>
<Modal visible={this.state.visibleModal} onCancel={() => this.cerrarModalC()} onOk={() => this.cerrarModalC()} cancelText={"Cancelar"} width={700}>

<h4>
  Hola!!! {nombreF}
  <br/>
  El total a financiar es de {totalFinanciar}
<br/>
Su cuota mensual a {bancoAnio} meses es de: {totalFinanciar/bancoAnio}
<br/>
Seguro vehicular incluido en la cuota, 
</h4>
</Modal>
      </>
         );
  }
}

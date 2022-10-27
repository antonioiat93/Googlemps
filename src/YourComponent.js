import React, { Component } from 'react';
import storeData from "./store_directory.json";
import GoogleMapReact from 'google-map-react';
import { render } from 'react-dom';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A");
Geocode.setLanguage("es");
Geocode.setRegion("mx");

var vari = [];

function eliminarFav(ev){
  var r = confirm("Eliminar de favoritos?");
  if (r == true) {
    var node;
    node=document.getElementById(ev);
    node.parentNode.removeChild(node);
    var tamano = vari.length;
    for(var i = 0; i < tamano; i++){
      if(vari[i]==ev-1){
          vari.splice(i,1);
      }
    }
  }
} 

function agregarFav(ev) {
  var txt;
  var num;
  var i;
  var tamano = vari.length;
  var flag = true;
  var r = confirm("Agregar a favoritos?");
    if (r == true) {
      for(i = 0; i < tamano; i++){
        if(vari[i]==ev){
          flag = false;
        }
      }

      if(flag){
        vari[tamano] = ev;
        num = (ev * 1) +1;
        txt = "Tienda "+num;
        var node = document.createElement("li");
        node.id=num;
        node.addEventListener("click",  function() { eliminarFav(num)});
        var textnode = document.createTextNode(txt);
        node.appendChild(textnode);
        document.getElementById("favorites").appendChild(node);
      }else{
        alert("Esa tienda ya esta en tu lista");
      }
    } 
}



const Marker = (props: any) => {
    const { color, name, id } = props;
    return (
      <div className="marker" class="maker"
        style={{ backgroundColor: color, cursor: 'pointer', width: '10px', height: '10px'}}
        title={name}
        
           />
    );
  };

export default class YourComponent extends Component {
  

  static defaultProps = {
   center: {lat: 19.432608, lng: -99.133209},
   zoom: 12
  }




  render() {
      // fetch('./store_directory.json')
      // .then((res) => res.json())
      // .then((data) => {
      //   for (var i = 0; i < data.length; i++)
      //     {   
      //       var obj = data[i];
      //       Geocode.fromAddress(obj.Address).then(
      //       response => {
      //         let { lat, lng } = response.results[0].geometry.location;
      //         var marcadores = "<Marker lat={"+lat+"} lng={"+lng+"} name="+obj.Name+" color='red' />"
      //         console.log(marcadores);
      //       }
      //       );
      //     }
      //   })
    return (
      <div >
      
        <div style={{ height: '100vh', width: '80%', position: 'absolute', float: 'left' }}>
          <GoogleMapReact 
            bootstrapURLKeys={{
            key: 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A', 
            language: 'en'
            }}
            defaultCenter={this.props.center}
            center={this.props.center}
            defaultZoom={this.props.zoom}
            onChildMouseEnter={this.onChildMouseEnter}
            onChildMouseLeave={this.onChildMouseLeave}
            onChildClick={(ev) => agregarFav(ev)}
          >

          
    


          <Marker
            lat={19.432608}
            lng={-99.133209}
            name="Tienda 1"
            color="red"
          />
          <Marker
            lat={19.435610}
            lng={-99.143220}
            name="Tienda 2"
            color="red"
          />
          <Marker
            lat={19.430610}
            lng={-99.148220}
            name="Tienda 3"
            color="red"
          />
          

          </GoogleMapReact>


        </div>
        <div class="favoritos" id="rooot" style={{ height: '100vh', width: '15%', float: 'right', position: 'absolute',right: '0px' }}>
        <h1>Favoritos</h1>

        <ul id="favorites" >
        </ul>

       </div>
      </div>
    );
  }
}





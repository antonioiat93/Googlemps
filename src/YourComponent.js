import React, { Component } from 'react';
import storeData from "./store_directory.json";

import GoogleMapReact from 'google-map-react';
import { render } from 'react-dom';
import Geocode from "react-geocode";

/*
* Use this component as a launching-pad to build your functionality.
*
*/
const Marker = (props: any) => {
    const { color, name, id } = props;
    return (
      <div className="marker" class="maker"
        style={{ backgroundColor: color, cursor: 'pointer', width: '10px', height: '10px'}}
        title={name}
        
           />
    );
  };



Geocode.setApiKey("AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A");
Geocode.setLanguage("es");
Geocode.setRegion("mx");

var vari = [];

function shoot(ev) {
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
    var node = document.createElement("LI");
    var textnode = document.createTextNode(txt);
    node.appendChild(textnode);
    document.getElementById("favorites").appendChild(node);
    }else{
      alert("Esa tienda ya esta en tu lista");
    }
  } else {
    
  }

}





export default class YourComponent extends Component {
  

  static defaultProps = {
   center: {lat: 19.432608, lng: -99.133209},
   //center: {lat: {lati}, lng: {long}}, 
 
   zoom: 12
  }




  render() {


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
            onChildClick={(ev) => shoot(ev)}
          >



{Object.entries(storeData).map((postData, i) => {


               Geocode.fromAddress(postData.Address).then(
               response => {
                 let { lat, lng } = response.results[0].geometry.location;
               }
             );
           <Marker
   lat= {lat}
             lng= {lng}
             name=  {postData.Name}
             color="blue"

           />

           })}
          
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
          >
          </Marker>

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
          




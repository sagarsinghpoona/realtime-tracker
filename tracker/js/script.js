const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    },(error)=>{
        console.error(error);
    },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    }
)
}

const map = L.map("map").setview([0,0],10);
L.tileLayer("https://{s}.title.opentreetmap.org/{z}/{x}/{y}.png",{
    attribution:"sagar"
}).addTo(map)
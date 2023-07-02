document.getElementById("idEncabezado").innerHTML = /*html*/`
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<div class="container">
  <a class="navbar-brand" href="#">G16 Turismo</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a class="nav-link" href="index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="gastronomia.html">Gastronomia</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="" id="navbarDropdownServicios" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Paseos
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownServicios">
          <a class="dropdown-item" href="paseos.html">Paseos</a>
          
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="lista_paseos.html">Editar Paseos</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="contacto.html">Contacto</a>
      </li>
    </ul>
  

  </div>
</div>
</nav>
 `;

document.getElementById("idFooter").innerHTML = /*html*/`
      <div class="footer-left">
        <p class="copy">G16-Turismo &copy;2023</p>
      </div>

      <div class="footer-center">
        <ul class="redes-sociales">
          <li>
            <a href="http://www.facebook.com"><i class="fa-brands fa-facebook-f"></i></a>
          </li>
          <li>
            <a href="http://www.twitter.com"><i class="fa-brands fa-twitter"></i></a>
          </li>
          <li>
            <a href="http://www.instagram.com"><i class="fa-brands fa-instagram"></i></a>
          </li>
        </ul>
      </div>

      <div class="footer-right">
        <div class="temp"></div>
        <div class="summary"></div>
        <div class="location"></div>
      </div>
  `;


  

  let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin=273.25;


window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      //ID API
      const api_id = "dfa941af2a043b5985b94b62a709bc60";

      const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_id}`;
    
        fetch (url_base)
        .then((response)=>{
            console.log("Respuesta JSON");
         

            return response.json()
        })

        .then((data)=>{
            console.log("ESTA ES LA DATA");
            console.log(data);


            temperature.textContent=
            Math.floor(data.main.temp - kelvin) + "°C";
            
            summary.textContent=data.weather[0].description;
            loc.textContent=data.name + "," + data.sys.country;
        });
    
    
    });
  }
});

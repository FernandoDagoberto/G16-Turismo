document.getElementById("idEncabezado").innerHTML = `
    <div class="contenedor">
        <h1>G16 Turismo</h1>
        
        <input type="checkbox" name="" id="menu-bar" />
        <label for="menu-bar"><i class="fa-sharp fa-solid fa-bars fa-lg"></i></label>
        <nav class="menu">
          <a href="index.html">Inicio</a>
          <a href="paseos.html">Paseos</a>
          <a href="gastronomia.html">Gastronomía</a>
          <a href="contacto.html">Contacto</a>
        </nav>
      </div> `;

document.getElementById("idFooter").innerHTML = /*html*/`
      <div class="footer-left">
        <p class="copy">G16-Turismo &copy;2023</p>
      </div>

      <div class="footer-center">
        <ul class="redes-sociales">
          <li>
            <a href="www.facebook.com"><i class="fa-brands fa-facebook-f"></i></a>
          </li>
          <li>
            <a href="www.twitter.com"><i class="fa-brands fa-twitter"></i></a>
          </li>
          <li>
            <a href="www.instagram.com"><i class="fa-brands fa-instagram"></i></a>
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

console.log(location.search); // lee los argumentos pasados a este formulario
var id = location.search.substr(4);
console.log(id);
const { createApp } = Vue;
createApp({
  data() {
    return {
      id: 0,
      titulo: "",
      descripcion: "",
      imagen:"",
     url: "http://fdiablo1985.pythonanywhere.com/paseos/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.titulo = data.titulo;
          this.descripcion = data.descripcion;
          this.imagen = data.imagen;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      let paseo = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        imagen: this.imagen,
      };
      var options = {
        body: JSON.stringify(paseo),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro modificado");
          window.location.href = "./lista_paseos.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Modificar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
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
      url: "https://fdiablo1985.pythonanywhere.com/paseos/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro modificado',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(function() {
            window.location.href ="./lista_paseos.html";
          }, 2000);
          
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No se pudo actualizar el registro',
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");

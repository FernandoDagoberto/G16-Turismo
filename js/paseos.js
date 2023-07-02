const { createApp } = Vue;

createApp({
  data() {
    return {
      paseos: [],
      url: "https://fdiablo1985.pythonanywhere.com/paseos",
      error: false,

      /*atributos para el guardar los valores del formulario */
      titulo: "",
      descripcion: "",
      imagen: "",
      searchResults: [],
      searchQuery: '',
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.paseos = data;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(paseo) {
      const url = this.url + "/" + paseo;
      var options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          location.reload();
        });
    },

    search() {
      fetch(`/search?q=${this.searchQuery}`)
          .then(response => response.json())
          .then(data => {
              this.searchResults = data;
          })
          .catch(error => {
              console.error('Error en la búsqueda:', error);
          });
  },




    grabar() {
      let paseo = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        imagen: this.imagen,
      };
      var options = {
        body: JSON.stringify(paseo),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado: " + titulo);
          window.location.href = "./lista_paseos.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar " + titulo );
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");

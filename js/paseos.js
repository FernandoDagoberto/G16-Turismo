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
      txtSearch: ''
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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro grabado',
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
            title: 'No se pudo grabar el registro',
            showConfirmButton: false,
            timer: 1500
          });
        });
    },

    buscarPaseos() {
      fetch(`https://fdiablo1985.pythonanywhere.com/paseos/search?q=${this.txtSearch}` )
        .then(response => response.json())
        .then(data => {
          this.paseos = data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  computed: {
    paseosFiltrados() {
      return this.paseos.filter(paseo => {
        const searchTerm = this.txtSearch.toLowerCase();
        return (
          paseo.titulo.toLowerCase().includes(searchTerm) ||
          paseo.descripcion.toLowerCase().includes(searchTerm)
        );
      });
    }
  },
  watch: {
    txtSearch() {
      this.buscarPaseos();
    },
   
  },

  created() {
    this.fetchData(this.url);
  },
}).mount("#app");

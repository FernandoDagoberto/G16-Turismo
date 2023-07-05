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
      search: ''
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

    searchData(){
      // this.fetch();
      if (this.search===""){
        this.fetchData(this.url);
      }else{
        this.paseos=this.paseos.filter(paseo=>{
          const titulo= paseo.titulo.toLowerCase();
          const descrip=paseo.descripcion.toLowerCase();
          const textoBusqueda=this.search.toLowerCase();
          return (
            titulo.includes(textoBusqueda) ||
            descrip.includes(textoBusqueda)
          )
          
        });
      }
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
  },
  
watch:{
    search(newVal){
      this.searchData()
    }
  },

  created() {
    this.fetchData(this.url);
  },
}).mount("#app");

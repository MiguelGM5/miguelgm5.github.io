const climaAPIKey = "776c85b01b9e3ceeefa5372bb58fd2e1";
const climaAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric';

const galeria = [
    {
        "src": "./assets/gallery/image1.jpg",
        "alt": "Thumbnail Image 1"
    },
    {
        "src": "./assets/gallery/image2.jpg",
        "alt": "Thumbnail Image 2"
    },
    {
        "src": "./assets/gallery/image3.jpg",
        "alt": "Thumbnail Image 3"
    }
];

const productos = [
    {
      title: "Hamburguesa con cebolla",
      author: "Carne de Res y cebolla",
      price: 201.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Costra de queso",
      author: "Carne de Res y verdura",
      price: 187,
      image: "./assets/products/img1.png"
    },
    {
      title: "Hamburguesa Sencilla",
      author: "Carne de res y verdura",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Hamburguesa Doble",
      author: "Dos carnes de res",
      price: 349.24,
      image: "./assets/products/img3.png"
    },
    {
      title: "Hamburguesa Vegana",
      author: "Carne vegana",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Kids Meal",
      author: "Mini hamburguesa",
      price: 70,
      image: "./assets/products/img4.png"
    }
];

//Menu

function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    
    document.querySelector("#close-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//Saludo

function saludoHandler(){
    let hora = new Date().getHours();

    let saludo;
    if(hora<12){
        saludo = "Buenos Dias";
    }else if(hora <19){
        saludo = "Buenas Tardes";
    }else if(hora <24){
        saludo = "Buenas Noches";
    }else{
        saludo = "Bienvenido";
    } 

    document.querySelector("#greeting").innerHTML = saludo;
}

//clima

function weatherHandler() {
    navigator.geolocation.getCurrentPosition( position =>{
        console.log(position)
        let latitud = position.coords.latitude;
        let longitud = position.coords.longitude;
        let url = climaAPIURL.replace("{lat}", latitud).replace("{lon}", longitud).replace("{API key}", climaAPIKey); 
    
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const clima = data.weather[0].description;
            const ciudad = data.name;
            const temperatura = data.main.temp;
            
    
            let textoClimaF =  `El clima esta ${clima} en ${ciudad} y estas a  ${tempConvert(temperatura).toFixed(1)}°F afuera.`;
            let textoClimaC =  `El clima esta ${clima} en ${ciudad} y estas a  ${temperatura.toFixed(1)}°C afuera.`;
    
            document.querySelector("p#weather").innerHTML = textoClimaC;
    
            document.querySelector(".weather-group").addEventListener("click", function(e){
            
                if (e.target.id == "celsius") {
                    document.querySelector("p#weather").innerHTML = textoClimaC;
                }else if(e.target.id == "fahr"){
                    document.querySelector("p#weather").innerHTML = textoClimaF;
                }
            });
        }).catch(err => {
            document.querySelector("p#weather").innerHTML = "No se pudo obtener la informacion del clima, intentelo de nuevo mas tarde";  
        });
    }); 
}

//Conversion de temperatura

function tempConvert(temperatura) {
    let far = (temperatura * 9/5) +32;
    return far;    
}

//Reloj

function relojHandler() {
    setInterval(function() {
        let tiempoLocal = new Date();
        document.querySelector("span[data-time=hours]").textContent = tiempoLocal.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = tiempoLocal.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = tiempoLocal.getSeconds().toString().padStart(2,"0");
    }, 1000);
}

//Galeria

function galeriaHandler() {
    let mainImagen = document.querySelector("#gallery > img");
    let mini = document.querySelector("#gallery .thumbnails");
    
    mainImagen.src = galeria[0].src;
    mainImagen.alt = galeria[0].alt;
    
    galeria.forEach(function(image, index){
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false ;
    
        thumb.addEventListener("click", function(e){
            let selected = e.target.dataset.arrayIndex;
            let selectedImagen = galeria[selected];
    
            mainImagen.src = selectedImagen.src;
            mainImagen.alt = selectedImagen.alt;
    
            mini.querySelectorAll("img").forEach(function(img){
                img.dataset.selected = false;
            });
            e.target.dataset.selected = true;
        });
    
        mini.appendChild(thumb);
    });  
}

//Productos

function productoPopulado(productoLista) {

    let productoSection = document.querySelector(".products-area");
    productoSection.textContent = "";
    
    productoLista.forEach(function(producto, index){
        // Crea los elementos html por cada producto individual
        let productoElm = document.createElement("div");
        productoElm.classList.add("product-item");

        // crea imagen del producto
        let productImagen = document.createElement("img");
        productImagen.src = producto.image;
        productImagen.alt = "imagen para "+ producto.title;

        //crear la seccion de detalles del producto
        let productoDetalle = document.createElement("div");
        productoDetalle.classList.add("product-details");

        //crear titulo autor preciotitulo y precio
        let productoTitulo = document.createElement("h3");
        productoTitulo.classList.add("product-title");
        productoTitulo.textContent = producto.title;

        let productoAutor = document.createElement("p");
        productoAutor.classList.add("product-author");
        productoAutor.textContent = producto.author;

        let productoPrecioT = document.createElement("p");
        productoPrecioT.classList.add("price-title");
        productoPrecioT.textContent = "precio";

        let productoPrecio = document.createElement("p");
        productoPrecio.classList.add("product-price");
        productoPrecio.textContent = producto.price > 0 ? "$" + producto.price.toFixed(2) : "GRATIS";

        //Agregar detalles del producto
        productoDetalle.append(productoTitulo);
        productoDetalle.append(productoAutor);
        productoDetalle.append(productoPrecioT);
        productoDetalle.append(productoPrecio);


        // Agrega todos los hijos html del producto
        productoElm.append(productImagen);
        productoElm.append(productoDetalle);
        
        // agregar todos los productos individuales a la seccion de productos
        productoSection.append(productoElm);
    });
}

function productoHandler() {
 
    let productoGratis = productos.filter( item => !item.price || item.price <= 0);
    
    let productoPaga = productos.filter( item => item.price > 0);

    //Ejecuta un bucle a traves de los productos y crea un elemento html para uno de ellos
    productoPopulado(productos);

    //manejo de filtros de todos pagados y gratis
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent=productos.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent=productoPaga.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent=productoGratis.length;

    let productoFiltro = document.querySelector(".products-filter");
    
    productoFiltro.addEventListener("click", function(e) {
        if (e.target.id === "all"){
            productoPopulado(productos);
        } else if (e.target.id === "free") {
            productoPopulado(productoGratis);
        }else if (e.target.id === "paid") {
            productoPopulado(productoPaga);
        }
    });

}

//Pie de pagina

function footerHandler() {
    let añoActual = new Date().getFullYear();
    document.querySelector("footer").textContent = `© ${añoActual} - BIGMACSCOTT All rights reserved`;
}

//Carga de la pagina
menuHandler();
saludoHandler();
relojHandler();
galeriaHandler();
productoHandler();
footerHandler();
weatherHandler();

<template>
  <div class="mt-4 back">
    <div
      class="container"
      style="max-width:1000px; height: 1000px;"
    >
    <b-row>
        <b-col>
          <b-card
            class="mb-2 shadow-lg"
            style="background: rgb(4,35,93);
            background: linear-gradient(115deg, rgba(4,35,93,1) 62%, rgba(255,252,252,1) 100%);
            border: none;
            color: white"
          >
            <b-card-body>
              <h1 class="text-center">Automóviles México</h1>
              <p class="text-center">Aquí podrás encontrar información sobre los automóviles que tenemos disponibles</p>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-card
        class="mb-2 shadow-lg"
        style="background-color: #fff; color: white"
      >
      <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="3000"
            controls
            background="#ababab"
            img-width="500"
            img-height="500"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            class="shadow-lg"
          >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
          </b-carousel>
      </b-card>
      <b-row>
        <b-col cols="12" lg="6">
          <b-col
            class="mb-2 shadow-lg hovered"
            style="background-color: #fff"
          >
            <b-card
              class="mb-2 shadow-lg"
              style="background-color: #04235d; color: white"
              @click="$router.push('/Cars')"
            >
              <b-card-body>
                <h3 class="text-center">Mis automóviles</h3>
              </b-card-body>
            </b-card>
          </b-col>
        </b-col>
        <b-col cols="12" lg="6">
          <b-col
            class="mb-2 shadow-lg hovered"
            style="background-color: #fff"
          >
            <b-card
              class="mb-2"
              style="background-color: #04235d; color: white"
              @click="$router.push('/Save-cars')"
            >
              <b-card-body>
                <h3 class="text-center">Agregar automóvil</h3>
              </b-card-body>
            </b-card>
          </b-col>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="6" v-for="(car) in cars" :key="car.id">
          <b-card
            class="mb-2 shadow-lg"
          >
            <b-row>
              <b-col cols="12" md="4" class="text-center">
                <b-img
                  :src="car.img"
                  thumbnail
                  fluid
                  alt="Image"
                  style="height: 150px !important; width: 150px !important;"
                ></b-img>
              </b-col>
              <b-col cols="12" md="8">
                <b-card-body class="text-center">
                  <h5 class="card-title
                  ">{{ car.brand }} {{ car.model }}</h5>
                  <p class="card-text">Año: {{ car.year }}</p>
                  <p class="card-text">Serie: {{ car.serie }}</p>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-col
            class="mb-2 shadow-lg hovered"
            style="background-color: #fff"
          >
            <b-card
              class="mb-2 shadow-lg"
              style="background-color: #04235d; color: white"
              @click="$router.push('/Cars')"
            >
              <b-card-body>
                <b-row>
                  <b-col cols="12" md="6" lg="4" class="text-left">
                    <label class="mt-2"><b>Información de nosotros</b></label>
                    <small>
                      <p>
                        Somos una empresa dedicada a la venta de automóviles
                        nuevos y usados, con más de 20 años de experiencia en el
                        mercado.
                      </p>
                    </small>
                  </b-col>
                  <b-col cols="12" md="6" lg="4" class="text-center">
                    <label><b>Información de ubicación</b></label>
                    <div style="width: 100%; height: 100%;" class="align-items-center mt-2">
                      <b-img
                        src="https://via.placeholder.com/100"
                        fluid
                        thumbnail
                        alt="Image"
                      ></b-img>
                    </div>
                  </b-col>
                  <b-col cols="12" md="6" lg="4" class="text-center">
                    <label><b>Información de contacto</b></label>
                    <small>
                      <p>
                        Teléfono: 1234567890
                        <br />
                        Correo: user@localhost.com
                      </p>
                    </small>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
        cars: [
          {
            id: 1,
            brand: 'Ford',
            img: 'https://via.placeholder.com/100',
            model: 'Mustang',
            year: 1964,
            serie: '1234567890'
          },
          {
            id: 2,
            brand: 'Chevrolet',
            model: 'Camaro',
            img: 'https://via.placeholder.com/100',
            year: 1967,
            serie: '0987654321'
          },
          {
            id: 3,
            brand: 'Dodge',
            img: 'https://via.placeholder.com/100',
            model: 'Challenger',
            year: 1970,
            serie: '123123123'
          },
          {
            id: 4,
            brand: 'Pontiac',
            img: 'https://via.placeholder.com/100',
            model: 'GTO',
            year: 1964,
            serie: '456456456'
          }
        ]
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style scoped>
.hovered:hover {
  background-color: #8e95a0;
  cursor: pointer;
}
</style>
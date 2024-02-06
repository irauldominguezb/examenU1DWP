<template>
  <div class="container d-flex justify-content-center">
    <b-row>
        <b-col cols="12" class="mt-4">
                <b-breadcrumb :items="routes"></b-breadcrumb>
        </b-col>
        <b-col cols="12">
            <b-overlay :show="isLoading" no-wrap></b-overlay>
            <b-card
                class="shadow-lg bg-white rounded"
            >
                <b-card-title class="text-center">Registrar automóvil</b-card-title>
                <hr>
                <b-row>
                    <b-col cols="12">
                        <b-form>
                            <b-row>
                                <b-col cols="12" lg="6">
                                    <b-form-group
                                        id="fieldset-name"
                                        label-for="input-name"
                                        invalid-feedback="¡Upss..Parece que ese no es una marca válida!"
                                        class="mb-2"
                                    >
                                        <label class="mandatory-field">Marca: </label>
                                        <b-form-input 
                                            id="input-name" 
                                            trim
                                            type="text"
                                            v-model="v$.car.brand.$model"
                                            :state="v$.car.brand.$dirty ? !v$.car.brand.$invalid : null"
                                        >
                                        </b-form-input>
                                       
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12" lg="6">
                                    <b-form-group
                                        id="fieldset-lastname"
                                        label-for="input-lastname"
                                        invalid-feedback="Debes ingresar un modelo válido"
                                        class="mb-2"
                                    >
                                        <label class="mandatory-field">Modelo: </label> 
                                        <b-form-input 
                                            id="input-lastname" 
                                            trim
                                            v-model="v$.car.model.$model"
                                            :state="v$.car.model.$dirty ? !v$.car.model.$invalid : null"
                                            type="text"
                                        >
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="fieldset-manufacturing-date"
                                        label-for="input-manufacturing-date"
                                        class="mb-2"
                                        invalid-feedback="Debes ingresar un año válido"
                                    >
                                        <label  class="mandatory-field">Año de fabricación: </label>
                                        <b-form-input 
                                            id="manufacturing-date" 
                                            type="number"
                                            trim
                                            v-model="v$.car.year.$model"
                                            :state="v$.car.year.$dirty ? !v$.car.year.$invalid : null"
                                            max-length="4"
                                        >
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        id="fieldset-serial"
                                        label-for="input-serial"
                                        class="mb-2"
                                        invalid-feedback="Debes ingresar un número de serie válido"
                                    >
                                        <label  class="mandatory-field">Numero de serie: </label>
                                        <b-form-input 
                                            id="input-serial" 
                                            type="text"
                                            trim
                                            v-model="v$.serial.$model"
                                            max-length="10"
                                            :state="v$.serial.$dirty ? !v$.serial.$invalid : null"
                                            @input="hideLetters(v$.serial.$model)"
                                        >
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="12" class="text-center" >
                                    <b-button variant="primary" class="w-25" @click="saveCar()" :disabled="v$.$invalid">
                                        <b-icon icon="check"></b-icon>
                                            Guardar
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import service from "../../services/Person"
export default {
    name: 'SaveCar',
    setup () {
        return { v$: useVuelidate() }
    },
    data(){
        return {
            car: {
                brand: '',
                model: '',
                year: '',
                serie: ''
            },
            isLoading: false,
            serial: '',
            serialTeporal: '',
            routes: [
                {
                    text: 'Mis automóviles',
                    active: false,
                    to: { path: '/Cars' }
                },
                {
                    text: 'Guardar automóvil',
                    active: true
                }
            ]
            
        }
    },
    methods:{
        hideLetters(value){
            if(value.length === 10){
                this.serialTeporal = value
                const regex = /[a-zA-Z]/g
                this.serial = value.replace(regex, 'X')
            }
        },
        saveCar(){
            this.$swal.fire({
                title: '¿Estás seguro que deseas registrar este automóvil?',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if(result.isConfirmed){
                    try {
                        this.car.serie = this.serialTeporal.toUpperCase()
                        this.showLoading()
                        const {status} = await service.saveCar(this.car)
                        if(status === 200){
                            this.showLoading()
                            this.$swal.fire({
                                title: '¡Éxito!',
                                text: 'Automóvil registrado correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar',
                                cancelButtonText: 'Cancelar',
                                confirmButtonColor: "#ddae23bb",
                                cancelButtonColor: "#691D0B",
                                timer: 3000
                            }).then(() => {
                                this.clearFlieds()
                            })
                        } 
                    } catch (error) {
                        this.showLoading()
                        this.$swal.fire({
                            title: '¡Error!',
                            text: 'Ha ocurrido un error al registrar el automóvil',
                            icon: 'error'
                        })
                    }
                }
            })
        },
        clearFlieds(){
            this.car = {
                brand: '',
                model: '',
                year: '',
                serie: ''
            },
            this.serial = ''
            this.serialTeporal = ''
            this.v$.$reset()
        },
        showLoading(){
            this.isLoading = !this.isLoading
        }
    },
    validations:{
        car: {
            brand: { 
                required,
                valid: (value) => {
                    const format = /^[\p{L}0-9\s]+$/u.test(value)
                    return format
                }
            },
            model: { 
                required,
                valid: (value) => {
                    const format = /^[\p{L}0-9\s]+$/u.test(value)
                    return format
                }
            },
            year: { 
                required,
                valid: (value) => {
                    if(value.length !== 4){
                        return
                    }
                    if(+value > new Date().getFullYear() || +value < 1900){
                        return
                    }
                    const format = /^(?!0000)\d{4}(\d{1,2})?$/.test(value)
                    return format
                }
            }
        },
        serial:{
            required,
            minLength: minLength(10),
        }
    }
}
</script>

<style scoped>
.mandatory-field::after{
    content: '*';
    color: red;
}
</style>
</style>
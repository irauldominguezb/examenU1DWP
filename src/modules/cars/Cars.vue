<template>
    <div class="container">
        <b-row>
            <b-col cols="12" class="mx-4 mt-4">
                <b-breadcrumb :items="routes"></b-breadcrumb>
            </b-col>
            <b-col cols="12">
                <b-card class="m-4 shadow-lg">
                    <template slot="header">
                        <b-row class="px-3 py-2" align-v="center">
                            <b-col md="6"><h4>Automoviles</h4></b-col>
                        </b-row>
                    </template>
                    <b-card-body
                        class="text-center"
                        border-variant="white"
                        header-bg-variant="white"
                        header-text-variant="ssm"
                    >
                        <b-row>
                            <b-col cols="12" class="mb-3" align-items="center">
                                <b-row class="justify-content-end">
                                    <b-col md="6">
                                        <b-form-group label-for="search">
                                            <b-input-group>
                                                <b-form-input
                                                    id="search"
                                                    v-model="value"
                                                    type="search"
                                                    placeholder="Buscar..."
                                                ></b-form-input>
                                                <b-input-group-append>
                                                    <b-button :disabled="!value" @click="value = ''" variant="primary">Limpiar</b-button>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <template>
                            <b-table
                                striped 
                                hover
                                :items="items" 
                                :fields="fields" 
                                class="text-center" 
                                show-empty 
                                bordered 
                                head-variant="true"
                                no-sort-reset
                                responsive
                                no-provider-filtering
                                :current-page="currentPage"
                                :filter="value"
                                :empty-filtered-text="text"
                                :per-page="perPage"

                            >
                                <template v-slot:cell(brand)="data">
                                    <small>{{ data.value }}</small>
                                </template>
                                <template v-slot:cell(model)="data">
                                    <small>{{ data.value.toUpperCase() }}</small>
                                </template>
                                <template v-slot:cell(year)="data">
                                    <small>{{ data.value }}</small>
                                </template>
                                <template v-slot:cell(serie)="data">
                                    <small>{{ hideLetters(data.value) }}</small>
                                </template>
                                <template v-slot:empty>
                                    <div class="col text-center">No hay registros</div>
                                </template>
                            </b-table>
                        </template>
                        <b-row>
                            <b-col cols="12" class="align-items-center">
                                <div class="mt-3">
                                    <b-pagination pills v-model="currentPage" :total-rows="totalRows" align="center"></b-pagination>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import service from "../../services/Person"
export default {
    data(){
        return {
            fields: [
                {
                    key: 'brand',
                    label: 'Marca',
                    sortable: false
                },
                {
                    key: 'model',
                    label: 'Modelo',
                    sortable: false
                },
                {
                    key: 'year',
                    label: 'Año',
                    sortable: false
                },
                {
                    key: 'serie',
                    label: 'Número de serie',
                }
            ],
            value: '',
            currentPage: 1,
            totalRows: 0,
            perPage: 4,
            items: [],
            pagination: {
                size: 4,
                page: 5
            },
            text: 'No hay registros relacionados a tu busqueda',
            routes: [
                {
                    text: 'Inicio',
                    active: false,
                    to: { path: '/' }
                },
                {
                    text: 'Automoviles',
                    active: true
                }
            ]
        }
    },
    methods:{
        async carProvider(){
            try {
                const {data:{content}, totalElements} = await service.getCars()
                this.items = content
                this.totalRows = totalElements
            } catch (error) {
                this.$swal.fire({
                    text: 'valio',
                    icon: 'error'
                })
            }
        },
        hideLetters(value){
            const regex = /[a-zA-Z]/g
            return value.replace(regex, 'X')
        }
    },
    mounted(){
        this.carProvider()
    }
}
</script>

<style>

</style>
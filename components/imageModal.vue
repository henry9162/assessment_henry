<template>
    <modal  
        name="image-modal"  
        :adaptive="true" 
        :scrollable="true" 
        height="auto" 
        transition="fade-transition" 
        @before-open="imageDetails">
        
        <v-card rounded v-if="image != ''" flat>
            <v-img
                :src="image.urls.small"
                :aspect-ratio="1.7"
                
                >
            </v-img>
            <!-- <zoom :img-normal="image.urls.small"></zoom> -->
            <!-- <img :src="image.urls.small" width="100%" height="100%" :alt="image.urls.small"> -->

            <v-card-actions class="pl-8 pt-4 pb-0 custo-caption1 text-h6" v-text="image.user.name"></v-card-actions>
            <v-card-actions 
                class="pl-8 pt-0 pb-5 grey--text text--darken-2 caption" 
                v-text="image.user.location == null ? image.user.bio : image.user.location">
            </v-card-actions>
        </v-card>
    </modal>
</template>

<script>
import zoom from './zoomOnHover'

export default {
    components: { zoom },

    data: () => ({
        image: ''
    }),

    methods: {
        imageDetails(event) {
            this.image = event.params.image;
            console.log(this.image);
        },
    }
}
</script>

<style lang="scss" scoped>
    .custom-caption1 {
        color: #54647C;
    }
</style>
<template>
	<div class="demo">
		<div class="search-div d-flex align-center">
            <v-container>
                <v-btn @click="$router.push({path: '/'})" text rounded small class="custom-darkBlue pb-2">
                   <v-icon left>mdi-arrow-left</v-icon> Back
                </v-btn>
                <div class="white--text search-wrapper">
                    <div class="text-h4 font-weight-bold custom-darkBlue text-capitalize">
                        Search results for 
                        <span class="text-h5 custom-grey" v-text="searchQuery"></span>
                    </div>
                </div>
            </v-container>
		</div>

		<v-container>
			<v-card class="image-section py-4 px-6 white mt-n15">
                <div v-if="results.length <= 0" class="custom-grid">
					<v-skeleton-loader v-for="n in 9" :key="n" type="card"></v-skeleton-loader>
				</div>

				<div v-else class="custom-grid">
					<v-hover v-for="(image, i) in results" :key="i" v-slot:default="{ hover }">
						<v-card 
							class="rounded-lg grid-item" :class="'grid-'+i"
							@click="$modal.show('image-modal', { image: image })" 
							:elevation="hover ? 15 : ''" 
							flat>

							<v-img
								:src="image.urls.thumb"
								class="white--text align-end custom-fit"
								>
								<v-card-title class="halfBlack pl-8 pb-0 pt-5 text-h6" v-text="image.user.name"></v-card-title>
								<v-card-title 
									class="halfBlack pl-8 pt-0 caption" 
									v-text="image.user.location == null ? image.user.bio : image.user.location">
								</v-card-title>
							</v-img>
						</v-card>
					</v-hover>
				</div>
			</v-card>
		</v-container>
		
		<modal />
	</div>
</template>

<script>
import modal from '../components/imageModal' 
export default {
	components: { modal },

	data: () => ({
        query: '',
	}),

	computed: {
		results(){
			return this.$store.getters["api/results"];
        },
        searchQuery(){
            return `"${this.query}"`
        }
	},

	methods: {
		loadResults(){
            this.$store.dispatch("api/getSearchResult", this.query);
		}
	},

	mounted() {
        this.query = this.$route.query.search
        setTimeout(() => {
            this.loadResults()
        }, 4000);
	}
}
</script>

<style lang="scss" scoped>
    .halfBlack {
        background: rgba(black, 0.2) !important;
    }
    .custom-darkBlue {
        color: #253858;
    }
    .custom-grey {
        color: #6F7D93
    }
	.search-div {
		background: #DDE2E9;
		height: 15rem;

		.search-wrapper {
			width: 50%;
		}
	}
    .custom-fit {
		width: 100% !important;
    	height: 100% !important;
    	object-fit: cover;
	}

	.image-section {
		.custom-grid {
			display: grid !important;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(5, 25vw);
			grid-gap: 3rem !important;

			.grid-item {
				&.grid-0 {
					grid-column-start: 1;
    				grid-column-end: 2;
					grid-row-start: 1;
    				grid-row-end: 2;
				}
				&.grid-1 {
					grid-column-start: 2;
    				grid-column-end: 3;
					grid-row-start: 1;
    				grid-row-end: 2;
					height: 32vw !important
				}
				&.grid-2 {
					grid-column-start: 3;
    				grid-column-end: 4;
					grid-row-start: 1;
    				grid-row-end: 2;
				}
				&.grid-3 {
					grid-column-start: 1;
    				grid-column-end: 2;
					grid-row-start: 2;
    				grid-row-end: 3;
				}
				&.grid-4 {
					grid-column-start: 2;
    				grid-column-end: 3;
					grid-row-start: 2;
    				grid-row-end: 3;
					height: 30vw !important;
					margin-top: 5rem;
				}
				&.grid-5 {
					grid-column-start: 3;
    				grid-column-end: 4;
					grid-row-start: 2;
    				grid-row-end: 3;
				}
				&.grid-6 {
					grid-column-start: 1;
    				grid-column-end: 2;
					grid-row-start: 3;
    				grid-row-end: 4;
				}
				&.grid-7 {
					grid-column-start: 2;
    				grid-column-end: 3;
					grid-row-start: 3;
    				grid-row-end: 4;
					height: 28vw !important;
					margin-top: 8rem;
				}
				&.grid-8 {
					grid-column-start: 3;
    				grid-column-end: 4;
					grid-row-start: 3;
    				grid-row-end: 4;
				}
				&.grid-9 {
					grid-column-start: 1;
    				grid-column-end: 2;
					grid-row-start: 4;
    				grid-row-end: 5;
				}
				&.grid-10 {
					grid-column-start: 2;
    				grid-column-end: 3;
					grid-row-start: 4;
    				grid-row-end: 5;
					height: 26vw !important;
					margin-top: 10rem;
				}
				&.grid-11 {
					grid-column-start: 3;
    				grid-column-end: 4;
					grid-row-start: 4;
    				grid-row-end: 5;
				}
            }
		}
	}
</style>
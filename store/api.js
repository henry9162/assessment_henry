const key = '9d4vHwHhuLQvBcmXKFy73ZZTpxwxOyH43IrcEXyhbwE';

export const state = () => ({
    images: [],
    searchResults: [],
    status: false,
    links: {},
    meta: {}
})

export const mutations = {
    setImages(state, data){
        state.images = data.data
        console.log(data.response);
    },
    setResults(state, data){
        state.searchResults = data
        state.status = true
    },
    reset(state){
        state.status = false
        state.searchResults = []
    }
}

export const actions = {
    loadPhotos(context){
        this.$axios.get(`/photos/?page=2&per_page=12&client_id=${key}`).then(response => {
            context.commit('setImages', {response: response, data: response.data})
        }).catch(error => {
            console.log(error)
        })
    },
    getSearchResult(context, query){
        this.$axios.get(`/search/photos/?per_page=12&client_id=${key}&query=${query}`).then(response => {
            context.commit('setResults', response.data.results)
        }).catch(error => {
            console.log(error)
        })
    },
    resetResult(context){
        context.commit("reset")
    }
}

export const getters = {
    images(state){
        return state.images;
    },
    results(state){
        return state.searchResults
    },
    status(state){
        return state.status
    }
}
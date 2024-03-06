export const INITIAL_STATE = {
    title: "",
    desc: "",
    cat: "",
    price: "",
    coverImg: "",
    images: [],
    shortTitle: "",
    shortDesc: "",
    deliveryTime: "",
    revisionNumber: "",
    features: [],
};

export const createGigReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "ADD_IMAGES":
            return {
                ...state,
                images: action.payload.images,
                coverImg: action.payload.coverImg
            }
        case "ADD_FEATURE":
            return {
                ...state,
                features: [...state.features, action.payload]
            }
        case "REMOVE_FEATURE":
            return {
                ...state,
                features: state.features.filter((item) => { return item != action.payload })
            }
        default:
            return state
    }
}


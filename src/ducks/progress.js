export const types = {
    LOADING: 'PROGRESS/LOADING',
    ERROR: 'PROGRESS/ERROR'
}

export const initialState = {
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING:
            return { error: null, loading: action.isLoading }
        case types.ERROR:
            return { ...state, error: action.error }
        default:
            return state;
    }

}

export const actions = {
    setLoading: isLoading => ({ type: types.LOADING, isLoading }),
    raiseError: error => ({ type: types.ERROR, error })
}

export const isLoading = (state) => state.progress.loading;
export const getError = (state) => state.progress.error;
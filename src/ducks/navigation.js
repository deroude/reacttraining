import { getAllPages } from '../services/firestore.service';
import { actions as progress } from './progress';

export const types = {
    NAV_LOAD_PAGES: 'NAV/LOAD_PAGES',
    NAV_LOAD_PAGES_SUCCESS: 'NAV/LOAD_PAGES_SUCCESS',
    NAV_LOAD_PAGES_FAIL: 'NAV/LOAD_PAGES_FAIL',
    NAV_SET_APP_TITLE: 'NAV/SET_APP_TITLE',
    NAV_TO: 'NAV/TO'
}

export const initialState = {
    appTitle: "Mindit React",
    pages: [],
    selectedPage: null,
    error: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.NAV_LOAD_PAGES_SUCCESS:
            return { ...state, pages: action.pages, error: null };
        case types.NAV_LOAD_PAGES_FAIL:
            return { ...state, pages: [], error: action.error };
        case types.NAV_SET_APP_TITLE:
            return { ...state, appTitle: action.title };
        case types.NAV_TO:
            return { ...state, selectedPage: state.pages.find(p => p.name.endsWith("/" + action.page)) };
        default:
            return state;
    }
}

export const actions = {
    loadAllPages: () => (dispatch, getState) => {
        dispatch(progress.setLoading(true));
        getAllPages()
            .then(re => {
                dispatch(actions.loadAllPagesSuccess(re.documents));
                dispatch(progress.setLoading(false));
            })
            .catch(err => {
                dispatch(actions.loadAllPagesFail(err));
                dispatch(progress.setLoading(false));
            })
    },
    loadAllPagesSuccess: pages => ({ type: types.NAV_LOAD_PAGES_SUCCESS, pages }),
    loadAllPagesFail: error => ({ type: types.NAV_LOAD_PAGES_FAIL, error }),
    loadPage: page => ({ type: types.NAV_TO, page }),
    setAppTitle: title => ({ type: types.NAV_SET_APP_TITLE, title })
}

export const getPages = (state) => state.nav.pages;
export const getSelectedPage = (state) => state.nav.selectedPage;
export const getAppTitle = (state) => state.nav.appTitle;
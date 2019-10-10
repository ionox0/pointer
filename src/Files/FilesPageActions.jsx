import axios from 'axios'

import {
    API_URL,
    FILES_ENDPOINT,

    FETCH_FILES_LIST,
    FILES_LIST_FULFILLED,
    FILES_LIST_ERROR,
    SET_OPTION
} from '../constants'


export function loadFilesList(data_for_request) {
    // Todo: what should be in data_for_request?
    return function (dispatch) {

        axios.get(API_URL + FILES_ENDPOINT, {
            params: {
                param_one: unescape(data_for_request),
            }
        }).then((resp) => {
            dispatch({type: FILES_LIST_FULFILLED, payload: resp.data});
        }).catch((err) => {
            dispatch({type: FILES_LIST_ERROR, payload: err});
        });

    }
}

// Set the state with currently selected file
export function selectFile(selected_file) {
    return {
        type: SET_OPTION,
        payload: selected_file
    }
}
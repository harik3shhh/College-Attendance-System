import axios from 'axios';
import {toast} from "react-toastify"
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`http://localhost:5000/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
            toast.success("Login Successful")
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`http://localhost:5000/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
            toast.success("Registration Successful")
        }
        else if (result.data.school) {
            dispatch(stuffAdded());
        }
        else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
    toast.success("Logout Successful")
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`http://localhost:5000/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

// export const deleteUser = (id, address) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.delete(`http://localhost:5000/${address}/${id}`);
//         if (result.data.message) {
//             dispatch(getFailed(result.data.message));
//         } else {
//             dispatch(getDeleteSuccess());
//         }
//     } catch (error) {
//         dispatch(getError(error));
//     }
// }


export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
    toast.success("User Deleted ")
}

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());
    

    try {
        const result = await axios.put(`http://localhost:5000/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
            toast.success("User Updated")
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`http://localhost:5000/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
            toast.success("Successfully Added")
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};
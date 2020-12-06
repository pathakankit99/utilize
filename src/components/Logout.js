import React from 'react'
import { GoogleLogout } from 'react-google-login';
import {useDispatch } from 'react-redux';
import {
    UserLogout
} from '../features/data/dataSlice';
const clientID="257072095912-gnt0o1usdspmu5ehrqtl621jbf0d766e.apps.googleusercontent.com"

function Logout() {
    const dispatch=useDispatch()
    const onSuccess=()=>{
        alert('Logout Success')
        dispatch(UserLogout())
    }
    return (
        <div>
            <GoogleLogout
            clientId={clientID}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            >
            </GoogleLogout>
            
        </div>
    )
}

export default Logout

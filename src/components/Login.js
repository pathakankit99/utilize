import React from 'react'
import {useDispatch } from 'react-redux';
import {
    UserLogIn
} from '../features/data/dataSlice';
import { GoogleLogin } from 'react-google-login';
import {refreshTokenSetup} from '../utils/refreshTokenSetup'
import {useToast} from "@chakra-ui/react"

function Login() {
    const toast = useToast()
    const clientID="257072095912-gnt0o1usdspmu5ehrqtl621jbf0d766e.apps.googleusercontent.com"
    const dispatch = useDispatch()
    const onSuccess= (res) => {
        dispatch(UserLogIn(res.profileObj))        
        toast({
            title: "Login Success",
            description: "",
            status: "success",
            duration: 5000,
            isClosable: false,
          })
        refreshTokenSetup(res)
      }
      const onFailure=(res)=>{
        toast({
            title: "Login Failed",
            description: "Please Try Again",
            status: "error",
            duration: 5000,
            isClosable: false,
          })          
          console.log('Login Failed res:',res)
      }
    return (
        <div className="Login">
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login

//257072095912-gnt0o1usdspmu5ehrqtl621jbf0d766e.apps.googleusercontent.com
//L0BWicAWCrrAOk_JoxiR2out
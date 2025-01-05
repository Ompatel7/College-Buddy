import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';

function LoginSignup() {
    const [login,setLogin] = useState(true);

  return (
    <div>
        {
            login ? <Login setLogin={setLogin}/> : <SignUp setLogin={setLogin}/>
        }
    </div>
  )
}

export default LoginSignup
import axios from "axios";
import { useState } from "react";
import { ErrorToast } from "../toast/toasts";

const Signin = ({ onRouteChange, loadUser  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitSignIn = () => {
        axios.post('http://localhost:3000/signin', {
            email,
            password
          },
          {
            headers: {
                'Content-Type': 'application/json'
            } 
          })
          .then((user) => {
            if (user.data.id) {
                loadUser(user.data)
                onRouteChange('home');
            }
          })
          .catch(err => {
            ErrorToast(err.response.data);
            console.log(err.response.data);
        });
    }

    return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        onChange={onEmailChange} 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email"
                        ame="email-address"  
                        id="email-address" 
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                        onChange={onPasswordChange} 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
                    />
                </div>
                </fieldset>
                <div className="">
                <input 
                    onClick={onSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in" 
                />
                </div>
                <div className="lh-copy mt3">
                    <p 
                        onClick={() => onRouteChange('register')} 
                        className="f6 link dim black db pointer"
                    >
                        Register
                    </p>
                </div>
            </div>
        </main>
    </article>

    );
}
 
export default Signin;
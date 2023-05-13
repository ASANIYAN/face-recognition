import axios from "axios";
import { useState } from "react";
import { ErrorToast } from "../toast/toasts";
import { BASE_URL } from "../../utils/constants";

const Signin = ({ onRouteChange, loadUser  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitSignIn = () => {
        setLoading(true);
        axios.post(`${BASE_URL}/signin`, {
            email,
            password
          },
          {
            headers: {
                'Content-Type': 'application/json'
            } 
          })
          .then((user) => {
            if (user.data.data.id) {
                setLoading(false);
                localStorage.setItem("token", user.data.accessToken)
                loadUser(user.data.data);
                onRouteChange('home');
            }
          })
          .catch(err => {
            setLoading(false);
            ErrorToast( err?.response?.data || "Error signing in");
            console.log(err);
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
                    disabled={loading}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value={ loading ? "Loading..." : "Sign in"} 
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
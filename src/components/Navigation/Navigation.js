import { BASE_URL } from "../../utils/constants";
import { ErrorToast } from "../toast/toasts";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    const handleSignOut = () => {
        const token = localStorage.getItem('token');
        fetch(`${BASE_URL}/logout`,  {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        })
        .then(res => res.json())
        .then(res => {
            if (res === 'logout successful') {
                onRouteChange('signout');   
            }
        })
        .catch(err => {
            ErrorToast(err.message || "Error occurred");
        })
    
    }
    
    return ( <Routes onRouteChange={onRouteChange} isSignedIn={isSignedIn} handleSignOut={handleSignOut} /> );
}

const Routes = ({onRouteChange, isSignedIn, handleSignOut }) => {
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={() => handleSignOut()}
                    className="f3 link dim black underline pa3 pointer"
                >
                    Sign Out
                </p>
            </nav>
        )
    } else {
        return (
            <>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p 
                        onClick={() => onRouteChange('signin')}
                        className="f3 link dim black underline pa3 pointer"
                    >
                        Sign In
                    </p>
                    <p 
                        onClick={() => onRouteChange('register')}
                        className="f3 link dim black underline pa3 pointer"
                    >
                        Register
                    </p>
                </nav>
            </>
        )
    }
    
}
 
export default Navigation;
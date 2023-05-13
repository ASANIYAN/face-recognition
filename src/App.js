import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg';
import { useEffect, useState } from 'react';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import { ErrorToast, SuccessToast } from './components/toast/toasts';
import { BASE_URL } from './utils/constants';

const particleOptions = {
  type: "cobweb",
  bg: true,
}



function App() {

  const [ input, setInput ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ box, setBox ] = useState([]);
  const [ route, setRoute ] = useState('signin');
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ user, setUser ] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const resetState = () => {
    setInput('');
    setImageUrl('');
    setBox([]);
    setRoute('signin');
    setIsSignedIn(false);
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    })
  };


  // handle request to clarifai API
  const calculateFaceLocation = (data) => {
    const clarifaiFace = data;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, "&", height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    })
  }


  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onPictureSubmit = () => {
    setLoading(true);
    displayFaceBox([]);
    setImageUrl(input);
    fetch(`${BASE_URL}/imageurl`,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: input,
      })
    })
    .then(res => res.json())    
    .then((response) => {
          setLoading(false);
          if (response !== 'Failed to complete detection') {
            fetch(`${BASE_URL}/image`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: user.id,
              })
            })
            .then(res => res.json())
            .then(count => {
              setUser(user => ({
                ...user,
                entries: count
              }))
              setLoading(false);
            })
            .catch(err => {
              ErrorToast(err)
              setLoading(false);
              console.log(err)
            })
            SuccessToast('Operation Successful');
            const regions = response?.outputs[0].data?.regions?.map(item => item.region_info.bounding_box);
            const LocatedFaces = [];
            regions?.map(item => LocatedFaces.push(calculateFaceLocation(item)));
            displayFaceBox(LocatedFaces);
          } else {
            ErrorToast(response);
          }
        })
        .catch(error =>  {
          ErrorToast(error);
          console.log(error)
        });
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      resetState();
      localStorage.removeItem("token");
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${BASE_URL}`,  {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(res => {
        loadUser(res.data);
        setIsSignedIn(true)
        setRoute('home');
      })
      .catch(err => {
        resetState();
        console.log(err);
      })
    } else {
      resetState();
    }
  }, []);

  return (
    <div className="App">
      <ParticlesBg  
        type={particleOptions.type} 
        bg={particleOptions.bg} 
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      { route === 'home' &&
        <>
          <Logo /> 
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm loading={loading} onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
          <FaceRecognition boxes={box} imageUrl={imageUrl} />
        </>
      }

      { (route === 'signin' || route === 'signout') && <Signin onRouteChange={onRouteChange} loadUser={loadUser} />  }
      { route === 'register' && <Register onRouteChange={onRouteChange} loadUser={loadUser} /> }


    </div>
  );
}

export default App;

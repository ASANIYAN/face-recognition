import { useEffect } from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxes }) => {
    useEffect(() => {
        window.scrollTo({
            top: document.getElementById('image-section').offsetTop,
            behavior: 'smooth'
          });
    }, [boxes]);
    return (
        <div className="center ma" id='image-section'>
            <div className="relative mt2">
                <img
                id="inputImage"
                src={imageUrl} 
                alt={""}
                width={'500px'}
                height={'auto'}
                />
                { boxes && boxes.map((box, id) => (
                    <div
                    key={id} 
                    className="bounding-box"
                    style={{
                        top: box.topRow, 
                        right: box.rightCol, 
                        bottom: box.bottomRow, 
                        left: box.leftCol
                    }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
 
export default FaceRecognition;
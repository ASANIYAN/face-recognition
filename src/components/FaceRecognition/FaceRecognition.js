import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className="center ma">
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
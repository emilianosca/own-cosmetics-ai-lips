// Face system determines the logic to get the face of the player and coordinates of the lips
// After detection of lips and face, face system will call the mouth system to draw the mouth

function mainFaceSystem() { 
    $(document).ready(function(){

        async function face(){
    
            const MODEL_URL = '/models'
    
            await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
            await faceapi.loadFaceLandmarkModel(MODEL_URL)
            await faceapi.loadFaceRecognitionModel(MODEL_URL)
            await faceapi.loadFaceExpressionModel(MODEL_URL)
    
            const img= document.getElementById('originalImg')
            let faceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().withFaceExpressions()
            const canvas = $('#reflay').get(0)
            faceapi.matchDimensions(canvas, img)
            faceDescriptions = faceapi.resizeResults(faceDescriptions, img)
    
            const landmarks = faceDescriptions.map(fd => fd.landmarks)
            const mouth = landmarks.map(lm => lm.getMouth())
            console.log("2 mouth coords are " + landmarks)
            console.log("INTO mouth coords are " + mouth[0]._x)
            console.log("INTO mouth landmarks are " + landmarks )
            console.log("INTO canvas is " + canvas)

        
            var mouthCoordinates =  mouthSetter(mouth[0])
            var canvasCoordinates = canvasSetter(canvas)
            let canvasCTX = canvasCoordinates.getContext('2d')

            drawLips(mouthCoordinates, canvasCTX, 'red');
            fillLips(mouthCoordinates, canvasCTX, 'blue');

            paintColor(mouthCoordinates, canvasCTX);    
        }
        
        face()    
    
    })
}


function mouthSetter(mouth){
    if (mouth.length == 0){
        console.log("mouth is empty")
    }
    else {
        return mouth
    }
}


function canvasSetter(canvas){
    console.log("--- canvas is " + canvas)
    return canvas
}

// draw the complete lips given mouth coordinates
const drawLips = (mouth, canvasCTX, color) => {
    const ctx = canvasCTX
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(mouth[0]._x, mouth[0]._y)
    for (let i = 1; i < mouth.length; i++) {
        ctx.lineTo(mouth[i]._x, mouth[i]._y)
    }
    ctx.lineTo(mouth[0]._x, mouth[0]._y)
    ctx.stroke()
}

// fill the lips given mouth coordinates
const fillLips = (mouth, canvasCTX, color) => {
    const ctx = canvasCTX
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(mouth[0]._x, mouth[0]._y)
    for (let i = 1; i < mouth.length; i++) {
        ctx.lineTo(mouth[i]._x, mouth[i]._y)
    }
    ctx.lineTo(mouth[0]._x, mouth[0]._y)
    ctx.fill()
}


function paintColor(mouthCoordinates,canvasCTX){ 
    let colorPicker = new iro.ColorPicker('#picker', {
        layout: [
            {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'hue',
                  sliderSize: 35,
                }
              },
              {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'saturation',
                  sliderSize: 35,
                  
                }
              },
      
              {
                component: iro.ui.Slider,
                options: { 
                  sliderType: 'value',
                  sliderSize: 35,
                }
              },
        ]
      });
        
        colorPicker.on('color:change', function(color) {
        drawLips(mouthCoordinates, canvasCTX, color.hexString);
        fillLips(mouthCoordinates, canvasCTX, color.hexString);
        return color.hexString;
      });
}



export default function mainProcess(){
    console.log("Main process is running")
    mainFaceSystem();
}

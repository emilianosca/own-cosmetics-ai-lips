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
        // faceapi.draw.drawDetections(canvas, faceDescriptions)
        // faceapi.draw.drawFaceLandmarks(canvas, faceDescriptions)
        // faceapi.draw.drawFaceExpressions(canvas, faceDescriptions

        const landmarks = faceDescriptions.map(fd => fd.landmarks)
        const mouth = landmarks.map(lm => lm.getMouth())
    
        // function that draw the mouth given mouth coordinates 
        // const drawMouth = (mouth) => {
        //     const ctx = canvas.getContext('2d')
        //     ctx.strokeStyle = 'red'
        //     ctx.lineWidth = 2
        //     ctx.beginPath()
        //     ctx.moveTo(mouth[0]._x, mouth[0]._y)
        //     for (let i = 1; i < mouth.length; i++) {
        //         ctx.lineTo(mouth[i]._x, mouth[i]._y)
        //     }
        //     ctx.lineTo(mouth[0]._x, mouth[0]._y)
        //     ctx.stroke()
        // }
        // drawMouth(mouth[0])


        // draw the complete lips given mouth coordinates
        const drawLips = (mouth) => {
            const ctx = canvas.getContext('2d')
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(mouth[0]._x, mouth[0]._y)
            for (let i = 1; i < mouth.length; i++) {
                ctx.lineTo(mouth[i]._x, mouth[i]._y)
            }
            ctx.lineTo(mouth[0]._x, mouth[0]._y)
            ctx.stroke()
        }
        drawLips(mouth[0])


        // fill the lips given mouth coordinates
        const fillLips = (mouth) => {
            const ctx = canvas.getContext('2d')
            ctx.fillStyle = 'black'
            ctx.beginPath()
            ctx.moveTo(mouth[0]._x, mouth[0]._y)
            for (let i = 1; i < mouth.length; i++) {
                ctx.lineTo(mouth[i]._x, mouth[i]._y)
            }
            ctx.lineTo(mouth[0]._x, mouth[0]._y)
            ctx.fill()
        }
        fillLips(mouth[0])
    
        // const labels = ['ross', 'rachel', 'chandler', 'monica', 'phoebe', 'joey']

        // const labeledFaceDescriptors = await Promise.all(
        //     labels.map(async label => {

        //         const imgUrl = `images/${label}.jpg`
        //         const img = await faceapi.fetchImage(imgUrl)
                
        //         const faceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                
        //         if (!faceDescription) {
        //         throw new Error(`no faces detected for ${label}`)
        //         }
                
        //         const faceDescriptors = [faceDescription.descriptor]
        //         return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
        //     })
        // );

        // const threshold = 0.6
        // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, threshold)

        // const results = faceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

        // results.forEach((bestMatch, i) => {
        //     const box = faceDescriptions[i].detection.box
        //     const text = bestMatch.toString()
        //     const drawBox = new faceapi.draw.DrawBox(box, { label: text })
        //     drawBox.draw(canvas)
        // })

    }
    
    face()


})
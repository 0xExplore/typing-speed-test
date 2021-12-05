let tmpText = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime velit ad a fugit vero expedita nihil pariatur, accusantium non hic est animi vitae quisquam doloremque odit ea id modi quis."
// const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'

const displayTextElement = document.getElementById('displayText')
const inputTextElement = document.getElementById('inputText')
const timerElement = document.getElementById('timer')
const speedElement = document.getElementById('speed')
const gageElement = document.getElementById('gage')
const timerGageElement = document.getElementById('timer-gage')

// result element
const resultSpeedElement = document.getElementById('y-speed')
const resultAccuracyElement = document.getElementById('accuracy')




// function getRandomQuote() {
//     return fetch(RANDOM_QUOTE_API_URL)
//       .then(response => response.json())
//       .then(data => data.content)
//   }
// rendering text to Display
function renderDisplayText(){
    // const quote = await getRandomQuote()

    // clearing displayed/typed text and rendring new text
    displayTextElement.innerText = ""
    inputTextElement.value = null
    // quote.split('').forEach(character => {
    //     const charSpan = document.createElement('span')
    //     charSpan.innerText = character
    //     displayTextElement.appendChild(charSpan)
    // })
    tmpText.split('').forEach(character => {
        const charSpan = document.createElement('span')
        charSpan.innerHTML = character
        displayTextElement.appendChild(charSpan)
    })
}
renderDisplayText()

// checking for correct or incorrect characters
let charsTyped = 0
inputTextElement.addEventListener('input', () => {
    const arrayText = displayTextElement.querySelectorAll('span')
    const arrayValue = inputTextElement.value.split('')
    
    
    // speedElement.innerText = livespeed;
    charsTyped+=1
    let correct = true
    arrayText.forEach((charSpan, index) =>{
        let character = arrayValue[index]

        
        if(character == null){
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            correct = false
        }
        else if(character === charSpan.innerHTML){
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        }
        else {
            charSpan.classList.remove('correct')
            charSpan.classList.add('incorrect')
            correct = false
        }     
    })

    // clearing old text    
    if(correct) renderDisplayText()

})
// live speed update
let livespeed = setInterval(() => {
    // showing speed
    livespeed = calculateSpeed(charsTyped, usedTime)
    speedElement.innerText = livespeed;
    // updating timer gage position
    gageposition = -34+(livespeed*1.78)
    gageElement.style.transform = "rotate("+ gageposition +"deg)"
}, 100);


// start timer
let timer = setInterval(startTimer,1000);
// initializing time in Seconds
let time = 60
let usedTime = 0
let oneSecGage = 126/time
let timerGagePosition = 140
function startTimer(){
    timerElement.innerHTML = time
    timerGageElement.style.transform = "rotate("+timerGagePosition+"deg)"
    timerGagePosition-=oneSecGage
    time-=1
    usedTime+=1
    if(time < 0) {
        clearInterval(timer)
        
        let finalSpeed = calculateSpeed(charsTyped, usedTime)
        resultSpeedElement.innerText = finalSpeed
        let accuracy = (document.querySelectorAll('.correct').length/charsTyped)*100
        resultAccuracyElement.innerText = Math.round(accuracy)

        document.getElementById('text-container').innerHTML = document.getElementById('result').innerHTML
            
    }
}

// calculating speed
function calculateSpeed(typedCharacters, timeTaken){
    let speed = (typedCharacters/5)/(timeTaken*(1/60))
    if(timeTaken < 0) speed = 0
    // if (time < 0) speed = 0
    return Math.floor(speed)
}




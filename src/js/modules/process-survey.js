import * as basicLightbox from 'basiclightbox'

export const processSurvey = () => {
  
  let instance

  if(document.getElementById('navilark')){
    
    // Declare tab variable
    const tab = document.querySelectorAll(".lark-tab")
    // Declare inputs 5*3
    const surveyQuestions = document.querySelectorAll('input[type=radio]')
    
    // Set tab
    let currentTab = 0;

    showTab(currentTab);

    // Set buttons
    document.getElementById('prevBtn').addEventListener('click', ()=>{nextPrev(-1)} )
    document.getElementById('nextBtn').addEventListener('click', ()=>{nextPrev(1)} )

    

    // Control radios
    if(surveyQuestions){
        
      const surveyAns = Array.from(surveyQuestions)    
      
      surveyAns.map( valor => {
        valor.addEventListener('click', () => {            
          removeAndActiveRadio()
        })      
      })
      
      
      function removeAndActiveRadio(){
        surveyAns.map( valor => {
          valor.parentNode.classList.remove("active-radio")     
          // console.log('estoy borrando todos') 
          if(valor.checked){
            valor.parentNode.classList.add("active-radio")
            // console.log('He activado al radio')
          }
        })   
      }

    }



    // Display tab
    function showTab(n) {
      tab[n].style.display = "block";
      if (n == 0) {
        document.querySelector("#prevBtn").style.display = "none";
      } else {
        document.querySelector("#prevBtn").style.display = "block";
      }
      if (n == tab.length - 1) {
        document.querySelector("#nextBtn").innerHTML = "Enviar";
      } else {
        document.querySelector("#nextBtn").innerHTML = "Continuar";
      }
      fixStepIndicator(n);
    }
    // Show correct tab
    function nextPrev(n) {
      if (n == 1 && !validateForm()) return false;
      tab[currentTab].style.display = "none";
      currentTab = currentTab + n;
      if (currentTab >= tab.length) {
        
        tab[currentTab-1].style.display = "block";
        // Enganchar el modal de registro
          instance = basicLightbox.create(
            document.querySelector('.lark-register'),{
            closable: false,
            onClose: (instance) => {              
              location.href = "/felicidades";
            }
        }
        )
        instance.show()

        return
      }
      showTab(currentTab);
    }
    //  Form validation
    function validateForm() {
      let valid = true;      
      const inputs = tab[currentTab].querySelectorAll("input, select, textarea");
      
      if (!document.querySelector("input[type=radio][name="+inputs[0].name+"]:checked")
      ) {
        warning();
        valid = false;
      }
      function warning() {
          const instance = basicLightbox.create(`
            <img class="img-fluid mx-auto d-block" src="assets/img/santa.png" alt="Momentos Navilark" style="width:50%"/>  
            <h1 class="navilark-pop"> Ho-ho-ho </h1>
            <p class="navilark-pop_text">Para continuar...debes de responder a la pregunta</p>
            
          `)
          instance.show()          
        }

      // Add active class if valid
      if (valid) {
        document.querySelectorAll(".step")[currentTab].className += " finish";
      }
      // return the valid status
      return valid;
    }
    // Remove active class
    function fixStepIndicator(n) {
      const steps = document.querySelectorAll(".step");
      steps.forEach(step => {
        step.className = step.className.replace(" active", "");
      })
      steps[n].className += " active";
    }

    document.querySelector('.lark-register')
    {
      
      var questions = [
        {question:"¿Cuál es tu nombre y apellido?"},
        {question:"¿Cuál es tu número de contacto?"},
        {question:"¿Cuál el es tu correo?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
        {question:"Indicanos tu DNI"}
      ]
  
      /*
        do something after the questions have been answered
      */
      var onComplete = function( msg ) {
  
          var response = document.getElementById('responseText')
          // progress.appendChild(h1)
          response.innerText = msg                            
  
      }
  
      ;(function(questions, onComplete) {
  
          var tTime = 100 // transition transform time from #register in ms
          var wTime = 200 // transition width time from #register in ms
          var eTime = 1000 // transition width time from inputLabel in ms
  
          // init
          // --------------
          if (questions.length == 0) return
  
          var position = 0
  
          putQuestion()
  
          forwardButton.addEventListener('click', validate)
          inputField.addEventListener('keyup', function(e) {
              transform(0, 0) // ie hack to redraw
              if (e.keyCode == 13) validate()
          })
  
          previousButton.addEventListener('click', function(e) {
              if (position === 0) return
              position -= 1
              hideCurrent(putQuestion)
          })
  
  
          // functions
          // --------------
  
          // load the next question
          function putQuestion() {
              inputLabel.innerHTML = questions[position].question
              inputField.type = questions[position].type || 'text'
              inputField.value = questions[position].answer || ''
              inputField.focus()
  
              // set the progress of the background
              progress.style.width = position * 100 / questions.length + '%'
  
              previousButton.className = position ? 'ion-android-arrow-back' : 'ion-person'
  
              showCurrent()
  
          }
  
          // when submitting the current question
          function validate() {
  
              var validateCore = function() {      
                return inputField.value.match(questions[position].pattern || /.+/)
              }
  
              if (!questions[position].validate) questions[position].validate = validateCore
  
              // check if the pattern matches
              if (!questions[position].validate()) wrong(inputField.focus.bind(inputField))
              else ok(function() {
  
                  // execute the custom end function or the default value set
                  if (questions[position].done) questions[position].done()
                  else questions[position].answer = inputField.value
  
                  ++position
  
                  // if there is a new question, hide current and load next
                  if (questions[position]) hideCurrent(putQuestion)
                  else hideCurrent(function() {
                      // remove the box if there is no next question
                      
                      progress.style.width = '100%'

                      let name =  questions[0].answer,
                          movil = questions[1].answer,
                          email = questions[2].answer,
                          dni = questions[3].answer,
                          q1 = document.querySelector('[name="q1"]:checked').value,
                          q2 = document.querySelector('[name="q2"]:checked').value,
                          q3 = document.querySelector('[name="q3"]:checked').value,
                          q4 = document.querySelector('[name="q4"]:checked').value,
                          q5 = document.querySelector('[name="q5"]:checked').value,
                          data = JSON.stringify({
                            "name": name, 
                            "email": email, 
                            "movil": movil, 
                            "dni": dni, 
                            "q1": q1, 
                            "q2": q2, 
                            "q3": q3, 
                            "q4": q4,
                            "q5": q5
                          })
                          
                      sendDataToApi( data )
                                         
                  })
  
              })
  
          }

          function sendDataToApi( signup ){
            //Agregar la funcionalidad para registrar el usuario

            let request = new XMLHttpRequest(),
                url = '/survey-end'

            request.open('POST', url, true);            
            request.setRequestHeader("Content-Type", "application/json");
            
            // Response

            request.onreadystatechange = function () {
              const DONE = 4, // readyState 4 means the request is done.
                    OK = 200 // status 200 is a successful return.
              if (request.readyState === DONE && request.status === OK) {
                  var jsonData = JSON.parse(request.response);
                  // console.log(jsonData);
                  if( jsonData.result ===  'exito'){
                    register.className = 'close'
                    onComplete( 'Gracias ' + questions[0].answer + ' para participar compártelo en tu muro!' )
                    
                    // Cierra el modal despues de 7 sec
                    setTimeout(function() {                                                
                      instance.close()                                    
                    }, 7000)                                                                    
                  }

                  if( jsonData.result ===  'email_duplicado'){                    
                      inputContainer.style.opacity = 1                    
                      inputProgress.style.width = '100%'                      
                  
                    onComplete( 'El correo ' + questions[2].answer + ' ya se encuentra registrado' )
                  }

                  if( jsonData.result ===  'dni_duplicado'){
                    inputContainer.style.opacity = 1                    
                      inputProgress.style.width = '100%'
                    onComplete( 'El DNI ' + questions[3].answer + ' ya se encuentra registrado' )
                  }
              }
            }

            // end response
            request.send(signup)
            
          }
  
  
          // helper
          // --------------
  
          function hideCurrent(callback) {
              inputContainer.style.opacity = 0
              inputLabel.style.marginLeft = 0
              inputProgress.style.width = 0
              inputProgress.style.transition = 'none'
              inputContainer.style.border = null
              setTimeout(callback, wTime)
          }
  
          function showCurrent(callback) {
              inputContainer.style.opacity = 1
              inputProgress.style.transition = ''
              inputProgress.style.width = '100%'
              setTimeout(callback, wTime)
          }

          
  
          function transform(x, y) {
              register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
          }
  
          function ok(callback) {
              register.className = ''
              setTimeout(transform, tTime * 0, 0, 10)
              setTimeout(transform, tTime * 1, 0, 0)
              setTimeout(callback, tTime * 2)
          }
  
          function wrong(callback) {
              register.className = 'wrong'
              for (var i = 0; i < 6; i++) // shaking motion
                  setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0)
              setTimeout(transform, tTime * 6, 0, 0)
              setTimeout(callback, tTime * 7)
          }
  
      }(questions, onComplete))
    }

  }
}

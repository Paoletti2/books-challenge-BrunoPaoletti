window.onload = function(){
    const form = document.querySelector('form')
       form.addEventListener('submit', async (e) => {
          e.preventDefault()

           const name = document.querySelector('#name')
           const email = document.querySelector('#email')
           const password = document.querySelector('#password')
           const country = document.querySelector('#country')
           const erroresLista = document.querySelector('.erroresLista')
           const admin = document.querySelector('#admin')
           const user = document.querySelector('#user')


           let errores = []

           if (name.value == '') {
           errores.push('You must fill in the "Full Name" field')
               name.classList.add('is-invalid')
               name.classList.remove('is-valid') 
           } else {
               name.classList.remove('is-invalid')
               name.classList.add('is-valid')
           }

           if (name.value.length < 2) {
            errores.push('The "Full Name" field must have at least 2 characters')
                name.classList.add('is-invalid')
                name.classList.remove('is-valid') 
            } else {
                name.classList.remove('is-invalid')
                name.classList.add('is-valid')
            }

            if (email.value == '') {
                errores.push('"You must fill in the "E-mail" field')
                    name.classList.add('is-invalid')
                    name.classList.remove('is-valid') 
                } else {
                    name.classList.remove('is-invalid')
                    name.classList.add('is-valid')
                }

                 
            if (email.validity.typeMismatch) {
                errores.push('The E-mail is not valid');
            }else {
                name.classList.remove('is-invalid')
                name.classList.add('is-valid')
            } 

            if (country.value == '') {
                errores.push('You must fill in the "Full Name" field')
                    country.classList.add('is-invalid')
                    country.classList.remove('is-valid') 
                } else {
                    country.classList.remove('is-invalid')
                    country.classList.add('is-valid')
                }
     
                if (country.value.length < 2) {
                    errores.push('The "Full Name" field must have at least 2 characters')
                    country.classList.add('is-invalid')
                    country.classList.remove('is-valid') 
                 } else {
                    country.classList.remove('is-invalid')
                    country.classList.add('is-valid')
                 }


            if (password.value == '') {
                 errores.push('You must fill in the "Password" field')
                    password.classList.add('is-invalid')
                    password.classList.remove('is-valid') 
                } else {
                    password.classList.remove('is-invalid')
                    password.classList.add('is-valid')
                }

            if (password.value.length < 8) {
                errores.push('The "Password" field must have at least 8 characters')
                password.classList.add('is-invalid')
                password.classList.remove('is-valid') 
                } else {
                password.classList.remove('is-invalid')
                password.classList.add('is-valid')
                }

                console.log(admin)
                console.log(user)
            if (admin.checked || user.checked) {
                
            }
            else {
                errores.push('You must choose a category')
            }


            if (errores.length > 0) {
               erroresLista.innerHTML =  ` ` 
               for (let error of errores) {
                   erroresLista.innerHTML += `<ul><li>${error}</li></ul>`
               }
           } else{
               erroresLista.innerHTML = ` `
               form.submit()
           } 
       })
}
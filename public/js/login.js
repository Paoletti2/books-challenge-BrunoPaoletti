window.onload = () => {
    const form = document.querySelector('.form-login');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const erroresLista = document.querySelector('.erroresLista');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      let errores = []

      if(email.value == '') {
        errores.push('You must fill in the Email');
        email.classList.add('is-invalid')
        email.classList.remove('is-valid')
      } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
      }



      if(password.value == '') {
        errores.push('Enter the password');
        email.classList.add('is-invalid')
        email.classList.remove('is-valid')
      } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
      }

      if (errores.length > 0) {
        erroresLista.innerHTML =  ` `
        for (let error of errores) {
            erroresLista.innerHTML += `<li>${error}</li>`
        }
      } else {
        erroresLista.innerHTML +=  ` `
        form.submit()
      } 
    })
}
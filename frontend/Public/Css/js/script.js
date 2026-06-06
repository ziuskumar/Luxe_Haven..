// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

document.querySelectorAll('[data-password-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.parentElement.querySelector('input')
    const icon = button.querySelector('i')

    if (!input || !icon) return

    const isPassword = input.type === 'password'
    input.type = isPassword ? 'text' : 'password'
    icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'
    button.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password')
  })
})

document.querySelectorAll('[data-auth-shell]').forEach(shell => {
  shell.addEventListener('mousemove', event => {
    const rect = shell.getBoundingClientRect()
    const mouseX = ((event.clientX - rect.left) / rect.width) * 100
    const mouseY = ((event.clientY - rect.top) / rect.height) * 100

    shell.style.setProperty('--mouse-x', `${mouseX}%`)
    shell.style.setProperty('--mouse-y', `${mouseY}%`)
  })
})

const input = document.querySelector('#state-input')
const button = document.querySelector('#fetch-alerts')
const displayDiv = document.querySelector('#alerts-display')
const errorDiv = document.querySelector('#error-message')

button.addEventListener('click', () => {
  const state = input.value

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(res => res.json())
    .then(data => {
      const alerts = data.features

      displayDiv.textContent = `Weather Alerts: ${alerts.length}`

      alerts.forEach(alert => {
        const p = document.createElement('p')
        p.textContent = alert.properties.headline
        displayDiv.appendChild(p)
      })

      // clear error after success
      errorDiv.classList.add('hidden')
      errorDiv.textContent = ''
    })
    .catch((error) => {
      errorDiv.classList.remove('hidden')
      errorDiv.textContent = error.message
    })

  // clear input
  input.value = ''
})
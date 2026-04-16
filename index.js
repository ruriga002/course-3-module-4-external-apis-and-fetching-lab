// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
 
async function fetchWeatherAlerts(stateAbbr) {
  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${stateAbbr}`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
function displayAlerts(data, stateAbbr) {
  const resultsDiv = document.getElementById("results");
  const alerts = data.features || [];

  resultsDiv.innerHTML = `
    <h2>Current watches, warnings, and advisories for ${stateAbbr.toUpperCase()}: ${alerts.length}</h2>
    <ul>
      ${alerts.map(alert => `<li>${alert.properties.headline}</li>`).join("")}
    </ul>
  `;
}
function displayError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}
function clearUI() {
  document.getElementById("results").innerHTML = "";

  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = "";
  errorDiv.style.display = "none";
}
document.getElementById("getAlertsBtn").addEventListener("click", async () => {
  const input = document.getElementById("stateInput");
  const state = input.value.trim();

  clearUI();

  if (!state) {
    displayError("Please enter a state abbreviation.");
    input.value = "";
    return;
  }
  try {
    const data = await fetchWeatherAlerts(state);
    const alerts = data.features || [];
    if (alerts.length === 0) {
      displayError("No alerts found for this state.");
      return;
    }
    displayAlerts(data, state);
  } catch (error) {
    displayError(error.message || "Failed to fetch weather alerts.");
  }
  input.value = "";
});
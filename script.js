const apiUrl = "https://patient-api.codingwithdavid.com/patients";

async function fetchPatientData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const jessica = data.find(p => p.name === "Jessica Taylor");
    if (!jessica) return;

    document.getElementById("patient-info").innerHTML = `
      <p><strong>Age:</strong> ${jessica.age}</p>
      <p><strong>Gender:</strong> ${jessica.gender}</p>
      <p><strong>Blood Pressure:</strong> ${jessica.bloodPressure.join(", ")}</p>
    `;

    renderChart(jessica.bloodPressure);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderChart(bpData) {
  const ctx = document.getElementById("bpChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [{
        label: "Blood Pressure",
        data: bpData,
        borderColor: "blue",
        fill: false
      }]
    }
  });
}

fetchPatientData();

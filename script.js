const submitForm = () => {
  const name = document.getElementById("Name").value;
  const tel = document.getElementById("Telefone").value;
  const geren = document.getElementById("geren").value;
  const checkType = document.getElementById("checkType").value;
  const dateTime = new Date().toLocaleString();

  if (navigator.geolocation) {
    if (checkType === "checkin") {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const values = [name, tel, geren, checkType, dateTime, latitude, longitude];

          console.log(values)
        },
        (error) => {
          console.error(error);
          alert("Não foi possível obter a localização.");
        }
      );

      document.getElementById("stopButton").style.display = "block";
      alert("Monitoramento de localização iniciado.");
    } else {
      stopTracking();
      alert("Check-out realizado.");
    }
  } else {
    alert("Geolocalização não é suportada pelo seu navegador.");
  }


};

const stopTracking = () => {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById('stopButton').style.display = 'none';
        alert('Monitoramento de localização parado.')
    }
}

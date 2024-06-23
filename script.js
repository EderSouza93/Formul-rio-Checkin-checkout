let watchId;
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/qh12tcqrhadp3";
const BEARER_TOKEN = "2ha8rdtnr0z7f1sqxby33t3864kphs6rw2kzrudq";

const submitForm = () => {
  const name = document.getElementById("Name").value;
  const tel = document.getElementById("Telefone").value;
  const geren = document.getElementById("geren").value;
  const checkType = document.getElementById("checkType").value;
  const dateTime = new Date().toLocaleString();

  if(!name || !tel || !geren || !checkType) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return
  }

  //Verifica a permissão de geolocalização
  if(navigator.geolocation){
  navigator.permissions.query({ name: "geolocation" }).then((PermissionStatus) => {
      if (PermissionStatus.state === "granted" || PermissionStatus.state === "prompt") {
        //Solicita a localização
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            submitData(name, tel, geren, checkType, dateTime, latitude, longitude);
          }, error => {
            handleGeolocationError(error);
          });
      } else {
        //Se a permissão foi negada, informa o usuário e recarrega a página
        alert("Localização é necessária para enviar o formulário.");
        location.reload();
      }
    });
} else {
  alert('Geolocalização não é suportada pelo seu navegador.');
}
}

const submitData = (name, tel, geren, checkType, dateTime, latitude, longitude) => {
  const data = {
    "data": [
      {
        "name": name,
        "tel": tel,
        "gerente": geren,
        "checkType": checkType,
        "dateTime": dateTime,
        "latitude": latitude,
        "longitude": longitude,
      },
    ],
  };

  fetch(SHEETDB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Formulário enviado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao enviar o formulário.");
    });
};

const handleGeolocationError = (error) => {
  console.error(error);
  if(error.code === error.PERMISSION.DENIED) {
    alert('Necessário permitir a localização para o envio do formulário.');
    location.reload();
  } else {
    alert('Não foi possivel obter a localização.')
  }
}

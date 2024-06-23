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

    if (navigator.geolocation) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
            if (permissionStatus.state === 'granted') {
                // Solicita a localização
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    submitData(name, tel, geren, checkType, dateTime, latitude, longitude);
                }, error => {
                    handleGeolocationError(error);
                });
            } else if (permissionStatus.state === 'prompt') {
                // Solicita a localização
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    submitData(name, tel, geren, checkType, dateTime, latitude, longitude);
                }, error => {
                    handleGeolocationError(error);
                });
            } else {
                alert('A permissão de localização está desativada. Por favor, ative a permissão de localização nas configurações do navegador e recarregue a página.');
                location.reload();
            }
        });
    } else {
        alert('Geolocalização não é suportada pelo seu navegador.');
    }
}

function submitData(name, tel, geren, checkType, dateTime, latitude, longitude) {
    const data = {
        "data": [
            {
                "name": name,
                "Telefone": tel,
                "Gerente": geren,
                "checkType": checkType,
                "dateTime": dateTime,
                "latitude": latitude,
                "longitude": longitude
            }
        ]
    };

    fetch(SHEETDB_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BEARER_TOKEN}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Formulário enviado com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar o formulário.');
    });
}

function handleGeolocationError(error) {
    console.error(error);
    if (error.code === error.PERMISSION_DENIED) {
        alert('A permissão de localização foi negada. Por favor, ative a permissão de localização nas configurações do navegador e recarregue a página.');
        setTimeout(() => {
            location.reload();
        }, 5000); // Aguarda 5 segundos antes de recarregar a página
    } else {
        alert('Não foi possível obter a localização.');
    }
}

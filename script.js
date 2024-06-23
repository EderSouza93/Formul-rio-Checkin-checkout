let watchId;
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/qh12tcqrhadp3";
const BEARER_TOKEN = "2ha8rdtnr0z7f1sqxby33t3864kphs6rw2kzrudq";

const submitForm = () => {
  const name = document.getElementById("Name").value;
  const tel = document.getElementById("Telefone").value;
  const geren = document.getElementById("geren").value;
  const checkType = document.getElementById("checkType").value;
  const dateTime = new Date().toLocaleString();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const data = {
            data: [
              {
                name: name,
                tel: tel,
                gerente: geren,
                checkType: checkType,
                dateTime: dateTime,
                latitude: latitude,
                longitude: longitude,
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
              alert('Formulário enviado com sucesso!')
            })
            .catch((error) => {
              console.error("Erro:", error);
              alert('Erro ao enviar o formulário.')
            });

        },
        (error) => {
          console.error(error);
          if (error.code === error.PERMISSION_DENIED) {
        alert('Localização é necessária para enviar o formulário.');
        location.reload();
          } else {
          alert("Não foi possível obter a localização.");
        }
  });

  } else {
    alert("Geolocalização não é suportada pelo seu navegador.");
  }
};



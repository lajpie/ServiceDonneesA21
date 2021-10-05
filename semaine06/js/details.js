const urlParams = {};
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);

    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(()=> {

  //  console.log(urlParams);
    getPlanet(urlParams.planet);

});

async function getPlanet(url){
    const response = await axios.get(url);
    if(response.status === 200) {
        const planet = response.data;
        console.log(planet);

        //TODO: IMG
        $('#imgIcon').attr('src', planet.icon);
        //TODO: Nom
        $('#lblName').html(planet.name);
        //TODO: Découvert par
        $('#lblDiscovery').html(planet.discoveredBy);

        //TODO: DiscoveryDate
        $('#lblDiscoveryDate').html(planet.discoveryDate)
        //Todo: temperature
        $('#lblTemperature').html(planet.temperature)
        //TODO:Position
        $('#lblPosition').html(`( ${planet.position.x.toFixed(3)} ; ${planet.position.y.toFixed(3)} ; ${planet.position.z.toFixed(3)} )`)
    };
};
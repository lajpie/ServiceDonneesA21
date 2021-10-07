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

$(document).ready(() => {

    //  console.log(urlParams);
    getPlanet(urlParams.planet);

    $('#btnAddPortal').click(()=>{
        addPortal();
    });

});

function addPortal() {
const position = $('#txtPosition').val();
const affinity =  $('#cboAffinity').val();

console.log(position);
console.log(affinity);
};

async function getPlanet(url) {
    const response = await axios.get(url);
    if (response.status === 200) {
        const planet = response.data;
        console.log(planet);

        $('#imgIcon').attr('src', planet.icon);
        $('#lblName').html(planet.name);
        $('#lblDiscovery').html(planet.discoveredBy);
        $('#lblDiscoveryDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        $('#lblPosition').html(`( ${planet.position.x.toFixed(3)} ; ${planet.position.y.toFixed(3)} ; ${planet.position.z.toFixed(3)} )`);

        //Satellites

        let satellitesHtml = '';
        if (planet.satellites.length === 0) {
            satellitesHtml += `<li>Aucun satellite</li>`;
        }
        else {
            planet.satellites.forEach(s => {
                satellitesHtml += `<li>${s}</li>`;
            });
        }
        $('#satellites').html(satellitesHtml);

        displayPortals(planet.portals);

    };
};

function displayPortals(portals){

    let portalsHtml ='';
    portals.forEach(p =>{

        portalsHtml += '<tr>';
        //3. Dans chaque tr, deux td (position, affinity)
        portalsHtml += `<td>${p.position}</td>`
        portalsHtml += `<td><img src="img/${p.affinity}.png" alt="${p.affinity}" title="${p.affinity}"/></td>`
        portalsHtml += '</tr>';
    });

    //4. ajouter la chaine dans la page
    $('#portals tbody').html(portalsHtml);
}
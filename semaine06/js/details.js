const ELEMENT_IMG_URL = 'https://assets.andromia.science/elements';
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

    // $('#txtPosition').blur(evt =>{
    //     const t = evt.target.checkValidity();
    //     console.log(t);
    // }).bind('invalid', evt => {
    //     console.log('invalid');
    // });

    $('#btnAddPortal').click(() => {
        addPortal();
    });

    $('#btnMiner').click(() => {
        minePlanet();
    });

});

async function minePlanet() {

    //GET 
    const MINING_URL = `${urlParams.planet}/actions?type=mine`;

    const response = await axios.get(MINING_URL);
    //console.log(response);
    if (response.status === 200) {
        const elements = response.data;
        console.log(elements);

        $('#extraction tbody').empty();
        elements.forEach(e => {
            let elementHtml = '';
            elementHtml += '<tr>';

            elementHtml += `<td><img class="element" src="${ELEMENT_IMG_URL}/${e.element}.png" alt="${e.element}" title="${e.element}"/>${e.element}</td>`;
            elementHtml += `<td>${e.quantity}</td>`;
            elementHtml += '</tr>';

            
        //4. ajouter la chaine dans la page
        $('#extraction tbody').append(elementHtml);
        });

    } else {
        console.log(response);
    }

}


async function addPortal() {

    const isPortalValid = document.getElementById('txtPosition').checkValidity();

    if (isPortalValid) {

        const position = $('#txtPosition').val();
        const affinity = $('#cboAffinity').val();

        const CREATE_PORTAL_URL = `${urlParams.planet}/portals`;

        const body = {
            position: position,
            affinity: affinity
        }

        const response = await axios.post(CREATE_PORTAL_URL, body);

        if (response.status === 201) {
            const newPortal = response.data;
            const portalHtml = displayNewPortal(newPortal);

            $('#portals tbody').append(portalHtml);
        } else {
            console.log(response);
        }

    } else {
        console.log('Portal dans un format invalide.');
    }


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

function displayPortals(portals) {

    let portalsHtml = '';
    portals.forEach(p => {
        portalsHtml += displayNewPortal(p);
    });

    //4. ajouter la chaine dans la page
    $('#portals tbody').html(portalsHtml);
}

function displayNewPortal(p) {
    let portalHtml = '';
    portalHtml += '<tr>';
    //3. Dans chaque tr, deux td (position, affinity)
    portalHtml += `<td>${p.position}</td>`;
    portalHtml += `<td><img src="img/${p.affinity}.png" alt="${p.affinity}" title="${p.affinity}"/></td>`;
    portalHtml += '</tr>';

    return portalHtml;
}

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

console.log(urlParams.monstre)


$(document).ready(() => {

    getMonster(`https://api.andromia.science/monsters/atlas/${urlParams.monstre}`);

    $('#btnGenerate').click(() => {
        generateMonster();
    });

    $('#btnAddLocation').click(()=>{
        addLocation();
    });

});

async function getMonster(url) {
    const response = await axios.get(url);
    if (response.status === 200) {
        const monster = response.data;
        console.log(monster);

        //on rempli les détails d'un monstre
        $('#id').html(monster.atlasNumber);
        $('#imgIcon').attr('src', monster.assets);
        $('#lblName').html(monster.name);
        $('#lblHealth').html(`[ ${monster.health.min} - ${monster.health.max} ]`);
        $('#lblDamage').html(`[ ${monster.damage.min} - ${monster.damage.max} ]`);
        $('#lblSpeed').html(`[ ${monster.speed.min} - ${monster.speed.max} ]`);
        $('#lblCritical').html(`[ ${(monster.critical.min * 100).toFixed(2)} - ${(monster.critical.max * 100).toFixed(2)} ]%`);

        //on display les spécimens et les locations déjà dans la base de donnés
        displaySpecimens(monster.specimens);
        displayLocations(monster.locations);
    };
}

async function generateMonster() {
    const GENERATE_URL = `https://api.andromia.science/monsters/${urlParams.monstre}/actions?type=generate`;
    const response = await axios.post(GENERATE_URL);


    //si la demande faite plus haut fonctionne, on display le nouveau spécimens sous ceux déjà affichés
    if (response.status === 201) {
        const newSpecimen = response.data;
        
        console.log(response); // on display dans la console le nouveau spécimen

        let specimenHtml = displayNewSpecimen(newSpecimen);
        $('#infoMonsters tbody').append(specimenHtml);
    }

}

function displaySpecimens(specimens) {
    let specimensHtml = ''
    // pour chaque spécimens dans la listes, on crée de nouveaux spécimens
    specimens.forEach(s => {
        specimensHtml += displayNewSpecimen(s);
    });
    $('#infoMonsters tbody').html(specimensHtml);
}

function displayNewSpecimen(s) {
    let specimenHtml = '<tr>';

    specimenHtml += `<td><img src="img/affinities/${s.affinity}.png"/></td>`;
    specimenHtml += `<td>${s.health}</td>`;
    specimenHtml += `<td>${s.damage}</td>`;
    specimenHtml += `<td>${s.speed}</td>`;
    specimenHtml += `<td>${(s.critical * 100).toFixed(2)}%</td>`;

    specimenHtml += '<td>';
    s.talents.forEach(t => {
        specimenHtml += displayTalent(t); //on display chaque talents
    });
    specimenHtml += `</td>`;

    specimenHtml += '<td>';
    s.kernel.forEach(k => {
        specimenHtml += displayKernel(k); //on display chaque kernels
    });
    specimenHtml += `</td>`;

    specimenHtml += `<td>`;
    specimenHtml += `${s.hash.substring(0, 2)}`;
    specimenHtml += displayHash(s.hash); //on display les couleurs du hash
    specimenHtml += `${s.hash.substring(62)}`;
    specimenHtml += `</td>`;

    specimenHtml += '</tr>';

    return specimenHtml;
}

function displayTalent(t) {
    let talentHtml = ''
    talentHtml += `<img src="img/affinities/${t}.png"/>`;
    return talentHtml;
}

function displayKernel(k) {
    let kernelHtml = '';
    kernelHtml += `<img class="element" src="img/elements/${k}.png" alt="${k}" title="${k}" style="width:50px"/>`;
    return kernelHtml;
}

function displayHash(h) {
    let hashColorHtml = ''
    //pour les couleurs du hash, on fait une boucle avec des substrings qui incrémentent à coup de 6 (pour faire un hex de couleur)
    for (let i = 2; i < 62; i += 6) {
        hashColorHtml += `<span class="block" style="color #${h.substring(i, i + 6)}; background-color:#${h.substring(i, i + 6)}; color:#${h.substring(i, i + 6)}" >-</span>`;
    }
    return hashColorHtml;
}

function displayLocations(locations) {
    let locationsHtml = ''
    locations.forEach(l => {
        locationsHtml += displayNewlocation(l);
    });
   
}

function displayNewlocation(l) { //on display les nouvelles locations
    let locationHtml = '<tr>';
    locationHtml += `<td>${l.position}</td>`;
    locationHtml += `<td>${l.time}</td>`;
    locationHtml += `<td><img src="img/seasons/${l.season}.png"/></td>`;
    locationHtml += `<td><img src="img/rarities/${l.rates}.png"/></td>`;
    locationHtml += '</tr>';
    $('#locations tbody').append(locationHtml);
}

//on ajoute une location
async function addLocation() {
    //on vérifie si le format fonctionne
    const isLocationValid = document.getElementById('txtLocation');

    if (isLocationValid) {
        //si oui, on crée une requête post avec les données de notre forms
        const position = $('#txtLocation').val();
        const time = $('#cboTime').val();
        const season = $('#cboSeason').val();
        const rates = $('#cboRarity').val();

        const CREATE_LOCATION_URL = `https://api.andromia.science/monsters/atlas/${urlParams.monstre}/locations`;

        const body = {
            position: position,
            time: time,
            season: season,
            rates: rates
        }

        const response = await axios.post(CREATE_LOCATION_URL, body);

        if (response.status === 201) { //si la requête fonctionne, on affiche la nouvelle location
            const newLocation = response.data;
            const locationlHtml = displayNewlocation(newLocation);

            $('#portals tbody').append(locationlHtml);
            console.log(response);
        } else {
            console.log(response);
        }

    } else {
        console.log('Location dans un format invalide.');
    }
};
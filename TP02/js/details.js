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
});

async function getMonster(url){
    const response = await axios.get(url);
    if (response.status === 200) {
        const monster = response.data;
        console.log(monster);

        $('#id').html(monster.atlasNumber);
        $('#imgIcon').attr('src', monster.assets);
        $('#lblName').html(monster.name);
        $('#lblHealth').html(`[ ${monster.health.min} - ${monster.health.max} ]`);
        $('#lblDamage').html(`[ ${monster.damage.min} - ${monster.damage.max} ]`);
        $('#lblSpeed').html(`[ ${monster.speed.min} - ${monster.speed.max} ]`);
        $('#lblCritical').html(`[ ${(monster.critical.min *100).toFixed(2) } - ${(monster.critical.max *100).toFixed(2) } ]%`);


        

    };
}

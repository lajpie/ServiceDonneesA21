const SERVICE_URL = 'https://api.andromia.science/monsters/atlas';

$(document).ready(()=>{
    getMonsters();
});

async function getMonsters(){

    try {
        const response = await axios.get(SERVICE_URL);
        if (response.status === 200) {
         const monsters = response.data;
         monsters.forEach(m => {
             console.log(m);
             $('#monsters tbody').append(displayMonsters(m));
         });
         
     } else {
         
         console.log(response);
        }
 
     } catch (err) {
         console.log(err);
     }
}

function displayMonsters(m) {
    let monstersHtml = '';
    monstersHtml += '<tr>';
    //- numéro et image
    monstersHtml += '<td>';
    monstersHtml += `${m.atlasNumber} <img src="${m.assets}" class="imgIcon"/>`
    monstersHtml += '</td>';
    //- name
    monstersHtml += `<td><a href="details.html" >${m.name}</a></td>`;
    //- health
    monstersHtml += `<td>[ ${m.health.min} - ${m.health.max} ]</td>`;
    //- damage
    monstersHtml += `<td>[ ${m.damage.min} - ${m.damage.max} ]</td>`;;
    //- speed
    monstersHtml += `<td>[ ${m.speed.min} - ${m.speed.max} ]</td>`;;
    //- critical
    monstersHtml += `<td>[ ${(m.critical.min *100).toFixed(2) } - ${(m.critical.max *100).toFixed(2) } ]%</td>`;

    return monstersHtml;
}


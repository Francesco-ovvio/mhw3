document.addEventListener('DOMContentLoaded', function(){
    var urls = [];
    for(k = 0; k<titoli.length; k++){
        rest_url = 'https://api.nutritionix.com/v1_1/search/'+nomiTrad[titoli[k]]+'?results=0:1&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate&appId='+APPID+'&appKey='+APPKEY;
        urls.push(rest_url);
    }
    
    var fetches = [];
    for(let i = 0; i<urls.length; i++){
        console.log(urls[i]);
        fetches.push(
            fetch(urls[i]).then(onResponse).then(loadNutrient)
        );
    }
    Promise.all(fetches).then(creaSchede);
}, false);

function onResponse(response){
    console.log("ha risposto"); 
    return response.json();
}

function loadNutrient(json){
    resp.push(json.hits[0].fields);
}

function creaSchede(){
    console.log('ora sono alle schede');
    console.log(resp);
    var nprod = titoli.length;
    var prodGrid = document.getElementById('product-grid');

        for(let j =0; j<nprod; j++){
            var div = document.createElement('div');
            div.className= 'product';
            div.id= 'prodotto'+ j;

                var titolo = document.createElement('div');
                titolo.className = 'titolo';

                    var h1 = document.createElement('h1');
                    h1.id = 'h1'+j;
                    h1.textContent = titoli[j];
                    titolo.appendChild(h1);

                    var btnimg = document.createElement('img');
                    btnimg.id = 'icon';
                    btnimg.setAttribute('onclick', 'addFav('+j+')');
                    btnimg.src= 'https://i.imgur.com/wgYNMRa.png';
                    titolo.appendChild(btnimg); 
            div.appendChild(titolo);

                var img = document.createElement('img');
                img.setAttribute('onclick', 'showDesc('+j+')');
                img.src = immagini[j];
            div.appendChild(img);

                var descr = document.createElement('div');
                descr.className = 'descr';
                descr.id = 'descrizione'+j;
                descr.textContent = descrizione[j];

                    for(let l = 0; l<resp.length; l++){
                        var str = resp[l].item_name.toUpperCase();
                        if(str.indexOf(nomiTrad[titoli[j]].toUpperCase()) !== -1){
                            var ul = document.createElement('ul');
                            let kcal = document.createElement('li');
                            kcal.textContent = 'Kcal : '+resp[l].nf_calories;
                            ul.appendChild(kcal);
                            let fat = document.createElement('li');
                            fat.textContent = 'Grassi: '+resp[l].nf_total_fat;
                            ul.appendChild(fat);
                            let prot = document.createElement('li');
                            prot.textContent = 'Proteine: '+resp[l].nf_protein;
                            ul.appendChild(prot);
                            let carb = document.createElement('li');
                            carb.textContent = 'Carboidrati: '+resp[l].nf_total_carbohydrate;
                            ul.appendChild(carb);
                            descr.appendChild(ul);
                        }
                    }
            div.appendChild(descr);
        prodGrid.appendChild(div);
    }
    meteo();
}

function setPosition(json){
    let cittaLon = json.longitude;
    let cittaLat = json.latitude;
    citta = json.city;
    rest_url_weath = "http://www.7timer.info/bin/api.pl?lon="+cittaLon+"&lat="+cittaLat+"&product=civillight&output=json";
    console.log(rest_url_weath);
}

function meteo(){
    rest_url_pos = "https://freegeoip.app/json/";
    var pos = fetch(rest_url_pos).then(onResponse).then(setPosition);
    Promise.resolve(pos).then(datiMeteo);
}

function datiMeteo(){
    fetch(rest_url_weath).then(onResponse).then(setDatiMeteo);
}

function setDatiMeteo(json){
    console.log(json);
    let meteoinfo = document.getElementById("meteoinfo"); 
        
    let pos = document.createElement("p");
    pos.id = "currentPos";
    pos.textContent = "Posizione: "+citta;
    meteoinfo.appendChild(pos);

    let day = document.createElement("p");
    day.id= "currentDay";
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth()+1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd+'/'+mm+'/'+yyyy;
    day.textContent = "Data: "+today;
    meteoinfo.appendChild(day);

    let tempMax = document.createElement("p");
    tempMax.id="currentTempMax",
    tempMax.textContent = "Temperatura Max: "+json.dataseries[0].temp2m.max+"°C";
    meteoinfo.appendChild(tempMax);

    let tempMin = document.createElement("p");
    tempMin.id="currentTempMin",
    tempMin.textContent = "Temperatura Min: "+json.dataseries[0].temp2m.min+"°C";
    meteoinfo.appendChild(tempMin);

    let meteoicon = document.getElementById("meteoicon");

    let img = document.createElement("img");
    img.id = "currentIcon";
    img.src = "http://www.7timer.info/img/misc/about_two_"+setIcona(json.dataseries[0].weather)+".png";
    meteoicon.appendChild(img);
}

function setIcona(str){
    if(str == "mcloudy"){
        return "pcloudy";
    }else{
        return str;
    }
}
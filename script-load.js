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
}
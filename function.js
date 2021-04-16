function openNav(){
    document.getElementById("MySidenav").style.width = "250px";
}

function closeNav(){
    document.getElementById("MySidenav").style.width = "0px";
}

function showDesc(id){
    var x = document.getElementById("descrizione"+id);
    if(x.style.display === ""){
        x.style.display = "block"; 
    }else{
        x.style.display = "";
    }
}

function search(){
    var input, filter, prodGrid, prod, h1, i, txtValue;
    input = document.getElementById('searchBar');
    filter = input.value.toUpperCase();
    prodGrid = document.getElementById('product-grid');
    prod = prodGrid.getElementsByClassName('product');

    for(i = 0; i<prod.length; i++){
        h1 = prod[i].getElementsByTagName('h1')[0];
        txtValue = h1.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
            prod[i].style.display = "";
        } else {
            prod[i].style.display = "none";
        }
    }
}

function addFav(id){
    var prefGrid, div, titolo, h1, img, btnimg;
    prefGrid = document.getElementById('prefProd');

    if(document.getElementById('h1F'+id)){
        var ogg = document.getElementById('h1F'+id);
    }

    if(ogg == undefined){
        div = document.createElement('div');
        div.className = 'product';
        div.id = 'prodottoF'+id;

            titolo = document.createElement('div');
            titolo.className = 'titolo';
                h1 = document.createElement('h1');
                h1.textContent = titoli[id];
                h1.id = 'h1F'+id;
                titolo.appendChild(h1);

                btnimg = document.createElement('img');
                btnimg.id = 'iconF';
                btnimg.setAttribute('onclick', 'remFav('+id+')');
                btnimg.src = 'https://i.imgur.com/qQA5U21.png';
                titolo.appendChild(btnimg); 

            div.appendChild(titolo);

            img = document.createElement('img');
            img.id = 'imgFav';
            img.src = immagini[id];
            div.appendChild(img);

        prefGrid.appendChild(div);
    }
    if(document.getElementById('prefProd').childElementCount > 0){
        document.getElementById('favSection').style.display = 'initial';
    }
}

function remFav(id){
    var item = document.getElementById('prodottoF'+id);
    item.remove();

    if(document.getElementById('prefProd').childElementCount == 0){
        document.getElementById('favSection').style.display = 'none';
    }
}

function searchNutrient(id){
    rest_url = 'https://api.nutritionix.com/v1_1/search/'+id+'?results=0:1&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate&appId='+APPID+'&appKey='+APPKEY;
    fetch(rest_url).then(onResponse).then(onJson);
}

function onResponse(response){
    console.log("ha risposto");
    return response.json();
}

function onJson(json){
    /*creare una tabella dove inserisco i nutrienti e tornarla con return*/
    var ul = document.createElement('ul');
        var kcal = document.createElement('li');
        kcal.textContent = 'KCal: '+json.hits[0].fields.nf_calories;
        ul.appendChild(kcal);
    return ul;
    //console.log(json.hits[0].fields.nf_protein);
}
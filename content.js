const titoli = ["Orzo", "Frumento", "Granturco","Riso", "Ricotta", "Provola"];
const immagini = ['https://i.imgur.com/LIYpK4U.jpg',
                'https://i.imgur.com/rzCB39C.jpg',
                'https://i.imgur.com/YN7ZKIO.jpg',
                'https://i.imgur.com/s7TzyB8.jpg',
                'https://i.imgur.com/SfvOSUk.jpg',
                'https://i.imgur.com/Aw243VD.jpg'];
const descrizione = ["L’orzo comune è la specie economicamente più importante tra quelle coltivate del genere Hordeum, quella da cui si ricava l'orzo alimentare da cui dipende una considerevole parte dell'alimentazione mondiale.",
    "Il grano o frumento, arcaicamente anche trittico, è un genere della famiglia graminacee, cereale di antica coltura, la cui area d'origine è localizzata tra Mar Mediterraneo, Mar Nero e Mar Caspio.",
    "Il mais è una pianta erbacea annuale della famiglia delle Poaceae, tribù delle Maydeae: addomesticato dalle popolazioni indigene in Messico centrale in tempi preistorici circa 10.000 anni fa.",
    "Il riso o risoide è un alimento costituito dalla cariosside prodotta da diverse piante dei generi Oryza e Zizania, opportunamente lavorata. Le più note specie utilizzate sono l'Oryza sativa e l'Oryza glaberrima.",
    "La ricotta (dal latino recocta) è un prodotto caseario, più precisamente un latticino. La ricotta, pur essendo un prodotto caseario, non è, per legge, formaggio ma va classificata semplicemente come latticino: non viene ottenuta infatti attraverso la coagulazione della caseina, ma delle proteine del siero di latte, cioè la parte liquida che si separa dalla cagliata durante la caseificazione.",
    "La provola è un formaggio di latte vaccino, a latte crudo e a pasta cotta o pasta semicotta e filata. In genere ha la forma di una sfera schiacciata, dal peso di circa mezzo chilo. Una provola ottenuta da latte bufalino viene prodotta in Campania."];

const nomiTrad = {
    "Frumento": "wheat",
    "Ricotta": "ricotta",
    "Orzo": "barley",
    "Granturco": "corn",
    "Riso": "rice",
    "Provola": "provolone",
}

let rest_url_weath;
let citta;
let resp = new Array;
const APPID = 'c3b1c165';
const APPKEY = 'f580e7ae4bbf4739c53ea431460e3702';
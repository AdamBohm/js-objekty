const cas = Number(document.getElementById('cas').value);
const vzdalenost = Number(document.getElementById('km').value);
const obec = Number(document.getElementById('obec').value);
const mimoObec = Number(document.getElementById('mimo').value);
const dalnice = Number(document.getElementById('dalnice').value);
const btn = document.querySelector('[type = button]');
const output = document.getElementById('vystup');

function overeniProcent(obec, mimoObec, dalnice){
    const totalPercent = obec + mimoObec + dalnice;
    if (totalPercent > 100) {
        alert("Součet procent nesmí překročit 100 %!");
        return false;
    }
    return true;
}
function vypocetMaxRychlosti(){
    let casVObci = ((vzdalenost * obec) / 100) / 50 * 60; // vystup v minutach
    let casMimoObec = ((vzdalenost * mimoObec) / 100) / 90 * 60;
    let casNaDalicnici = ((vzdalenost * dalnice) / 100) / 130 * 60; 
    let maxPrumernaRychlost = vzdalenost / ((casVObci + casMimoObec + casNaDalicnici) / 60); 
    return maxPrumernaRychlost;
}

function vypocetPrumerneRychlosti(){
    let prumernaRychlost = vzdalenost / (cas / 60);
    return prumernaRychlost;
}
btn.addEventListener('click', function() {

    if (!overeniProcent(obec, mimoObec, dalnice)) return;

    const maxRychlost = vypocetMaxRychlosti(vzdalenost, obec, mimoObec, dalnice);
    const prumernaRychlost = vypocetPrumerneRychlosti(vzdalenost, cas);

    let rozdil = prumernaRychlost - maxRychlost;
    let pokuta = "";

    if (rozdil < 10) {
        pokuta = "přestupek s pokutou do 1500kč";
    } else if (rozdil > 10 && rozdil <= 20) {
        pokuta = "přestupek s pokutou do 2000kč a 2 TB";
    } else if (rozdil > 20 && rozdil <= 40) {
        pokuta = "přestupek s pokutou do 3500kč a 4 TB";
    } else if (rozdil > 40) {
        pokuta = "vybodovali jste se, měli byste odevzdat ŘO.";
    } else {
        pokuta = "nic";
    }
    console.log(prumernaRychlost, maxRychlost, rozdil, pokuta);
    output.innerHTML = 
        `Vaše průměrná rychlost byla ${prumernaRychlost.toFixed(2)} km/h.
        Což je o ${rozdil.toFixed(2)} km/h více než je povolená rychlost. 
        Tím pádem jste spáchali ${pokuta}.`;
});

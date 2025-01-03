let lightModeBtn, darkModeBtn, mode, cnv, fnt, theme, hive, hiveSaved, hexes, hexesNormal, selected, multSelt, gifted, bee_btns;
const bee_imgs = {};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function preload() {
    fnt = loadFont('assets/RobotoSlab-VariableFont_wght.ttf');
    bee_imgs['bee_BA'] = loadImage('assets/bee_BA.png');  
    bee_imgs['bee_BAB'] = loadImage('assets/bee_BAB.png');
    bee_imgs['bee_BE'] = loadImage('assets/bee_BE.png');  
    bee_imgs['bee_BO'] = loadImage('assets/bee_BO.png');  
    bee_imgs['bee_BR'] = loadImage('assets/bee_BR.png');  
    bee_imgs['bee_BU'] = loadImage('assets/bee_BU.png');  
    bee_imgs['bee_BUB'] = loadImage('assets/bee_BUB.png');
    bee_imgs['bee_BUC'] = loadImage('assets/bee_BUC.png');
    bee_imgs['bee_BUO'] = loadImage('assets/bee_BUO.png');
    bee_imgs['bee_CA'] = loadImage('assets/bee_CA.png');  
    bee_imgs['bee_CO'] = loadImage('assets/bee_CO.png');  
    bee_imgs['bee_COB'] = loadImage('assets/bee_COB.png');
    bee_imgs['bee_COM'] = loadImage('assets/bee_COM.png');
    bee_imgs['bee_CR'] = loadImage('assets/bee_CR.png');  
    bee_imgs['bee_DE'] = loadImage('assets/bee_DE.png');  
    bee_imgs['bee_DEM'] = loadImage('assets/bee_DEM.png');
    bee_imgs['bee_DI'] = loadImage('assets/bee_DI.png');  
    bee_imgs['bee_EX'] = loadImage('assets/bee_EX.png');  
    bee_imgs['bee_FE'] = loadImage('assets/bee_FE.png');
    bee_imgs['bee_FI'] = loadImage('assets/bee_FI.png');
    bee_imgs['bee_FR'] = loadImage('assets/bee_FR.png');
    bee_imgs['bee_FU'] = loadImage('assets/bee_FU.png');
    bee_imgs['bee_GU'] = loadImage('assets/bee_GU.png');
    bee_imgs['bee_HA'] = loadImage('assets/bee_HA.png');
    bee_imgs['bee_HO'] = loadImage('assets/bee_HO.png');
    bee_imgs['bee_LI'] = loadImage('assets/bee_LI.png');
    bee_imgs['bee_LO'] = loadImage('assets/bee_LO.png');
    bee_imgs['bee_MU'] = loadImage('assets/bee_MU.png');
    bee_imgs['bee_NI'] = loadImage('assets/bee_NI.png');
    bee_imgs['bee_PH'] = loadImage('assets/bee_PH.png');
    bee_imgs['bee_PR'] = loadImage('assets/bee_PR.png');
    bee_imgs['bee_PU'] = loadImage('assets/bee_PU.png');
    bee_imgs['bee_RA'] = loadImage('assets/bee_RA.png');
    bee_imgs['bee_RAG'] = loadImage('assets/bee_RAG.png');
    bee_imgs['bee_RAS'] = loadImage('assets/bee_RAS.png');
    bee_imgs['bee_RI'] = loadImage('assets/bee_RI.png');
    bee_imgs['bee_SH'] = loadImage('assets/bee_SH.png');
    bee_imgs['bee_SHY'] = loadImage('assets/bee_SHY.png');
    bee_imgs['bee_SP'] = loadImage('assets/bee_SP.png');
    bee_imgs['bee_ST'] = loadImage('assets/bee_ST.png');
    bee_imgs['bee_TA'] = loadImage('assets/bee_TA.png');
    bee_imgs['bee_TAB'] = loadImage('assets/bee_TAB.png');
    bee_imgs['bee_VE'] = loadImage('assets/bee_VE.png');
    bee_imgs['bee_VI'] = loadImage('assets/bee_VI.png');
    bee_imgs['bee_WI'] = loadImage('assets/bee_WI.png');
    bee_imgs['bee_DIG'] = loadImage('assets/bee_DIG.png');
}

function setup() {
    cnv = createCanvas(957, 506);
    
    lightModeBtn = select('#lightMode');
    darkModeBtn = select('#darkMode');
    setMode('menu');
    textFont(fnt);

    theme = getItem('theme') ?? 'light';
    setTheme(theme);

    hive = {
        name: 'hive',
        slots: []
    };
    hexes = [];
    hexesNormal = [];
    selected = [];
    bee_btns = selectAll('.beePanel div.bee-section button');
    
    if (urlParams.has('hive')) {
        hiveParams = urlParams.get('hive');
        if (hiveParams.substr(hiveParams.length - 1) != ';') { hiveParams += ';'; }
        code = hiveParams.split(';');
        hive.name = code.shift();
        if (!code[-1]) {
            code.pop();
        }
        hive.slots = [...code];
        setMode('app', true);
    }

    // buttons

    // goto app
    select('#appButton-1').mouseClicked(newHive);
    select('#appButton-2').mouseClicked(loadHive);
    select('#appButton-3').mouseClicked(importText);

    // goto menu
    select('#menuButton').mouseClicked(setMode.bind(null, 'menu'));

    select('#addSlot').mouseClicked(addSlot);
    select('#removeSlot').mouseClicked(removeSlot);
    select('#changeName').mouseClicked(changeName);

    select('#saveHive').mouseClicked(saveHive);
    select('#exportImg').mouseClicked(exportImage);
    select('#exportTxt').mouseClicked(exportText);

    multSelt = createCheckbox('select multiple (shift)')
        .parent(select('#multSeltCon'));

    select('#commonMax').mouseClicked(expandPanel.bind(null, 'common'));
    select('#commonMin').mouseClicked(expandPanel.bind(null, 'common', 'true'));

    select('#rareMax').mouseClicked(expandPanel.bind(null, 'rare'));
    select('#rareMin').mouseClicked(expandPanel.bind(null, 'rare', 'true'));

    select('#epicMax').mouseClicked(expandPanel.bind(null, 'epic'));
    select('#epicMin').mouseClicked(expandPanel.bind(null, 'epic', 'true'));

    select('#legendMax').mouseClicked(expandPanel.bind(null, 'legend'));
    select('#legendMin').mouseClicked(expandPanel.bind(null, 'legend', 'true'));

    select('#mythicMax').mouseClicked(expandPanel.bind(null, 'mythic'));
    select('#mythicMin').mouseClicked(expandPanel.bind(null, 'mythic', 'true'));

    select('#eventMax').mouseClicked(expandPanel.bind(null, 'event'));
    select('#eventMin').mouseClicked(expandPanel.bind(null, 'event', 'true'));

    select('#btn-U').mouseClicked(changeSlot.bind(null, 'U'));

    gifted = createCheckbox('gifted (alt)')
        .id('giftedSelect')
        .parent(select('#multSeltCon'));
}

function draw() {
    background(select('body').style('color'));
    lightModeBtn.mouseClicked(setTheme.bind(null, 'light'));
    darkModeBtn.mouseClicked(setTheme.bind(null, 'dark'));

    // menu
    if (mode == 'menu') {
        textAlign(CENTER);
        textSize(50);
        fill(select('body').style('background-color'));
        let textY = height / 2 + map(sin(frameCount * 0.025), -1, 1, -20, 20);
        noStroke();
        text('welcome to hivemind!', width/2, textY);
        text('the PLEASE HELP ME version', width/2, textY+60);
        select('#headerTitle').html('&nbsp&nbsphivemind');
        if (getItem('hive')) {
            select('#appButton-2').attribute('data-status', 'active');
        } else {
            select('#appButton-2').attribute('data-status', 'inactive');
        }
    }
    
    // app
    if (mode == 'app') {
        select('#headerTitle').html(`&nbsp&nbsphivemind - ${hive.name}`);
        drawHive(width / 2 - 140, height-17.5, 30, hive.slots);
        hexes = hexes.splice(0, hive.slots.length < 25 ? 25 : hive.slots.length);
        if (hive.slots.length >= 50 || selected.length != 0) {
            select('#addSlot').attribute('disabled', '');
        } else {
            select('#addSlot').removeAttribute('disabled')
        }

        if (hive.slots.length <= 25 || selected.length != 0) {
            select('#removeSlot').attribute('disabled', '');
        } else {
            select('#removeSlot').removeAttribute('disabled');
        }

        if (selected.length != 0) {
            select('#changeName').attribute('disabled', '');
        } else {
            select('#changeName').removeAttribute('disabled');
        }

        for (const i of selected) {
            hexes[i].type = 'SELECTED';
        }

        for (const i of bee_btns) {
            i.mouseClicked(changeSlot.bind(null, i.id().slice(4)));
        }
    }
}

function mouseClicked() {
    if (mode == 'app') {
        if (mouseX.between(0, 472, true) && mouseY.between(0, 563)) {
            let onSlot = false;
            for (const [i, v] of hexes.entries()) {
                if (dist(mouseX, mouseY, v.x, v.y) <= 25) {
                    if (!keyIsDown(SHIFT) && !multSelt.checked()) {
                        hexes = hexesNormal.splice();
                        selected = [];
                    }
                    onSlot = true;
                    selected.push(i);
                }
            }
            if (!onSlot) {
                selected = [];
                hexes = hexesNormal.splice();
            }
        }
    }
}

Number.prototype.between = function(a, b, inclusive) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return inclusive ? this >= min && this <= max : this > min && this < max;
};

function loadHive() {
    hive = getItem('hive');
    setMode('app', true);
}

function newHive() {
    hive = {
        name: 'hive',
        slots: []
    };
    hexes = [];
    hexesNormal = [];
    setMode('app');
}

function setTheme(t) {
    if (t == 'light') {
        lightModeBtn.attribute('data-status', 'inactive')
        darkModeBtn.attribute('data-status', 'active');
        select('body').removeClass('dark-mode');
    } else {
        lightModeBtn.attribute('data-status', 'active')
        darkModeBtn.attribute('data-status', 'inactive');
        select('body').addClass('dark-mode');
    }

    theme = t;
    storeItem('theme', t);
}

function setMode(m, loaded=false) {
    if (m == 'menu') {
        if (mode == 'app') {
            let x = madeChanges();
            if (!hiveSaved && x) {
                let leave = confirm('are you sure? you haven\'t saved your hive!')
                if (!leave) {
                    return;
                }
            }
        }
        mode = 'menu';
        cnv.parent(select('#menu > .canvasContainer'));
        resizeCanvas(957, 506);
        cnv.style('left', '50%');
        cnv.style('transform', 'translateX(-50%)');
        select('#menu').attribute('data-status', 'active');
        select('#app').attribute('data-status', 'inactive');
    } else {
        if (!loaded) {
            let x = prompt('enter hive name (max 15 chars): (this can be changed later)', 'hive');
            if (!x) { return; }
            hive.name = x.substring(0, 16);
            let n = prompt('how many hive slots will the hive use (25-50): (this can be changed later)', '50');
            if (!isNaN(n) && !isNaN(parseFloat(n))) {
                hive.slots = new Array(clamp(parseInt(n), 25, 50)).fill('U');
            } else {
                return;
            }
        }
        mode = 'app';
        hiveSaved = false;
        cnv.parent(select('#app > .canvasContainer'));
        resizeCanvas(472, 563);
        select('#menu').attribute('data-status', 'inactive');
        select('#app').attribute('data-status', 'active');
    }
}

function madeChanges() {
    if (getItem('hive')) {
        return hive.name != getItem('hive').name || hive.slots.join(';') != getItem('hive').slots.join(';');
    }
    return false;
}

function addSlot() {
    if (hive.slots.length < 25) {
        while (hive.slots.length != 26) {
            hive.slots.push('U');
        }
    } else {
        hive.slots.push('U');
    }
}

function removeSlot() {
    hive.slots.pop();
}

function changeName() {
    let x = prompt('enter hive name (max 15 chars):', 'hive');
    if (!x) {
        return;
    }
    hive.name = x.substring(0, 15);
}

function saveHive() {
    storeItem('hive', hive);
    hiveSaved = true;
    const txt = select('#savedText')
    txt.style('opacity', '1');
    txt.style('animation', '1s linear 0s save-fadeout');
    txt.elt.addEventListener('animationend', () => {
        txt.style('opacity', '0');
        txt.style('animation', null);
    });
}

function exportImage() {
    let pg = createGraphics(472, 613);
    pg.background(select('body').style('color'));
    pg.textSize(30);
    pg.textAlign(CENTER, CENTER);
    pg.fill(select('body').style('background-color'));
    pg.textFont(fnt);
    pg.text(hive.name, pg.width/2, 25);
    pg.textAlign(LEFT, TOP);
    pg.textSize(10);
    pg.image(cnv, 0, 50);
    let fname = hive.name.replace(/[/\\?%*:|"<>]/g, '-');
    save(pg, `${fname}.png`);
}

function exportText() {
    navigator.clipboard.writeText(hive.name + ';' + hive.slots.join(';')).then(() => {
        alert('copied to clipboard!');
    });
}

function importText() {
    let code = prompt('enter hive code:');
    if (!code) { return; }
    code = code.split(';');
    hive.name = code.shift();
    if (!code[-1]) {
        code.pop();
    }
    hive.slots = [...code];
    console.log(hive.slots);
    setMode('app', true);
}

function expandPanel(type, collapse) {
    if (collapse == 'true') {
        select(`#${type}Max`).attribute('data-status', 'active');
        select(`#${type}Min`).attribute('data-status', 'inactive');
        select(`#bees-${type}`).attribute('data-status', 'inactive');
    } else {
        select(`#${type}Max`).attribute('data-status', 'inactive');
        select(`#${type}Min`).attribute('data-status', 'active');
        select(`#bees-${type}`).attribute('data-status', 'active');
    }
}

function changeSlot(type) {
    if (hive.slots.length < 25) {
        while (hive.slots.length != 25) {
            hive.slots.push('U');
        }
    }
    for (const i of selected) {
        if (!keyIsDown(ALT) && !gifted.checked()) {
            hive.slots[i] = type;
        } else {
            if (type == 'U') {
                hive.slots[i] = 'U';
            } else {
                hive.slots[i] = type.toLowerCase();
            }
        }
        selected = [];
        hexes = hexesNormal.splice();
    }
}

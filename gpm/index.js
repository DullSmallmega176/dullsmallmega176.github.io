// pencil count
let pcls = 0;
let pps = 0;
let ppc = 1;
// pencil workers
let pclworkers = 0;
let pclworkercost = 20;
// pencil sharpeners
let pclsharps = 0;
let pclsharpcost = 175;
// mechanical pencils
let mchpcls = 0;
let mchpclcost = 50;
// graphite
let grps = 0;
let grpcost = 375;
// eraser
let rbrs = 0;
let rbrcost = 500;
// ruler
let rls = 0;
let rlscost = 3000;
// glue
let glues = 0;
let gluecost = 1750;
// scissors
let scs = 0;
let scscost = 12500;
// paper
let paper = 0;
let papercost = 27250;
// schools
let schls = 0;
let schlcost = 100000;
// homework
let hmwk = 0;
let hmwkcost = 500000;
// pencil cases
let pclcases = 0;
let pclcasecost = 1000000;
// dom elements
let pclcount = document.getElementById("count");
let ppstext = document.getElementById("pps");
let ppctext = document.getElementById("ppc");
let earnbutton = document.getElementById("clickbutton");
let cptext = document.getElementById("cpt");
// pencil worker dom
let pclworkercounttext = document.getElementById("pclworkers");
let pclworkercosttext = document.getElementById("pclworkercost");
let buypclworker = document.getElementById("buypclworker");
// mechanical pencil dom
let mchpclcounttext = document.getElementById("mchpcls");
let mchpclcosttext = document.getElementById("mchpclcost");
let buymchpcl = document.getElementById("buymchpcl");
// pencil sharpeners dom
let pclsharpcounttext = document.getElementById("pclsharps");
let pclsharpcosttext = document.getElementById("pclsharpcost");
let buypclsharp = document.getElementById("buypclsharp");
// graphite dom
let grpcounttext = document.getElementById("grps");
let grpcosttext = document.getElementById("grpscost");
let buygrps = document.getElementById("buygrp");
// eraser dom
let rbrcounttext = document.getElementById("rbrs");
let rbrcosttext = document.getElementById("rbrcost");
let buyrbr = document.getElementById("buyrbr");
// ruler dom
let rlscounttext = document.getElementById("rls");
let rlscosttext = document.getElementById("rlscost");
let buyrls = document.getElementById("buyrls");
// glue dom
let gluecounttext = document.getElementById("glues");
let gluecosttext = document.getElementById("gluecost");
let buyglue = document.getElementById("buyglue");
// scissor dom
let scscounttext = document.getElementById("scs");
let scscosttext = document.getElementById("scscost");
let buyscs = document.getElementById("buyscs");
// paper dom
let papercounttext = document.getElementById("papers");
let papercosttext = document.getElementById("papercost");
let buypaper = document.getElementById("buypaper");
// school dom
let schlcounttext = document.getElementById("schls");
let schlcosttext = document.getElementById("schlcost");
let buyschl = document.getElementById("buyschl");
// homework dom
let hmwkcounttext = document.getElementById("hmwk");
let hmwkcosttext = document.getElementById("hmwkcost");
let buyhmwk = document.getElementById("buyhmwk");
// pcl case dom
let pclcasecounttext = document.getElementById("pclcases");
let pclcasecosttext = document.getElementById("pclcasecost");
let buypclcase = document.getElementById("buypclcase");
// save
let storage = window.localStorage;
let savebutton = document.getElementById("save");
let wipesave = document.getElementById("wipesave");
// auto earn
let autoEarn = setInterval(function(){earn(pps/100)}, 10);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.onload = function() {
    print("hi")
}

function earn(amount) {
    pcls += amount;
    if (pcls < 0) {
        pcls = 0;
    }
    pclcount.innerText = `you have ${numberWithCommas(Math.round(pcls))} pencils`;
    ppstext.innerText = `you make ${numberWithCommas(pps)} pencils/s`;
    ppctext.innerText = `you make ${numberWithCommas(ppc)} pencils/click`;
}

function colouredpencil() {
    let rng = Math.floor((Math.random() * 100));
    if (rng < 16.66) {
        earn(-(pps * 60));
        cptextchange("red", -(pps * 30));
    } else if (rng < 33.32 && rng > 16.66) {
        earn(-(pps * 30));
        cptextchange("orange", -(pps * 15));
    } else if (rng < 49.98 && rng > 33.32) {
        earn(pps * 120);
        cptextchange("yellow", (pps * 120));
    } else if (rng < 66.64 && rng > 49.98) {
        earn(pps * 90);
        cptextchange("green", (pps * 90));
    } else if (rng < 83.3 && rng > 66.64) {
        earn(pps * 60);
        cptextchange("blue", (pps * 60));
    } else {
        earn(pps * 30);
        cptextchange("purple", (pps * 30));
    }
}

function cptextchange(col, amount) {
    if (col != "red" && col != "orange") {
        cpt.innerText = `you made a ${col} coloured pencil. you got ${amount} pencils!`;
        setTimeout(function() {
            cpt.innerText = "";
        }, 3000);
    } else {
        cpt.innerText = `you made a ${col} coloured pencil. you lost ${Math.abs(amount)} pencils!`;
        setTimeout(function() {
            cpt.innerText = "";
        }, 3000);
    }
}   

function knees() {
    window.close();
}

earnbutton.addEventListener("click", function() {
    earn(ppc);

    if (pps >= 1) {
        if (Math.random() * 100 >= 95) {
            colouredpencil();
        }
    }
});

buypclworker.addEventListener("click", function() {
    if (pcls >= pclworkercost) {
        earn(-pclworkercost);
        pclworkercost += (pclworkercost / 100) * 30;
        pclworkercost = Math.floor(pclworkercost);
        pclworkers += 1;
        pps += 1;
        pclworkercounttext.innerText = `you have ${numberWithCommas(pclworkers)} pencil workers`;
        pclworkercosttext.innerText = `price of next pencil worker: ${numberWithCommas(pclworkercost)} pencils`;
    }
});

buymchpcl.addEventListener("click", function() {
    if (pcls >= mchpclcost) {
        earn(-mchpclcost);
        mchpclcost += (mchpclcost / 100) * 30;
        mchpclcost = Math.floor(mchpclcost);
        mchpcls += 1;
        ppc += 1;
        mchpclcounttext.innerText = `you have ${numberWithCommas(mchpcls)} mechanical pencils`
        mchpclcosttext.innerText = `price of next mechanical pencil: ${numberWithCommas(mchpclcost)} pencils`
    }
});

buypclsharp.addEventListener("click", function() {
    if (pcls >= pclsharpcost) {
        earn(-pclsharpcost);
        pclsharpcost += (pclsharpcost / 100) * 30;
        pclsharpcost = Math.floor(pclsharpcost);
        pclsharps += 1;
        pps += 5;
        pclsharpcounttext.innerText = `you have ${numberWithCommas(pclsharps)} pencil sharpeners`;
        pclsharpcosttext.innerText = `price of next pencil sharpener: ${numberWithCommas(pclsharpcost)} pencils`;
    }
});

buygrps.addEventListener("click", function() {
    if (pcls >= grpcost) {
        earn(-grpcost);
        grpcost += (grpcost / 100) * 30;
        grpcost = Math.floor(grpcost);
        grps += 1;
        ppc += 5;
        grpcounttext.innerText = `you have ${numberWithCommas(grps)} pieces of graphite`;
        grpcosttext.innerText = `price of next graphite: ${numberWithCommas(grpcost)} pencils`;
    }
});

buyrbr.addEventListener("click", function() {
    if (pcls >= rbrcost) {
        earn(-rbrcost);
        rbrcost += (rbrcost / 100) * 30;
        rbrcost = Math.floor(rbrcost);
        rbrs += 1;
        pps += 10;
        rbrcounttext.innerText = `you have ${numberWithCommas(rbrs)} erasers`;
        rbrcosttext.innerText = `price of next eraser: ${numberWithCommas(rbrcost)} pencils`;
    }
});

buyrls.addEventListener("click", function() {
    if (pcls >= rlscost) {
        earn(-rlscost);
        rlscost += (rlscost / 100) * 30;
        rlscost = Math.floor(rlscost);
        rls += 1;
        ppc += 15;
        rlscounttext.innerText = `you have ${numberWithCommas(rls)} rulers`;
        rlscounttext.innerText = `price of next ruler: ${numberWithCommas(rlscost)} pencils`;
    }
});

buyglue.addEventListener("click", function() {
    if (pcls >= gluecost) {
        earn(-gluecost);
        gluecost += (gluecost / 100) * 30;
        gluecost = Math.floor(gluecost);
        glues += 1;
        pps += 15;
        gluecounttext.innerText = `you have ${numberWithCommas(glues)} glue sticks`;
        gluecosttext.innerText = `price of next glue stick: ${numberWithCommas(gluecost)} pencils`;
    }
});

buyscs.addEventListener("click", function() {
    if (pcls >= scscost) {
        earn(-scscost);
        scscost += (scscost / 100) * 30;
        scscost = Math.floor(scscost);
        scs += 1;
        pps += 45;
        scscounttext.innerText = `you have ${numberWithCommas(scs)} scissors`;
        scscosttext.innerText = `price of next scissor: ${numberWithCommas(scscost)} pencils`;
    }
});

buypaper.addEventListener("click", function() {
    if (pcls >= papercost) {
        earn(-papercost);
        papercost += (papercost / 100) * 30;
        papercost = Math.floor(papercost);
        paper += 1;
        ppc += 25;
        papercounttext.innerText = `you have ${numberWithCommas(paper)} sheets of paper`;
        papercosttext.innerText = `price of next sheet of paper: ${numberWithCommas(papercost)} pencils`;
    }
});

buyschl.addEventListener("click", function() {
    if (pcls >= schlcost) {
        earn(-schlcost);
        schlcost += (schlcost / 100) * 30;
        schlcost = Math.floor(schlcost);
        schls += 1;
        pps += 70;
        schlcounttext.innerText = `you have ${numberWithCommas(schls)} schools`;
        schlcosttext.innerText = `price of next school: ${numberWithCommas(schlcost)} pencils`;
    }
});

buyhmwk.addEventListener("click", function() {
    if (pcls >= hmwkcost) {
        earn(-hmwkcost);
        hmwkcost += (hmwkcost / 100) * 30;
        hmwkcost = Math.floor(hmwkcost);
        hmwk += 1;
        hmwkcounttext.innerText = `you have ${numberWithCommas(hmwk)} sheets of homework`;
        hmwkcosttext.innerText = `price of next sheet of homework: ${numberWithCommas(hmwkcost)} pencils`;
    }
});

buypclcase.addEventListener("click", function() {
    if (pcls >= pclcasecost) {
        earn(-pclcasecost);
        pclcasecost += (pclcasecost / 100) * 40;
        pclcasecost = Math.floor(pclcasecost);
        pclcases += 1;
        pps += 75;
        ppc += 40;
        pclcasecounttext.innerText = `you have ${numberWithCommas(pclcases)} pencil cases`;
        pclcasecosttext.innerText = `price of next pencil case: ${numberWithCommas(pclcasecost)} pencils`;
    }
});
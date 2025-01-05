function drawHive(x, y, radius, slots) {
  const mutations = {
    NONE: color(255, 254, 254),
    ATTACK: color(234, 59, 54),
    CONVERTAMOUNT: color(249, 198, 64),
    GATHERAMOUNT: color(202, 250, 124),
    ENERGY: color(172, 138, 88),
    BEEABILITYRATE: color(185, 165, 240),
    CRITICALCHANCE: color(70, 209, 112),
    MOVESPEED: color(79, 184, 242),
    INSTANTCONVERSION: color(245, 254, 29)
  }
  const rarities = {
      COMMON: color(188, 128, 52),
      RARE: color(208, 209, 216),
      EPIC: color(224, 191, 9),
      LEGENDARY: color(79, 255, 240),
      MYTHIC: color(183, 158, 247),
      EVENT: color(147, 220, 98),
      U: color(117, 101, 33),
      SELECTED: color(27, 209, 94)
  };
  
  const colours = {
    COLORLESS: color(29, 48, 60),
    RED: color(244, 73, 56),
    BLUE: color(58, 143, 210)
  };
  
  const bees = {
    BA: ['COMMON', 'COLORLESS'],
    // rare
    BO: ['RARE', 'COLORLESS'],
    BR: ['RARE', 'COLORLESS'],
    BU: ['RARE', 'BLUE'],
    CO: ['RARE', 'BLUE'],
    HA: ['RARE', 'COLORLESS'],
    LO: ['RARE', 'COLORLESS'],
    RA: ['RARE', 'RED'],
    RAS: ['RARE', 'RED'],
    ST: ['RARE', 'COLORLESS'],
    // epic
    BUB: ['EPIC', 'BLUE'],
    BUC: ['EPIC', 'BLUE'],
    COM: ['EPIC', 'COLORLESS'],
    DE: ['EPIC', 'COLORLESS'],
    EX: ['EPIC', 'COLORLESS'],
    FI: ['EPIC', 'RED'],
    FR: ['EPIC', 'BLUE'],
    HO: ['EPIC', 'COLORLESS'],
    RAG: ['EPIC', 'RED'],
    RI: ['EPIC', 'RED'],
    SH: ['EPIC', 'COLORLESS'],
    // legendary
    BAB: ['LEGENDARY', 'COLORLESS'],
    CA: ['LEGENDARY', 'COLORLESS'],
    DEM: ['LEGENDARY', 'RED'],
    DI: ['LEGENDARY', 'BLUE'],
    LI: ['LEGENDARY', 'COLORLESS'],
    MU: ['LEGENDARY', 'COLORLESS'],
    NI: ['LEGENDARY', 'BLUE'],
    SHY: ['LEGENDARY', 'RED'],
    // mythic
    BUO: ['MYTHIC', 'BLUE'],
    FU: ['MYTHIC', 'COLORLESS'],
    PR: ['MYTHIC', 'RED'],
    SP: ['MYTHIC', 'RED'],
    TA: ['MYTHIC', 'BLUE'],
    VE: ['MYTHIC', 'COLORLESS'],
    // event
    BE: ['EVENT', 'COLORLESS'],
    COB: ['EVENT', 'BLUE'],
    CR: ['EVENT', 'RED'],
    FE: ['EVENT', 'RED'],
    GU: ['EVENT', 'COLORLESS'],
    PH: ['EVENT', 'COLORLESS'],
    PU: ['EVENT', 'COLORLESS'],
    TAB: ['EVENT', 'COLORLESS'],
    VI: ['EVENT', 'BLUE'],
    WI: ['EVENT', 'COLORLESS'],
    DIG: ['EVENT', 'COLORLESS']
  };

  let xOffset = 0;
  let yOffset = Math.floor(radius / 2);

  for (let i = 0; i < slots.length; i++) {
    let bee = slots[i].toUpperCase();
    let rarity = slots[i] != 'U' ? bees[bee][0] : 'U';
    let fillColour = rarities[rarity];

    if (i > 0 && i % 5 == 0) {
      yOffset -= radius / 1.2;
      xOffset = 0;
    }
    if ((i + 3) % 5 == 0 || (i + 1) % 5 == 0) {
      yOffset += radius / 1.1;
    } else {
      yOffset -= radius / 1.1;
    }
    xOffset += radius * 1.5;
    stroke(134, 89, 8);
    strokeWeight(2);

    hexes.push({x: x + xOffset, y: y + yOffset, bee: bee, type: rarity});

    if (slots[i] == 'U') {
      if (hexes[i].type != 'SELECTED') {
        fill(rarities.U);
      } else {
        fill(rarities.SELECTED);
      }
      stroke(get(0, 0));
      hexagon(x + xOffset, y + yOffset, radius - 2);
    } else if (hexes[i].type == 'SELECTED') {
      fill(rarities.SELECTED);
    } else {
      fill(fillColour);
    }
    
    if (slots[i] != 'U') {
      let x = hexes[hexes.length - 1].x;
      let y = hexes[hexes.length - 1].y;
      hexagon(x, y, radius);
      level(x, y, 21);
    }

    if (slots[i] != 'U') {
      let imgName = `bee_${slots[i].toUpperCase()}`;
      let img = bee_imgs[imgName];
      if (slots[i].toUpperCase() != 'LO' && slots[i].toUpperCase() != 'CA') {
          tint(colours[bees[slots[i].toUpperCase()][1]]);
      } else {
        noTint();
      }
      imageMode(CENTER)
      image(img, x + xOffset, y + yOffset, radius + 8, radius + 8);
    }

    if (slots[i] == slots[i].toLowerCase()) {
      stroke('#ff0');
      strokeWeight(4);
      noFill();
      hexagon(x + xOffset, y + yOffset, radius - 4.5);
    }

    let isNormal = true;
    for (const k of hexes) {
      if (k.type == 'SELECTED') {
        isNormal = false;
      }
    }
    if (isNormal) {
      hexesNormal = [...hexes];
    }

  }
  if (slots.length < 25) {
    if (slots.length % 5 == 0) {
      yOffset -= radius / 1.2;
      xOffset = 0;
    }
    if ((slots.length + 3) % 5 == 0 || (slots.length + 1) % 5 == 0) {
      yOffset += radius / 1.1;
    } else {
      yOffset -= radius / 1.1;
    }
    xOffset += radius * 1.5;
    hexes.push({x: x + xOffset, y: y + yOffset, bee: 'U', type: 'U'});
    for (let j = 1; j < 25 - slots.length + 1; j++) {
      stroke(get(0, 0));
      if (hexes[j + slots.length - 1].type == 'SELECTED') {
        fill(rarities.SELECTED);
      } else {
        fill(rarities.U);
      }
      hexagon(hexes[hexes.length - 1].x, hexes[hexes.length - 1].y, radius - 2);
      if ((j + slots.length) % 5 == 0) {
        yOffset -= radius / 1.2;
        xOffset = 0;
      }
      if (((j + slots.length) + 3) % 5 == 0 || ((j + slots.length) + 1) % 5 == 0) {
        yOffset += radius / 1.1;
      } else {
        yOffset -= radius / 1.1;
      }
      xOffset += radius * 1.5;
      
      hexes.push({x: x + xOffset, y: y + yOffset, bee: 'U', type: 'U'});
    }
    hexes.pop();
    let isNormal = true;
    for (const k of hexes) {
      if (k.type == 'SELECTED') {
        isNormal = false;
      }
    }
    if (isNormal) {
      hexesNormal = [...hexes];
    }
  }
}

function hexagon(x, y, radius) {
  let angle = PI / 3;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function level(x, y, number) {
  let posX = x-23;
  let posY = y;
  textFont(hwfnt);
  textAlign(CENTER, CENTER);
  textSize(17);
  fill(0);
  text(number, posX, posY);
  textFont(fnt);
}

function drawHive(x, y, radius, slots) {
    const rarities = {
        COMMON: color(109, 83, 24),
        RARE: color(219),
        EPIC: color(224, 191, 9),
        LEGENDARY: color(59, 219, 211),
        MYTHIC: color(109, 95, 147),
        EVENT: color(102, 148, 67),
        U: color(117, 101, 33),
        SELECTED: color(74, 237, 84)
    };
    
    const colours = {
      WHITE: color(31, 53, 68),
      RED: color(255, 90, 53),
      BLUE: color(64, 150, 211)
    };
    
    const bees = {
      BA: ['COMMON', 'WHITE'],
      // rare
      BO: ['RARE', 'WHITE'],
      BR: ['RARE', 'WHITE'],
      BU: ['RARE', 'BLUE'],
      CO: ['RARE', 'BLUE'],
      HA: ['RARE', 'WHITE'],
      LO: ['RARE', 'WHITE'],
      RA: ['RARE', 'RED'],
      RAS: ['RARE', 'RED'],
      ST: ['RARE', 'WHITE'],
      // epic
      BUB: ['EPIC', 'BLUE'],
      BUC: ['EPIC', 'BLUE'],
      COM: ['EPIC', 'WHITE'],
      DE: ['EPIC', 'WHITE'],
      EX: ['EPIC', 'WHITE'],
      FI: ['EPIC', 'RED'],
      FR: ['EPIC', 'BLUE'],
      HO: ['EPIC', 'WHITE'],
      RAG: ['EPIC', 'RED'],
      RI: ['EPIC', 'RED'],
      SH: ['EPIC', 'WHITE'],
      // legendary
      BAB: ['LEGENDARY', 'WHITE'],
      CA: ['LEGENDARY', 'WHITE'],
      DEM: ['LEGENDARY', 'RED'],
      DI: ['LEGENDARY', 'BLUE'],
      LI: ['LEGENDARY', 'WHITE'],
      MU: ['LEGENDARY', 'WHITE'],
      NI: ['LEGENDARY', 'BLUE'],
      SHY: ['LEGENDARY', 'WHITE'],
      // mythic
      BUO: ['MYTHIC', 'BLUE'],
      FU: ['MYTHIC', 'WHITE'],
      PR: ['MYTHIC', 'RED'],
      SP: ['MYTHIC', 'RED'],
      TA: ['MYTHIC', 'BLUE'],
      VE: ['MYTHIC', 'WHITE'],
      // event
      BE: ['EVENT', 'WHITE'],
      COB: ['EVENT', 'BLUE'],
      CR: ['EVENT', 'RED'],
      FE: ['EVENT', 'RED'],
      GU: ['EVENT', 'WHITE'],
      PH: ['EVENT', 'WHITE'],
      PU: ['EVENT', 'WHITE'],
      TAB: ['EVENT', 'WHITE'],
      VI: ['EVENT', 'BLUE'],
      WI: ['EVENT', 'WHITE']
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
        hexagon(hexes[hexes.length - 1].x, hexes[hexes.length - 1].y, radius);
      }

      if (slots[i] != 'U') {
        let imgName = `bee_${slots[i].toUpperCase()}`;
        let img = bee_imgs[imgName];
        tint(colours[bees[slots[i].toUpperCase()][1]]);
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
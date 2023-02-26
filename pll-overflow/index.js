const storage = window.localStorage;
const pllList = [
    'Aa',
    'Ab',
    'E',
    'F',
    'Ga',
    'Gb',
    'Gc',
    'Gd',
    'H',
    'Ja',
    'Jb',
    'Na',
    'Nb',
    'Ra',
    'Rb',
    'T',
    'Ua',
    'Ub',
    'V',
    'Y',
    'Z',
    'Skip'
];
const defaultData = JSON.stringify({
    Aa: 0,
    Ab: 0,
    E: 0,
    F: 0,
    H: 0,
    Ga: 0,
    Gb: 0,
    Gc: 0,
    Gd: 0,
    Ja: 0,
    Jb: 0,
    Na: 0,
    Nb: 0,
    Ra: 0,
    Rb: 0,
    T: 0,
    Ua: 0,
    Ub: 0,
    V: 0,
    Y: 0,
    Z: 0,
    Skip: 0,
    streak: 1
});
const maxCounts = {
    Aa: 4,
    Ab: 4,
    E: 2,
    F: 4,
    H: 1,
    Ga: 4,
    Gb: 4,
    Gc: 4,
    Gd: 4,
    Ja: 4,
    Jb: 4,
    Na: 1,
    Nb: 1,
    Ra: 4,
    Rb: 4,
    T: 4,
    Ua: 4,
    Ub: 4,
    V: 4,
    Y: 4,
    Z: 2,
    Skip: 1
};
let data;

$(document).ready(() => {
    $('#chall-container').hide();
    $('#lose-container').hide();
    $('#win-container').hide();
    if (storage.getItem('pll-overflow')) {
        $('#chall-container').show();
        $('#new-container').hide();
        $('#lose-container').hide();
        $('#win-container').hide();
    }
    data = JSON.parse(storage.getItem('pll-overflow') ?? defaultData);

    for (const k of Object.entries(pllList)) {
        if (data[k] > maxCounts[k]) {
            loseGame(k, data[k]);
        }
        $(`#${k}`).val(data[l]);
    }
    $('#streak').html(`Streak: ${data.streak}/72`);
});

$('#new-chall').on('click', () => {
    $('#chall-container').show();
    $('#new-container').hide();
    $('#lose-container').hide();
    $('#win-container').hide();
});

$('#submit').on('click', () => {
    storage.setItem('pll-overflow', JSON.stringify(data));
    pllList.forEach(pll => {
        const count = $(`#${pll}`).val();
        data[pll] = count;
        if (count > maxCounts[pll]) {
            loseGame(pll, count);
        }
    });
    data.streak += 1;
    if (data.streak == 72) {
        winGame();
    }
    $('#streak').html(`Streak: ${data.streak}/72`);
});

$('.restart-chall').on('click', () => {
    storage.setItem('pll-overflow', defaultData);
    data = JSON.parse(storage.getItem('pll-overflow'));
    pllList.forEach(pll => {
        $(`#${pll}`).val(0);
    });
    $('#streak').html(`Streak: ${data.streak}/72`);
    $('#chall-container').show();
    $('#new-container').hide();
    $('#lose-container').hide();
    $('#win-container').hide();
});

function loseGame(pll, count) {
    $('#chall-container').hide();
    $('#new-container').hide();
    $('#lose-container').show();
    $('#win-container').hide();

    pll == 'Skip' ? $('#lose-msg').html(`You lose! ${count}/${maxCounts[pll]} ${pll}s! Streak: ${data.streak}/72`) : $('#lose-msg').html(`You lose! ${count}/${maxCounts[pll]} ${pll} perms! Streak: ${data.streak}`);
}

function winGame() {
    $('#chall-container').hide();
    $('#new-container').hide();
    $('#lose-container').hide();
    $('#win-container').show();
}
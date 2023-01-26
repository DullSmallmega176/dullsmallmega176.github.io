const hidden = ['#card-q1', '#card-q2', '#card-q3', '#card-q4', '#card-q5', '#card-q6', '#card-q7', '#card-q8'];

let total;
let q;

const getPoints = n => {total += n};

function start() {
    total = 0;
    q = 0;
    for (const elt of hidden) {
        $(elt).hide();
    }
    $('#card-q0').show();
}

$(document).ready(() => start());

$('button:not(#replay)').click(() => {
    q += 1;
    $(`#card-q${q}`).show();
    $(`#card-q${q-1}`).hide();
    if (q == 8) { end(); }
});

$('#replay').click(() => start());

function end() {
    let person = '';
    if (total <= 830) {
        person = 'joe hawley from tally hall';
    } else if (total <= 1160 && total > 830) {
        person = 'ross featherman';
    } else if (total <= 1490 && total > 1160) {
        person = 'rob can\'tor';
    } else if (total <= 1820 && total > 1490) {
        person = 'andrew hrowits';
    } else {
        person = 'zubin sedghi';
    }

    $('#result').html(`you are........... ${person}!! 😁😁😁`);
}
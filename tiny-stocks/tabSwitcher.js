const tabs = ['stock', 'stat', 'settings'];

function switchTab(t) {
    if (!tabs.includes(t)) { return; }

    for (const i of tabs) {
        if (i != t) {
            $(`#${i}-tab`).hide();
        } else {
            $(`#${i}-tab`).show();
        }
    }
}
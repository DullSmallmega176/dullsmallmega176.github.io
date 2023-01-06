function resetSave() {
    let reset = confirm('are you sure? this action is final.');
    if (!reset) { return; }
    storage.removeItem('tiny-stocks');
    window.location.reload(true);
}
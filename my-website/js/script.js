function openDiscordProfile(e) {
    if (e) {
        e.preventDefault();
    }
    const appUrl = 'discord://-/users/522940239904243712';
    const webUrl = 'https://discord.com/users/522940239904243712';
    let appLaunched = false;
    const fallbackTimeout = setTimeout(() => {
        if (!appLaunched) {
            window.location.href = webUrl;
        }
    }, 500); 
    window.onblur = function() {
        appLaunched = true;
        clearTimeout(fallbackTimeout);
        window.onblur = null;
    };
    window.location.href = appUrl;
    setTimeout(() => {
        if (!appLaunched) {
            window.onblur = null; 
        }
    }, 100); 
}

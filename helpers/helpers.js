exports.getName = function(link) {
    let name = link.split('/').pop().split('')[0].toUpperCase() + link.split('/').pop().substr(1);
    if(name.includes('-')) {
        const frist = name.split('-')[0];
        const second = name.split('-')[1].split('')[0].toUpperCase() + name.split('-')[1].substr(1);
        name = frist +"_"+ second;
    }
    return name
};

exports.getModel = function(string) {
    const new_str = string.replace('\n', '').replace(' ', '').replace('\n', '');
    return new_str
};

exports.splitUrl = function(url) {
    const url_split = url.replace('https://www.exemple.fr/', '').split('/').slice(2);
    return url_split
};
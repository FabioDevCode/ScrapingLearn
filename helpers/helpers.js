exports.getName = function(link) {
    return name = link.split('/').pop().split('')[0].toUpperCase() + link.split('/').pop().substr(1);
}
nbici.filter('orderByDate', function(){
    /**
     * Order spinning class list by date
     * @return _spinningClasses
     */
    return function(spinningClasses, reverse) {

        var filtered = [];

        angular.forEach(spinningClasses, function(item) {
            filtered.push(item);
        });

        filtered.sort(function (a, b) {
            return (a.getDate() > b.getDate() ? 1 : -1);
        });

        if(reverse) filtered.reverse();

        return filtered;
    }
});
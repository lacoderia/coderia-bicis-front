nbici.filter('classByType', function(){
    /**
     * Filter spinning class list by classType
     * @return _spinningClasses
     */
    return function(spinningClasses, classType) {

        var _spinningClasses = [];
        if(classType) {
            for(var i=0; i<spinningClasses.length; i++) {
                var currentClass = spinningClasses[i];
                if(currentClass.getClassTypeId() == classType.id){
                    _spinningClasses.push(currentClass);
                }
            }

        } else {
            _spinningClasses = spinningClasses;
        }

        return _spinningClasses;

    }
});
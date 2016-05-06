'use strict';
define(['models/user', 'knockout'], function (User, ko) {
    ko.protectedObservable = function (initialValue) {
        //private variables
        var _actualValue = ko.observable(initialValue),
            _tempValue = initialValue;

        //computed observable that we will return
        var result = ko.computed({
            //always return the actual value
            read: function () {
                return _actualValue();
            },
            //stored in a temporary spot until commit
            write: function (newValue) {
                _tempValue = newValue;
            }
        }).extend({ notify: "always" });

        //if different, commit temp value
        result.commit = function () {
            if (_tempValue !== _actualValue()) {
                _actualValue(_tempValue);
            }
        };

        //force subscribers to take original
        result.reset = function () {
            _actualValue.valueHasMutated();
            _tempValue = _actualValue();   //reset temp value
        };

        return result;
    };

    var users = [
            new User('Артем', 'Теллур', 'Михайлович', '1996-06-28', 100, true),
            new User('Виктор', 'Викторов', 'Викторович', '1996-06-28', 130, true),
            new User('Сергей', 'Сергеев', 'Михайлович', '1996-06-28', 120, false),
            new User('Антон', 'Антонов', 'Антонович', '1996-06-28', 200, false),
            new User('Виталий', 'Кудла', 'Михайлович', '1996-06-20', 400, true),
            new User('Артем', 'Артемов', 'Михайлович', '1996-06-08', 1000, false),
            new User('Виктор', 'Теллур', 'Викторович', '1996-12-01', 1030, true),
            new User('Артем', 'Коломин', 'Михайлович', '1996-06-02', 170, false),
    ],
        data = ko.observableArray(users),
        filter = ko.protectedObservable(''),
        filteredItems,
        sortOrder = ko.observable('fullName');

    ko.observableArray.fn.sortByProperty = function (prop) {
        return this.sort(function (obj1, obj2) {
            if (obj1[prop()]() == obj2[prop()]())
                return 0;
            else if (obj1[prop()]() < obj2[prop()]())
                return -1;
            else
                return 1;
        });
    };

    function addUser(user) {
        data.push(user);
    };

    filteredItems = ko.computed(function () {
        var filterString = filter().toLowerCase();
        if (!filterString) {
            return data;
        }
        else {
            return ko.observableArray(ko.utils.arrayFilter(data(), function (user) {
                return ko.utils.stringStartsWith(user.fullName().toLowerCase(), filterString);
            }));
        }
    });


    return {
        sortOrder: sortOrder,
        filter: filter,
        filteredItems: filteredItems,
        addUser: addUser,
    };
});
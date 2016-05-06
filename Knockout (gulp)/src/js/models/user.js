'use strict';
define(['knockout'], function (ko) {
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

    function User(name, surname, patronymic, birthdate, sortIndex, isActive) {
        this.name = ko.protectedObservable(name);
        this.surname = ko.protectedObservable(surname);
        this.patronymic = ko.protectedObservable(patronymic);
        this.birthdate = ko.protectedObservable(birthdate);
        this.sortIndex = ko.protectedObservable(sortIndex);
        this.isActive = ko.protectedObservable(isActive);
        this.fullName = ko.computed(function () {
            return this.surname() + ' ' + this.name() + ' ' + this.patronymic();
        }, this);
        this.age = ko.computed(function () {
            return ((new Date().getTime() - new Date(this.birthdate())) / (24 * 3600 * 365.25 * 1000)) | 0;
        }, this);
    };

    User.prototype.commit = function () {
        this.name.commit();
        this.surname.commit();
        this.patronymic.commit();
        this.birthdate.commit();
        this.sortIndex.commit();
        this.isActive.commit();
    }
    return User;
});
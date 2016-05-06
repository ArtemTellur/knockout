'use strict';
define(['knockout', 'models/user'], function (ko, User) {
    var self;

    function Form(isEdited, isAdded, isVisible, isHovered) {
        this.user = ko.observable(new User('', '', '', '', '', ''));
        this.isEdited = ko.observable(isEdited);
        this.isAdded = ko.observable(isAdded);
        this.isVisible = ko.observable(isVisible);
        this.isHovered = ko.observable(isHovered);
        self = this;
    };

    Form.prototype.show = function () {
        this.isVisible(true);
    };

    Form.prototype.hide = function () {
        this.isVisible(false);
    };

    Form.prototype.selectUser = function () {
        if (self.isHovered()) {
            self.user(this);
        }
    };

    return Form;
});
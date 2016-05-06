'use strict';
define(['knockout', 'jquery', 'models/form', 'models/data', 'models/user', 'libs/jquery.validate'], function (ko, $, Form, data, User) {

    var form = ko.observable(new Form(false, false, false, true)),
        ourForm = $('#main-form'),
        CONFIG = {
            required: true,
            notspaces: true,
        },
        validation = ourForm.validate({
            rules: {
                surname: CONFIG,
                firstname: CONFIG,
                middlename: CONFIG,
                date: {
                    required: true,
                },
                sortindex: {
                    initialindex: {
                        initialValue: 100,
                    },
                    digits: true,
                },
            },
            onfocusout: false,
            onkeyup: false,
            onclick: false,
            errorClass: 'error',
        });

    $.validator.addMethod('notspaces', function (value, element) {
        return !/^\s+$/.test(value); //!(value.match(/\s/g).length === value.length);
    }, 'Ваша строка содержит только пробелы!');

    $.validator.addMethod('initialindex', function (value, element, params) {
        return form().user().sortIndex($(element).val() || params['initialValue']);
    });

    function showDetails() {
        if (form().isHovered()) {
            form().show();
        }
    };

    function hideDetails() {
        if (form().isHovered()) {
            form().hide();
        }
    };

    function showAddingForm() {
        validation.resetForm();
        form().isHovered(false);
        form().isAdded(true);
        form().isEdited(false);
        form().show();
        form().user(new User('', '', '', '', '', ''));
    };

    function hideForm() {
        validation.resetForm();
        form().isHovered(true);
        form().isAdded(false);
        form().isEdited(false);
        form().hide();
    };

    function сonfirm() {
        if (ourForm.valid()) {
            form().user().commit();
            if (form().isAdded()) {
                data.addUser(form().user());
                data.filteredItems().sortByProperty(data.sortOrder);
            }
            hideForm();
        }
    };

    function showEditingForm() {
        validation.resetForm();
        form().user(this)
        form().isHovered(false);
        form().isAdded(false);
        form().isEdited(true);
        form().show();
    }

    return {
        form: form,
        showDetails: showDetails,
        hideDetails: hideDetails,
        showAddingForm: showAddingForm,
        hideForm: hideForm,
        сonfirm: сonfirm,
        showEditingForm: showEditingForm,
    };
});
'use strict';
define(['models/data', 'knockout'], function (data, ko) {
    var element;

    $('tbody').on('click', 'tr', function (event) {
        if (element != event.currentTarget)
        {
            $(element).removeClass('current');
        }
        element = event.currentTarget;
        $(element).addClass('current');
    });

    $('.btn-confirm, .btn-cancel, .btn-add').on('click', function (event) {
        $(element).removeClass('current');
    });
    return data;
});
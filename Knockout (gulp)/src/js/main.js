'use strict';
require.config({
    baseUrl: '/js',
    paths: {
        'jquery': '/js/libs/jquery-2.2.2',
        'knockout': '/js/libs/knockout-3.4.0.debug',
    },
    shim: {
        'jquery': {
            exports: 'jQuery',
        },
        'knockout': {
            deps: ['jquery'],
            exports: 'ko',
        },
    },
});

require(['jquery', 'viewmodels/usersvm', 'knockout', 'viewmodels/formvm', 'bindings/knockout.bindings.orderable'], function ($, users, ko, form, orderable) {
    var vm = {
        users: users,
        form: form,
    };

    ko.applyBindings(vm);
});
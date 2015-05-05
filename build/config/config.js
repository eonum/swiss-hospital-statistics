/**
 * Created by aliaksei on 03/08/14.
 */

require.config({
    baseUrl: '/',

    paths: {
        topbar: 'foundation/topbar',
        magellan: 'foundation/magellan'
    },

    shim: {

    }
});

requirejs(['application']);
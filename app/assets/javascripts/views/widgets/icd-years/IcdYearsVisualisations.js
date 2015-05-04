define([
    'View',
    'announcements/OnIcdAgesDeselected',
    'announcements/OnIcdAgesSelected',
    'announcements/OnIcdYearsDeselected',
    'announcements/OnIcdYearsSelected'
], function(
    View,
    OnIcdAgesDeselected,
    OnIcdAgesSelected,
    OnIcdYearsDeselected,
    OnIcdYearsSelected
){

    function IcdYearsVisualisations() {
        var _this = new View('<div class="row full-width"></div>');

        var man;
        var woman;
        var model;

        /*--------- V I S U A L I S A T I O N S ---------*/
        _this.update = function (selection) {
            // parse selections here
            // retrieve data from db
            // convert data
            // update visualisations


            // dummy update
            _this.womanChart().html(JSON.stringify(selection));
            _this.manChart().html(JSON.stringify(selection));
        };

        /**
         * Returns new chart, a subclass of ResponsiveSvg subclass, that is used to visualise women
         * @returns {ResponsiveSvg|View}
         */
        _this.newWomanChart = function () {
            return new View('<div style="background: #ff69b4; height: 500px"></div>')
        };

        /**
         * Returns new chart, a subclass of ResponsiveSvg subclass, that is used to visualise men
         * @returns {ResponsiveSvg|View}
         */
        _this.newManChart = function () {
            return new View('<div style="background: #88d0fc; height: 500px"></div>')
        };

        /*------------------------------------------------*/

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.announcer().onSendTo(OnIcdAgesDeselected, _this.invalidate, _this);
            model.announcer().onSendTo(OnIcdAgesSelected, _this.invalidate, _this);
            model.announcer().onSendTo(OnIcdYearsDeselected, _this.invalidate, _this);
            model.announcer().onSendTo(OnIcdYearsSelected, _this.invalidate, _this);
            _this.render();
            return _this;
        };

        _this.render = function () {
            woman = _this.newWomanChart();
            man = _this.newManChart();
            var left = _this.newColumn();
            var right = _this.newColumn();
            left.add(woman);
            right.add(man);
            _this.add(left);
            _this.add(right);
        };

        _this.manChart = function () {
            return man;
        };

        _this.womanChart = function () {
            return woman;
        };

        _this.newColumn = function () {
            return new View('<div class="columns large-6"></div>');
        };

        _this.invalidate = function() {
            _this.update(_this.model().selection());
        };

        return _this;
    }

    return IcdYearsVisualisations;

});
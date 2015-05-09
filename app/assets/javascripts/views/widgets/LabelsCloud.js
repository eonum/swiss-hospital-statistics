define([
    'View',
    'announcements/OnLabelsCloudAdded',
    'announcements/OnLabelsCloudRemoved',
    'announcements/OnAlphabeticalItemSelected'
], function(
    View,
    OnLabelsCloudAdded,
    OnLabelsCloudRemoved,
    OnAlphabeticalItemSelected
){

    function Label(cloud){
        var _this = new View('<li></li>');
        var label = new View('<span class="success label radius"></span>');

        var item;

        _this.item = function (_item) {
            if (_.isUndefined(_item)) return item;
            item = _item;
            _this.render();
            return _this;
        };

        _this.render = function () {
            label.html(_this.cloud().model().labelOf(_this.item()));
            _this.add(label);
            _this.click(function(e){
                e.preventDefault();
                _this.cloud().model().remove(_this.item());
            });
        };

        _this.label = function () {
            return label;
        };

        _this.cloud = function () {
            return cloud;
        };

        return _this;
    }

    function LabelsCloud() {
        var _this = new View('<ul class="inline-list labels-cloud"></ul>');

        var hintText;
        var model;
        var selectorModel;

        _this.model = function (_selectorModel) {
            if (_.isUndefined(_selectorModel)) return model;
            selectorModel = _selectorModel;
            model = _selectorModel.cloud();
            model.announcer().onSendTo(OnLabelsCloudAdded, _this.onAdded, _this);
            model.announcer().onSendTo(OnLabelsCloudRemoved, _this.onRemoved, _this);
            selectorModel.announcer().onSendTo(OnAlphabeticalItemSelected, _this.onSelected, _this);
            _this.render();
            return _this;
        };

        _this.selectorModel = function () {
            return selectorModel;
        };

        _this.render = function () {
            _this.empty();
            _this.renderHint();
            _.each(_this.model().items(), function(each){_this.addLabel(each)});
        };

        _this.newLabel = function () {
            return new Label(_this);
        };

        _this.onAdded = function(ann) {
            hintText.remove();
            _this.addLabel(ann.item());
        };

        _this.onRemoved = function(ann) {
            _this.removeLabel(ann.item());
            if (_.isEmpty(_this.model().items()))
                _this.add(hintText);
        };

        _this.onSelected = function(ann) {

        };

        _this.addLabel = function (item) {
            _this.add(_this.newLabel().item(item));
        };

        _this.renderHint = function () {
            hintText = _this.newHint();
            new Multiglot().on(hintText.find('p')).id('compare_hint').apply();
            if (_.isEmpty(_this.model().items()))
                _this.add(hintText);
        };

        _this.newHint = function () {
            return new View('<li class="panel radius callout"><p></p></li>');
        };

        _this.removeLabel = function (item) {
            _.find(_this.children(), function(each){return $(each).me().item() === item}).remove();
        };

        return _this;
    }

    return LabelsCloud;
});
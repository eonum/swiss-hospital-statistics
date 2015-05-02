define([
    'Announcer',
    'announcements/OnLabelsCloudAdded',
    'announcements/OnLabelsCloudRemoved'
], function(
    Announcer,
    OnLabelsCloudAdded,
    OnLabelsCloudRemoved
){

    function LabelsCloudModel() {
        var _this = this;

        var items = [];
        var announcer = new Announcer();
        var label = function(item) {return item.toString()};

        _this.items = function () {
            return items;
        };

        _this.announcer = function () {
            return announcer;
        };

        _this.has = function(item) {
            return _.indexOf(_this.items(), item) >= 0;
        };

        _this.add = function(item) {
            if (_this.has(item)) return;
            _this.items().push(item);
            _this.notifyAdded(item);
        };

        _this.remove = function(item) {
            if (!_this.has(item)) return;
            items = _.without(_this.items(), item);
            _this.notifyRemoved(item);
        };

        _this.toggle = function(item) {
            if (_this.has(item))
                _this.remove(item);
            else
                _this.add(item);
        };

        _this.addAll = function (_items) {
            _.each(_items, function(each) { _this.add(each)});
        };

        _this.removeAll = function () {
            var _items = _.flatten(_this.items());
            items = [];
            _.each(_items, function(each){_this.notifyRemoved(each)});
        };

        _this.label = function (func) {
            label = func;
            return _this;
        };

        _this.labelOf = function (item) {
            return label(item);
        };

        _this.notifyAdded = function (item) {
            _this.announcer().announce(new OnLabelsCloudAdded(item));
        };

        _this.notifyRemoved = function (item) {
            _this.announcer().announce(new OnLabelsCloudRemoved(item));
        };
    }

    return LabelsCloudModel;


});
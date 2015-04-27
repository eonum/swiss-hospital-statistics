define([
    'View'
], function(
    View
){

    function Button(_label) {
        var _this = new View('<li class="text-center"></li>');
        var link;
        var label = _label ? _label : 'Button';


        _this.initialize = function () {
            link = _this.newLink();
            _this.add(_this.link());
            _this.label(_this.label());
        };

        _this.link = function () {
            return link;
        };

        _this.newLink = function() {
            return new View('<a href="#"></a>');
        };

        _this.label = function (_label) {
            if (_.isUndefined(_label)) return label;
            label = _label;
            _this.link().text(_this.label());
        };

        _this.beActive = function () {
            _this.class('active');
        };

        _this.beNormal = function() {
            _this.removeClass('active');
        };

        _this.active = function(bool) {
            bool ? _this.beActive() : _this.beNormal();
        };

        _this.initialize();

        return _this;
    }

    function Title() {
        var _this = new View('<ul class="title-area"></ul>');
        var titleWrapper = new View('<li class="name"></li>');
        var title;

        _this.initialize = function () {
            _this.titleView(_this.newTitleView());
            _this.add(titleWrapper);
        };

        _this.title = function (string) {
            _this.titleView().html(string);
        };

        _this.titleView = function(_view) {
            if (_.isUndefined(_view)) return title;
            if (!_.isUndefined(_this.titleView())) _this.titleView().remove();
            title = _view;
            _this.titleWrapper().add(_this.titleView());
        };

        _this.titleWrapper = function() {
            return titleWrapper;
        };

        _this.newTitleView = function () {
            return new View('<h1></h1>');
        };

        _this.initialize();

        return _this;
    }

    function Section() {
        var _this = new View('<section class="top-bar-section"></section>');
        var leftSection;

        _this.initialize = function () {
            leftSection = _this.newLeftSection();
            _this.add(leftSection);
        };

        _this.addLeft = function (view) {
            _this.leftSection().add(view);
        };

        _this.leftSection = function () {
            return leftSection;
        };

        _this.newLeftSection = function () {
            return new View('<ul class="left"></ul>');
        };

        _this.initialize();

        return _this;
    }

    function TopBar() {
        var _this = new View('<nav class="top-bar" data-topbar role="navigation"></nav>');
        var title;
        var section;

        _this.initialize = function () {
            title = _this.newTitle();
            _this.add(_this.titleView());
            section = _this.newSection();
            _this.add(_this.section());
        };

        _this.titleView = function () {
            return title;
        };

        _this.section = function () {
            return section;
        };

        _this.newTitle = function () {
            return new Title();
        };

        _this.newSection = function () {
            return new Section();
        };

        _this.title = function (string) {
            _this.titleView().title(string);
        };

        _this.addLeft = function (view) {
            _this.section().addLeft(view);
        };

        _this.newButton = function (label) {
            return new Button(label);
        };

        _this.initialize();

        return _this;
    }

    return TopBar;

});
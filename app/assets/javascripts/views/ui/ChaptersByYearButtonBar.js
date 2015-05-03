define([
    'View', 'views/ui/ChaptersByYearVisualisation', 'helpers/converters/ChaptersByYearConverter'
], function(
    View, ChaptersByYearVisualisation, ChaptersByYearConverter
){

    function YearChoiceButtonBar(callback){
        var _this = new View('<div></div>');

        var typeButtons = new View('<div class="button-bar"></div>');
        var typeButtonGroup = new View('<ul class="button-group round"></ul>');

        var subtypeButtons = new View('<div class="button-bar"></div>');
        var callback = callback;

        var chaptersByYearConverter = new ChaptersByYearConverter();


        _this.initialize = function(){
            _this.addTypeButtons();
        };



        _this.setButton = function(year){
            $.getJSON("/api/v1/chaptersbyyear/" + year, function(data) {
                var criticalData = chaptersByYearConverter.convert(data);
                //chaptersByYearVisualisation.visualiseData("ICD Chapter Visualisation for the year: " + year,
                //    criticalData);
            });


        };


        _this.addTypeButtons = function() {
            _.each(_.range(2003, 2014),function(year) {
                var yearLink = new View('<a href="#" class="tiny button secondary"></a>');
                yearLink.text(year);
                yearLink.model(year);
                yearLink.click(function (e) {
                    e.preventDefault();
                    _this.setButton($(this).me().model())});
                typeButtonGroup.add(new View('<li></li>').add(yearLink));
            });

            typeButtons.add(typeButtonGroup);
            _this.append(typeButtons);
        };

        _this.initialize();

        return _this;
    }

    return YearChoiceButtonBar;
});
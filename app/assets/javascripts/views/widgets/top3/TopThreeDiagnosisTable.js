define([
    'd3',
    'views/ResponsiveSvg',
    'views/ui/HospitalTypeButtonBar',
    'View'
], function (
    d3,
    ResponsiveSvg,
    HospitalTypeButtonBar,
    View
){
    function TopThreeDiagnosisTable(){
        const TOTAL = 0;
        const MEN = 1;
        const WOMEN = 2;

        var _this = new View('<div></div>');
        var table = $("<table/>");

        //TODO: translation
        var categories = ["Total", "Männer", "Frauen"];
        var intervals = ["0-14", "15-39", "40-69", "70+", "Total"];

        _this.initialize = function() {
            _this.resetTable();
            _this.append(table);
        };

        _this.setData = function(data){
            _this.resetTable();

            for(var i = 0; i < data.length; i++) {
                var row = $("<tr/>");
                table.append(row);
                row.append(($("<th/>").text(intervals[i])));

                _this.appendSingleCellToRow(data[i][TOTAL], row);
                _this.appendSingleCellToRow(data[i][MEN], row);
                _this.appendSingleCellToRow(data[i][WOMEN], row);
            }
        };

        _this.appendSingleCellToRow = function(datasets, row){
            var cellTable = $("<table/>").css("border", "0px").css("width", "100%");
            row.append($("<td/>").append(cellTable));
            // sort datasets by descending percentage
            datasets = _.sortBy(datasets, 'percentage').reverse();
            datasets.forEach(function(item){
                var row = $("<tr/>");
                row.append($("<td/>").css("width", "10%").text(item.code));
                var description = $("<td>");
                row.append(description);
                Multiglot.custom(description, item);
                row.append($("<td>").css("width", "10%").text(item.percentage.toPrecision(3) + "%"));
                cellTable.append(row);
            });
        };

        _this.resetTable = function(){
            $(table).children().remove();
            var tableHeader = $("<tr/>").append($("<th/>"));
            categories.forEach(function(interval){tableHeader.append($("<th/>").text(interval))});
            table.append(tableHeader);
        };

        _this.initialize();

        return _this;
    }

    return TopThreeDiagnosisTable;

});

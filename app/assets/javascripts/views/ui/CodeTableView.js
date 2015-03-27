define([
    'View'
], function (
    View
) {

    function CodeTableView() {
        var _this = new View('<table></table>');
        var body = new View('<tbody></tbody>');
        var codes;

        _this
            .add('<thead><tr><th width="200">Code</th><th width="150">Description</th></tr></thead>')
            .add(body);

        _this.initialize = function () {
            body.empty();
            _.each(_this.codes(), function(each){
                body.add(new View('<tr><td>'+each.code()+'</td><td>'+each.description()+'</td></tr>'));
            });
        };

        /**
         * @param {Array.<AbstractDataset>} _codes
         */
        _this.setCodes = function (_codes) {
            codes = _codes;
            _this.initialize();
        };

        /**
         * @param {Array.<AbstractDataset>} _codes
         */
        _this.codes = function () {
            return codes;
        };

        return _this;
    }
    return CodeTableView;
});
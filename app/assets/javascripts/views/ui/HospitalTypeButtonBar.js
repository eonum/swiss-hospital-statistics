define([
    'View'
], function(
    View
){

    function CatalogChoiceButtonBar(callback){


        var _this = new View('<div></div>');

        var typeButtons = new View('<div class="button-bar"></div>');
        var typeButtonGroup = new View('<ul class="button-group round"></ul>');


        var subtypeButtons = new View('<div class="button-bar"></div>');
        var subtypeButtonGroup = new View('<ul class="button-group round"></ul>');

        var generalHospitalButtons = [];
        var callback = callback;

        _this.initialize = function(){
            _this.addAndSetTypeButtons();
            _this.addGeneralHospitalButtons;
            _this.addSpecialClinicButtons;
        };

        _this.setGeneralHospitalButtons = function(){
            /* TODO:
                - @before: build two arrays of subtype buttons (general, special) @init
                - remove all buttons from subtypeButtonGroup
                - add all buttons of one of the two subtype arrays
             */
        };

        _this.setSpecialClinicButtons = function(){

        };

        _this.addGeneralHospitalButtons = function(){

        };

        _this.addSpecialClinicButtons = function(){

        };


        _this.addAndSetTypeButtons = function(){
            var general = new $(new View('<a href="#" class="small button secondary">Allgemeine Krankenhäuser</a>'));
            general.click(_this.setGeneralHospitalButtons());
            typeButtonGroup.add(new View('<li></li>').add(general));

            var special = new $(new View('<a href="#" class="small button secondary">Spezialkliniken</a>'));
            general.click(_this.setSpecialClinicButtons());
            typeButtonGroup.add(new View('<li></li>').add(special));


            typeButtons.add(typeButtonGroup);
            _this.append(typeButtons);
        };

        _this.initialize();

        return _this;
    }

    return CatalogChoiceButtonBar;
});
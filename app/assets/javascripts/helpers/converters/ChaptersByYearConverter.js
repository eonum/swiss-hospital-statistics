define([], function() {

    function ChaptersByYearConverter() {
        var _this = {};

        var WOMAN = 0;
        var MAN = 1;

        var endData = [];

        _this.initialize = function () {

        };

        // This function will iterate per year through all age intervals and sum it up
        // first for loop iterates through the years while the second iterates through
        // the age intervals.
        _this.convert = function (dataset) {
            var percentageInterval_male = {"I": 0, "II": 0, "III": 0, "IV": 0, "V": 0, "VI": 0, "VII": 0, "VIII": 0, "IX": 0, "X": 0,
                "XI": 0, "XII": 0, "XIII": 0, "XIV": 0, "XV": 0, "XVI": 0, "XVII": 0, "XVIII": 0, "XIX": 0, "XX": 0, "XXI": 0};
            var percentageInterval_female = {"I": 0, "II": 0, "III": 0, "IV": 0, "V": 0, "VI": 0, "VII": 0, "VIII": 0, "IX": 0, "X": 0,
                "XI": 0, "XII": 0, "XIII": 0, "XIV": 0, "XV": 0, "XVI": 0, "XVII": 0, "XVIII": 0, "XIX": 0, "XX": 0, "XXI": 0};

            // iterates through all years of the year interval
            for(i = 0; i < dataset.years.length; i++) {
                $.getJSON("/api/v1/chaptersbyyear/" + dataset.years[i], function(data) {

                    // var tmpYear = dataset.years[i];

                    for (j = 0; j < dataset.ages.length; j++) {
                        var tmpAgeInterval = dataset.ages[j];


                        _.each(data, function(d) {
                            var dataShortHand = d.categorised_data.categories.icd_chapter_sex_interval[0];
                            var intervalShortHand = dataShortHand.interval.from +
                                (_.isUndefined(dataShortHand.interval.to) ? '+' : '-' + dataShortHand.interval.to );


                            if(dataShortHand.sex == MAN && intervalShortHand == tmpAgeInterval) {
                                switch(d.code) {
                                    case 'I':
                                        percentageInterval_male["I"] += dataShortHand.percentage;
                                        break;
                                    case 'II':
                                        percentageInterval_male["II"] += dataShortHand.percentage;
                                        break;
                                    case 'III':
                                        percentageInterval_male["III"] += dataShortHand.percentage;
                                        break;
                                    case 'IV':
                                        percentageInterval_male["IV"] += dataShortHand.percentage;
                                        break;
                                    case 'V':
                                        percentageInterval_male["V"] += dataShortHand.percentage;
                                        break;
                                    case 'VI':
                                        percentageInterval_male["VI"] += dataShortHand.percentage;
                                        break;
                                    case 'VII':
                                        percentageInterval_male["VII"] += dataShortHand.percentage;
                                        break;
                                    case 'VIII':
                                        percentageInterval_male["VIII"] += dataShortHand.percentage;
                                        break;
                                    case 'IX':
                                        percentageInterval_male["IX"] += dataShortHand.percentage;
                                        break;
                                    case 'X':
                                        percentageInterval_male["X"] += dataShortHand.percentage;
                                        break;
                                    case 'XI':
                                        percentageInterval_male["XI"] += dataShortHand.percentage;
                                        break;
                                    case 'XII':
                                        percentageInterval_male["XII"] += dataShortHand.percentage;
                                        break;
                                    case 'XIII':
                                        percentageInterval_male["XIII"] += dataShortHand.percentage;
                                        break;
                                    case 'XIV':
                                        percentageInterval_male["XIV"] += dataShortHand.percentage;
                                        break;
                                    case 'XV':
                                        percentageInterval_male["XV"] += dataShortHand.percentage;
                                        break;
                                    case 'XVI':
                                        percentageInterval_male["XVI"] += dataShortHand.percentage;
                                        break;
                                    case 'XVII':
                                        percentageInterval_male["XVII"] += dataShortHand.percentage;
                                        break;
                                    case 'XVIII':
                                        percentageInterval_male["XVIII"] += dataShortHand.percentage;
                                        break;
                                    case 'XIX':
                                        percentageInterval_male["XIX"] += dataShortHand.percentage;
                                        break;
                                    case 'XX':
                                        percentageInterval_male["XX"] += dataShortHand.percentage;
                                        break;
                                    case 'XXI':
                                        percentageInterval_male["XXI"] += dataShortHand.percentage;
                                        break;

                                }
                            }
                            if(dataShortHand.sex == WOMAN && intervalShortHand == tmpAgeInterval) {
                                switch(d.code) {
                                    case 'I':
                                        percentageInterval_female["I"] += dataShortHand.percentage;
                                        break;
                                    case 'II':
                                        percentageInterval_female["II"] += dataShortHand.percentage;
                                        break;
                                    case 'III':
                                        percentageInterval_female["III"] += dataShortHand.percentage;
                                        break;
                                    case 'IV':
                                        percentageInterval_female["IV"] += dataShortHand.percentage;
                                        break;
                                    case 'V':
                                        percentageInterval_female["V"] += dataShortHand.percentage;
                                        break;
                                    case 'VI':
                                        percentageInterval_female["VI"] += dataShortHand.percentage;
                                        break;
                                    case 'VII':
                                        percentageInterval_female["VII"] += dataShortHand.percentage;
                                        break;
                                    case 'VIII':
                                        percentageInterval_female["VIII"] += dataShortHand.percentage;
                                        break;
                                    case 'IX':
                                        percentageInterval_female["IX"] += dataShortHand.percentage;
                                        break;
                                    case 'X':
                                        percentageInterval_female["X"] += dataShortHand.percentage;
                                        break;
                                    case 'XI':
                                        percentageInterval_female["XI"] += dataShortHand.percentage;
                                        break;
                                    case 'XII':
                                        percentageInterval_female["XII"] += dataShortHand.percentage;
                                        break;
                                    case 'XIII':
                                        percentageInterval_female["XIII"] += dataShortHand.percentage;
                                        break;
                                    case 'XIV':
                                        percentageInterval_female["XIV"] += dataShortHand.percentage;
                                        break;
                                    case 'XV':
                                        percentageInterval_female["XV"] += dataShortHand.percentage;
                                        break;
                                    case 'XVI':
                                        percentageInterval_female["XVI"] += dataShortHand.percentage;
                                        break;
                                    case 'XVII':
                                        percentageInterval_female["XVII"] += dataShortHand.percentage;
                                        break;
                                    case 'XVIII':
                                        percentageInterval_female["XVIII"] += dataShortHand.percentage;
                                        break;
                                    case 'XIX':
                                        percentageInterval_female["XIX"] += dataShortHand.percentage;
                                        break;
                                    case 'XX':
                                        percentageInterval_female["XX"] += dataShortHand.percentage;
                                        break;
                                    case 'XXI':
                                        percentageInterval_female["XXI"] += dataShortHand.percentage;
                                        break;
                                }
                            }
                        })
                    }

                    //endData.push(_this.normalizeData(percentageInterval_male));
                    //endData.push(_this.normalizeData(percentageInterval_female));

                });
            }

            console.log("NOOOOOOOO");
            console.log(endData);
            return endData;

        };

        _this.normalizeData = function(notNormalized) {
            var sum;
            sum = 0;
            //console.log("TESTERT");
            //console.log(notNormalized);
            _.each(notNormalized, function(d) {
                sum = sum + d;

            });
            // TODO figure out normalization
            _.each(notNormalized, function(d) {
                d = d/(sum/100);
            });

            //console.log(sum);
        }


        _this.initialize();

        return _this;
    }
    return ChaptersByYearConverter;
});
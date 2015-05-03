define([],
function(){
    function DatasetSorter(datasets)
    {
        var _this = {};

        _this.sortByIntervalsAscending = function() {
            var sets = [];
            var sorted = [];

            for (var i=0; i< datasets.length; i++)
                sets.push(datasets[i]);

            while(sets.length > 0)
            {
                var indexOfSmallest = 0;
                var smallest = sets[0].categorised_data.categories.interval[0].interval.from;
                for(i=0; i<sets.length; i++)
                    if(sets[i].categorised_data.categories.interval[0].interval.from <= smallest) {
                        smallest = sets[i].categorised_data.categories.interval[0].interval.from;
                        indexOfSmallest = i;
                    }

                var smallestDataSet = sets.splice(indexOfSmallest, 1)[0];
                sorted.push(smallestDataSet);
            }

            return sorted;
        };

        return _this;
    }

    return DatasetSorter;
});
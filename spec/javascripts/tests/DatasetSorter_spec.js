define(['helpers/converters/DatasetSorter'], function(DatasetSorter){
    describe('DatasetSorter', function (){
        var converter;
        var datasets = [{
                        "code": "A045",
                        "description": "Enteritis durch Campylobacter",
                        "year": 2013,

                        "categorised_data": {
                            "categories": {
                                "interval": [{
                                    "categories": {
                                        "percentile": [{
                                            "categories": {},
                                            "percentile": 5,
                                            "amount": 3.0
                                        }, {"categories": {}, "percentile": 10, "amount": 4.0}, {
                                            "categories": {},
                                            "percentile": 25,
                                            "amount": 5.0
                                        }, {"categories": {}, "percentile": 50, "amount": 7.0}, {
                                            "categories": {},
                                            "percentile": 75,
                                            "amount": 9.0
                                        }, {"categories": {}, "percentile": 90, "amount": 14.0}, {
                                            "categories": {},
                                            "percentile": 95,
                                            "amount": 18.0
                                        }]
                                    }, "interval": {"from": 70}, "n": 377, "dad": 8, "sa": 4, "min": 2, "max": 30
                                }]
                            }
                        }
                    }, {
                        "code": "A045",
                        "description": "Enteritis durch Campylobacter",
                        "year": 2013,
                        "icd_code_id": {"$oid": "5490074848e276ea1b793f79"},
                        "categorised_data": {
                            "categories": {
                                "interval": [{
                                    "categories": {
                                        "percentile": [{
                                            "categories": {},
                                            "percentile": 5,
                                            "amount": 3.0
                                        }, {"categories": {}, "percentile": 10, "amount": 3.0}, {
                                            "categories": {},
                                            "percentile": 25,
                                            "amount": 4.0
                                        }, {"categories": {}, "percentile": 50, "amount": 5.0}, {
                                            "categories": {},
                                            "percentile": 75,
                                            "amount": 6.0
                                        }, {"categories": {}, "percentile": 90, "amount": 8.0}, {
                                            "categories": {},
                                            "percentile": 95,
                                            "amount": 9.0
                                        }]
                                    },
                                    "interval": {"from": 40, "to": 69},
                                    "n": 415,
                                    "dad": 5,
                                    "sa": 2,
                                    "min": 1,
                                    "max": 19
                                }]
                            }
                        }
                    }, {
                        "code": "A045",
                        "description": "Enteritis durch Campylobacter",
                        "year": 2013,
                        "icd_code_id": {"$oid": "5490074848e276ea1b793f79"},
                        "categorised_data": {
                            "categories": {
                                "interval": [{
                                    "categories": {
                                        "percentile": [{
                                            "categories": {},
                                            "percentile": 5,
                                            "amount": 2.0
                                        }, {"categories": {}, "percentile": 10, "amount": 2.0}, {
                                            "categories": {},
                                            "percentile": 25,
                                            "amount": 2.0
                                        }, {"categories": {}, "percentile": 50, "amount": 3.0}, {
                                            "categories": {},
                                            "percentile": 75,
                                            "amount": 4.0
                                        }, {"categories": {}, "percentile": 90, "amount": 5.0}, {
                                            "categories": {},
                                            "percentile": 95,
                                            "amount": 5.0
                                        }]
                                    },
                                    "interval": {"from": 0, "to": 14},
                                    "n": 63,
                                    "dad": 3,
                                    "sa": 1,
                                    "min": 2,
                                    "max": 11
                                }]
                            }
                        }
                    }, {
                        "code": "A045",
                        "description": "Enteritis durch Campylobacter",
                        "year": 2013,
                        "icd_code_id": {"$oid": "5490074848e276ea1b793f79"},
                        "categorised_data": {
                            "categories": {
                                "interval": [{
                                    "categories": {
                                        "percentile": [{
                                            "categories": {},
                                            "percentile": 5,
                                            "amount": 2.0
                                        }, {"categories": {}, "percentile": 10, "amount": 2.0}, {
                                            "categories": {},
                                            "percentile": 25,
                                            "amount": 3.0
                                        }, {"categories": {}, "percentile": 50, "amount": 4.0}, {
                                            "categories": {},
                                            "percentile": 75,
                                            "amount": 5.0
                                        }, {"categories": {}, "percentile": 90, "amount": 6.0}, {
                                            "categories": {},
                                            "percentile": 95,
                                            "amount": 7.0
                                        }]
                                    },
                                    "interval": {"from": 15, "to": 39},
                                    "n": 322,
                                    "dad": 3,
                                    "sa": 1,
                                    "min": 2,
                                    "max": 11
                                }]
                            }
                        }
                    }];

        beforeEach(function(){

        });

	it("should be able to know that 1 = 1", function (){
            var converter = new DatasetSorter(datasets);

            var expectedResult = 1;

            expect(1).toEqual(expectedResult);
        });

	
    });
});
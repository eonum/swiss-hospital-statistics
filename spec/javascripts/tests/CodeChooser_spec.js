define(['helpers/CodeChooser'], function(CodeChooser){
    describe('CodeChooser', function (){
        var timeoutTime = 1000;

        var testdata = {
            firstprop: "firstvalue",
            secondprop: "secondvalue",
            thirdprop: "thirdvalue"};

        var ICD_A041 = [{
            "code": "A041",
            "description": "Darminfektion durch enterotoxinbildende Escherichia coli",
            "year": 2013,
            "icd_code_id": {
                "$oid": "5490074848e276ea1b793f75"
            },
            "categorised_data": {
                "categories": {
                    "interval": [{
                        "categories": {
                            "percentile": [{
                                "categories": {},
                                "percentile": 5,
                                "amount": 8.0
                            }, {
                                "categories": {},
                                "percentile": 10,
                                "amount": 8.0
                            }, {
                                "categories": {},
                                "percentile": 25,
                                "amount": 8.0
                            }, {
                                "categories": {},
                                "percentile": 50,
                                "amount": 17.5
                            }, {
                                "categories": {},
                                "percentile": 75,
                                "amount": 27.0
                            }, {
                                "categories": {},
                                "percentile": 90,
                                "amount": 27.0
                            }, {
                                "categories": {},
                                "percentile": 95,
                                "amount": 27.0
                            }]
                        },
                        "interval": {
                            "from": 40,
                            "to": 69
                        },
                        "n": 2,
                        "dad": 17,
                        "sa": 13,
                        "min": 8,
                        "max": 27
                    }]
                }
            }
        }];

        var CHOP_0003 = [{
            "code": "0003",
            "description": "Therapeutischer Ultraschall von peripheren Blutgefässen",
            "year": 2013,
            "chop_code_id": {"$oid": "5490074d48e276ea1b79a3a1"},
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
                            }, {"categories": {}, "percentile": 50, "amount": 2.0}, {
                                "categories": {},
                                "percentile": 75,
                                "amount": 2.0
                            }, {"categories": {}, "percentile": 90, "amount": 2.0}, {
                                "categories": {},
                                "percentile": 95,
                                "amount": 2.0
                            }]
                        }, "interval": {"from": 70}, "n": 1, "dad": 2, "sa": 0, "min": 2, "max": 2
                    }]
                }
            }
        }];

        var DRG_962Z = [
            {
                "code": "962Z",
                "description": "Unzulässige geburtshilfliche Diagnosekombination",
                "year": 2013,
                "drg_id": {
                    "$oid": "54e5d7cc48e2b8495c4b39d5"
                },
                "categorised_data": {
                    "categories": {
                        "interval": [
                            {
                                "categories": {
                                    "percentile": [
                                        {
                                            "categories": {},
                                            "percentile": 5,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 10,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 25,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 50,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 75,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 90,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 95,
                                            "amount": 4
                                        }
                                    ]
                                },
                                "interval": {
                                    "from": 15,
                                    "to": 39
                                },
                                "n": 1,
                                "dad": 4,
                                "sa": 0,
                                "min": 4,
                                "max": 4
                            }
                        ]
                    }
                }
            },
            {
                "code": "962Z",
                "description": "Unzulässige geburtshilfliche Diagnosekombination",
                "year": 2013,
                "drg_id": {
                    "$oid": "54e5d7cc48e2b8495c4b39d5"
                },
                "categorised_data": {
                    "categories": {
                        "interval": [
                            {
                                "categories": {
                                    "percentile": [
                                        {
                                            "categories": {},
                                            "percentile": 5,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 10,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 25,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 50,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 75,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 90,
                                            "amount": 4
                                        },
                                        {
                                            "categories": {},
                                            "percentile": 95,
                                            "amount": 4
                                        }
                                    ]
                                },
                                "interval": {
                                    "from": 15,
                                    "to": 39
                                },
                                "n": 1,
                                "dad": 4,
                                "sa": 0,
                                "min": 4,
                                "max": 4
                            }
                        ]
                    }
                }
            }
        ];

        var emptyArray = [];

        var emptyObject = {};

        beforeEach(function(){
        });

        it("should be able to return the first value (object has one or more properties)", function (){
            var chooser = new CodeChooser(testdata);
            var firstProp = chooser.getFirstProperty(testdata);

            var expectedResult = "firstvalue";

            expect(firstProp).toEqual(expectedResult);
        });

        it("should be able to handle empty objects", function (){
            var chooser = new CodeChooser(testdata);
            var firstProp = chooser.getFirstProperty(emptyObject);

            var expectedResult = undefined;

            expect(firstProp).toEqual(expectedResult);
        });

        //tests the api call (ICD, valid)
        it("should return correct JSON string upon valid API call [ICD]", function() {
            var expectedJSON = ICD_A041;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("icd", "A041", function(code, data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, timeoutTime / 2);
            });

            waitsFor(function() {
                return flag;
            }, "The Value should be incremented", timeoutTime);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });

        //tests the api call (CHOP, valid)
        it("should return correct JSON string upon valid API call [CHOP]", function() {
            var expectedJSON = CHOP_0003;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("chop", "0003", function(code, data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, timeoutTime / 2);
            });

            waitsFor(function() {
                return flag;
            }, "The Value should be incremented", timeoutTime);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });

        //tests the api call (DRG, valid)
        it("should return correct JSON string upon valid API call [DRG]", function() {
            var expectedJSON = DRG_962Z;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("drg", "962Z", function(code, data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, timeoutTime / 2);
            });

            waitsFor(function() {
                return flag;
            }, "The Value should be incremented", timeoutTime);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });

        //tests the api call (AGE, valid)
        /*it("should return correct JSON string upon valid API call [AGE]", function() {
            var expectedJSON = AGE_010;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("age", "010", function(data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, 100);
            });

            waitsFor(function() {
                return flag;
            }, "The Value should be incremented", 200);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });*/

        //tests the api call (ICD, invalid)
        it("should return empty array upon invalid API call [ICD]", function() {
            var expectedJSON = emptyArray;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("icd", "A1000", function(code, data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, timeoutTime / 2);
            });

            waitsFor(function() {
                return flag;
            }, "Wait longer for the function", timeoutTime);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });

        //tests the api call (CHOP, invalid)
        it("should return empty array upon invalid API call [CHOP]", function() {
            var expectedJSON = emptyArray;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("chop", "A1000", function(code, data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, timeoutTime / 2);
            });

            waitsFor(function() {
                return flag;
            }, "Wait longer for the function", timeoutTime);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });

        //tests the api call (DRG, invalid)
        it("should return empty array upon invalid API call [DRG]", function() {
            var expectedJSON = emptyArray;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("drg", "A1000", function(code, data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, timeoutTime / 2);
            });

            waitsFor(function() {
                return flag;
            }, "Wait longer for the function", timeoutTime);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });
    });
});
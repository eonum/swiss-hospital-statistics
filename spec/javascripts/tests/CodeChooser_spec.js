define(['helpers/CodeChooser'], function(CodeChooser){
    describe('CodeChooser', function (){

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

        var CHOP_001200 = [
                        {
                            "code":"001200",
                            "description":"Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden",
                            "year":2013,
                            "chop_code_id":{
                                "$oid":"5490074d48e276ea1b79a3a6"
                            },
                            "categorised_data":{
                                "categories":{
                                    "interval":[
                                        {
                                            "categories":{
                                                "percentile":[
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":5,
                                                        "amount":14.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":10,
                                                        "amount":14.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":25,
                                                        "amount":14.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":50,
                                                        "amount":14.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":75,
                                                        "amount":14.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":90,
                                                        "amount":14.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":95,
                                                        "amount":14.0
                                                    }
                                                ]
                                            },
                                            "interval":{
                                                "from":0,
                                                "to":14
                                            },
                                            "n":1,
                                            "dad":14,
                                            "sa":0,
                                            "min":14,
                                            "max":14
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "code":"001200",
                            "description":"Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden",
                            "year":2013,
                            "chop_code_id":{
                                "$oid":"5490074d48e276ea1b79a3a6"
                            },
                            "categorised_data":{
                                "categories":{
                                    "interval":[
                                        {
                                            "categories":{
                                                "percentile":[
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":5,
                                                        "amount":13.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":10,
                                                        "amount":13.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":25,
                                                        "amount":13.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":50,
                                                        "amount":13.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":75,
                                                        "amount":13.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":90,
                                                        "amount":13.0
                                                    },
                                                    {
                                                        "categories":{

                                                        },
                                                        "percentile":95,
                                                        "amount":13.0
                                                    }
                                                ]
                                            },
                                            "interval":{
                                                "from":15,
                                                "to":39
                                            },
                                            "n":1,
                                            "dad":13,
                                            "sa":0,
                                            "min":13,
                                            "max":13
                                        }
                                    ]
                                }
                            }
                        }
                    ];

        var DRG_901A = [
            {
                "code":"901A",
                "description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie",
                "year":2013,
                "drg_id":{
                    "$oid":"54e5d7cc48e2b8495c4b39ce"
                },
                "categorised_data":{
                    "categories":{
                        "interval":[
                            {
                                "categories":{
                                    "percentile":[
                                        {
                                            "categories":{

                                            },
                                            "percentile":5,
                                            "amount":38.35
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":10,
                                            "amount":39.7
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":25,
                                            "amount":43.75
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":50,
                                            "amount":50.5
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":75,
                                            "amount":57.25
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":90,
                                            "amount":61.3
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":95,
                                            "amount":62.65
                                        }
                                    ]
                                },
                                "interval":{
                                    "from":0,
                                    "to":14
                                },
                                "n":2,
                                "dad":50,
                                "sa":19,
                                "min":37,
                                "max":64
                            }
                        ]
                    }
                }
            },
            {
                "code":"901A",
                "description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie",
                "year":2013,
                "drg_id":{
                    "$oid":"54e5d7cc48e2b8495c4b39ce"
                },
                "categorised_data":{
                    "categories":{
                        "interval":[
                            {
                                "categories":{
                                    "percentile":[
                                        {
                                            "categories":{

                                            },
                                            "percentile":5,
                                            "amount":2.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":10,
                                            "amount":4.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":25,
                                            "amount":10.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":50,
                                            "amount":19.5
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":75,
                                            "amount":26.25
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":90,
                                            "amount":47.5
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":95,
                                            "amount":61.5
                                        }
                                    ]
                                },
                                "interval":{
                                    "from":40,
                                    "to":69
                                },
                                "n":26,
                                "dad":22,
                                "sa":18,
                                "min":2,
                                "max":73
                            }
                        ]
                    }
                }
            },
            {
                "code":"901A",
                "description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie",
                "year":2013,
                "drg_id":{
                    "$oid":"54e5d7cc48e2b8495c4b39ce"
                },
                "categorised_data":{
                    "categories":{
                        "interval":[
                            {
                                "categories":{
                                    "percentile":[
                                        {
                                            "categories":{

                                            },
                                            "percentile":5,
                                            "amount":2.9
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":10,
                                            "amount":3.8
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":25,
                                            "amount":4.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":50,
                                            "amount":9.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":75,
                                            "amount":13.25
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":90,
                                            "amount":24.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":95,
                                            "amount":28.5
                                        }
                                    ]
                                },
                                "interval":{
                                    "from":15,
                                    "to":39
                                },
                                "n":10,
                                "dad":11,
                                "sa":9,
                                "min":2,
                                "max":33
                            }
                        ]
                    }
                }
            },
            {
                "code":"901A",
                "description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie",
                "year":2013,
                "drg_id":{
                    "$oid":"54e5d7cc48e2b8495c4b39ce"
                },
                "categorised_data":{
                    "categories":{
                        "interval":[
                            {
                                "categories":{
                                    "percentile":[
                                        {
                                            "categories":{

                                            },
                                            "percentile":5,
                                            "amount":5.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":10,
                                            "amount":5.4
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":25,
                                            "amount":12.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":50,
                                            "amount":24.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":75,
                                            "amount":35.5
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":90,
                                            "amount":44.8
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":95,
                                            "amount":48.6
                                        }
                                    ]
                                },
                                "interval":{
                                    "from":70
                                },
                                "n":23,
                                "dad":25,
                                "sa":18,
                                "min":4,
                                "max":85
                            }
                        ]
                    }
                }
            },
            {
                "code":"901A",
                "description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie",
                "year":2013,
                "drg_id":{
                    "$oid":"54e5d7cc48e2b8495c4b39ce"
                },
                "categorised_data":{
                    "categories":{
                        "interval":[
                            {
                                "categories":{
                                    "percentile":[
                                        {
                                            "categories":{

                                            },
                                            "percentile":5,
                                            "amount":38.35
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":10,
                                            "amount":39.7
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":25,
                                            "amount":43.75
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":50,
                                            "amount":50.5
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":75,
                                            "amount":57.25
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":90,
                                            "amount":61.3
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":95,
                                            "amount":62.65
                                        }
                                    ]
                                },
                                "interval":{
                                    "from":0,
                                    "to":14
                                },
                                "n":2,
                                "dad":50,
                                "sa":19,
                                "min":37,
                                "max":64
                            }
                        ]
                    }
                }
            },
            {
                "code":"901A",
                "description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie",
                "year":2013,
                "drg_id":{
                    "$oid":"54e5d7cc48e2b8495c4b39ce"
                },
                "categorised_data":{
                    "categories":{
                        "interval":[
                            {
                                "categories":{
                                    "percentile":[
                                        {
                                            "categories":{

                                            },
                                            "percentile":5,
                                            "amount":2.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":10,
                                            "amount":4.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":25,
                                            "amount":10.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":50,
                                            "amount":19.5
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":75,
                                            "amount":26.25
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":90,
                                            "amount":47.5
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":95,
                                            "amount":61.5
                                        }
                                    ]
                                },
                                "interval":{
                                    "from":40,
                                    "to":69
                                },
                                "n":26,
                                "dad":22,
                                "sa":18,
                                "min":2,
                                "max":73
                            }
                        ]
                    }
                }
            },
            {
                "code":"901A",
                "description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie",
                "year":2013,
                "drg_id":{
                    "$oid":"54e5d7cc48e2b8495c4b39ce"
                },
                "categorised_data":{
                    "categories":{
                        "interval":[
                            {
                                "categories":{
                                    "percentile":[
                                        {
                                            "categories":{

                                            },
                                            "percentile":5,
                                            "amount":2.9
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":10,
                                            "amount":3.8
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":25,
                                            "amount":4.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":50,
                                            "amount":9.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":75,
                                            "amount":13.25
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":90,
                                            "amount":24.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":95,
                                            "amount":28.5
                                        }
                                    ]
                                },
                                "interval":{
                                    "from":15,
                                    "to":39
                                },
                                "n":10,
                                "dad":11,
                                "sa":9,
                                "min":2,
                                "max":33
                            }
                        ]
                    }
                }
            },
            {
                "code":"901A",
                "description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie",
                "year":2013,
                "drg_id":{
                    "$oid":"54e5d7cc48e2b8495c4b39ce"
                },
                "categorised_data":{
                    "categories":{
                        "interval":[
                            {
                                "categories":{
                                    "percentile":[
                                        {
                                            "categories":{

                                            },
                                            "percentile":5,
                                            "amount":5.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":10,
                                            "amount":5.4
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":25,
                                            "amount":12.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":50,
                                            "amount":24.0
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":75,
                                            "amount":35.5
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":90,
                                            "amount":44.8
                                        },
                                        {
                                            "categories":{

                                            },
                                            "percentile":95,
                                            "amount":48.6
                                        }
                                    ]
                                },
                                "interval":{
                                    "from":70
                                },
                                "n":23,
                                "dad":25,
                                "sa":18,
                                "min":4,
                                "max":85
                            }
                        ]
                    }
                }
            }
        ];

        var AGE_010 = {
            "codes": {
                "age": {
                    "code": "010",
                    "description": "Brucellose",
                    "years": [{
                        "categories": [{
                            "sex": [{
                                "categories": [{
                                    "valueInterval": [{
                                        "interval": {
                                            "from": 20,
                                            "to": 24
                                        },
                                        "n": 1
                                    }, {
                                        "interval": {
                                            "from": 30,
                                            "to": 34
                                        },
                                        "n": 1
                                    }, {
                                        "interval": {
                                            "from": 35,
                                            "to": 39
                                        },
                                        "n": 1
                                    }]
                                }],
                                "sex": "f"
                            }, {
                                "categories": [{
                                    "valueInterval": [{
                                        "interval": {
                                            "from": 25,
                                            "to": 29
                                        },
                                        "n": 2
                                    }, {
                                        "interval": {
                                            "from": 80,
                                            "to": 84
                                        },
                                        "n": 1
                                    }]
                                }],
                                "sex": "m"
                            }]
                        }],
                        "year": "2013"
                    }]
                }
            }
        };

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
                chooser.fetchDatasets("icd", "A041", function(data) {
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
        });

        //tests the api call (CHOP, valid)
        it("should return correct JSON string upon valid API call [CHOP]", function() {
            var expectedJSON = CHOP_001200;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("chop", "001200", function(data) {
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
        });

        //tests the api call (DRG, valid)
        it("should return correct JSON string upon valid API call [DRG]", function() {
            var expectedJSON = DRG_901A;
            var actualJSON;
            var flag = false;

            runs(function() {
                flag = false;
                var chooser = new CodeChooser();
                chooser.fetchDatasets("drg", "901A", function(data) {
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
                chooser.fetchDatasets("icd", "A1000", function(data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, 100);
            });

            waitsFor(function() {
                return flag;
            }, "Wait longer for the function", 200);

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
                chooser.fetchDatasets("chop", "A1000", function(data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, 100);
            });

            waitsFor(function() {
                return flag;
            }, "Wait longer for the function", 200);

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
                chooser.fetchDatasets("drg", "A1000", function(data) {
                    actualJSON = data;
                });

                setTimeout(function() {
                    flag = true;
                }, 100);
            });

            waitsFor(function() {
                return flag;
            }, "Wait longer for the function", 200);

            runs(function() {
                expect(actualJSON).toEqual(expectedJSON);
            });
        });
    });
});
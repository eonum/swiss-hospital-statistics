define([], function(){
    return {
        tab_icd: 'ICD',
        tab_icd_per_year: {
            de: 'ICD pro Jahr',
            it: "ICD all'anno",
            fr: 'ICD par an',
            en: 'ICD per year'
        },
        tab_chop: 'CHOP',
        tab_drg: 'DRG',
        tab_top_3: {
            de: 'Top Diagnosen',
            it: 'Top diagnosi',
            fr: 'Top diagnostics',
            en: 'Top diagnoses'
        },
        search_button: {
            de: 'Suchen',
            it: 'Cercare',
            fr: 'Rechercher',
            en: 'Search'
        },
        search_placeholder: {
            de: 'Nach Code oder Beschreibung suchen',
            fr: 'Recherche pour code ou description',
            it: 'Cerca per codice o descrizione',
            en: 'Search for code or description'
        },
        compare: {
            de: 'vergleichen',
            fr: 'comparer',
            it: 'compare',
            en: 'compare'
        },
        compare_hint: {
            de: 'Diagnosen direkt vergleichen: <kbd>vergleichen</kbd> rechts neben der Diagnose klicken',
            fr: 'Comparer des diagnoses directement: Cliquer <kbd>comparer</kbd> à la droite de la diagnose',
            it: 'Confronta diagnosi: selezionare <kbd>compare</kbd> sul lato destro',
            en: 'To compare diagnoses, click <kbd>compare</kbd> to the right of the diagnosis'
        },
        navigation_hint: {
            de: 'Um durch Codes zu navigieren können Sie <kbd>Pfeil nach oben</kbd> und <kbd>Pfeil nach unten</kbd> drücken.<br>' +
                'Diagnosen direkt vergleichen: <kbd>vergleichen</kbd> rechts neben der Diagnose klicken',
            fr: 'Pour naviguer à travers les codes que vous pouvez utiliser <kbd>Flèche haut</kbd> et <kbd>Flèche bas</kbd>.<br>' +
                'Comparer des diagnoses directement: Cliquer <kbd>comparer</kbd> à la droite de la diagnose',
            it: 'Per navigare attraverso codici è possibile utilizzare <kbd>Freccia Su</kbd> e <kbd>Freccia Giù</kbd>.<br>' +
                'Confronta diagnosi: selezionare <kbd>compare</kbd> sul lato destro',
            en: 'To navigate through codes you can use <kbd>Arrow Up</kbd> and <kbd>Arrow Down</kbd>.<br>' +
                'To compare diagnoses, click <kbd>compare</kbd> to the right of the diagnosis.'
        },
        all_chapters: {
            de: 'Alle Kapitel',
            fr: 'Tous les chapitres',
            it: 'Tutti i capitoli',
            en: 'All chapters'
        },
        all_groups: {
            de: 'Alle Gruppen',
            fr: 'Tous les groupes',
            it: 'Tutti i gruppi',
            en: 'All groups'
        },
        all_nonterminals: {
            de: 'Alle Nonterminals',
            fr: 'Tous les non-terminaux',
            it: 'Tutti i non-terminali',
            en: 'All nonterminals'
        },
        all_terminals: {
            de: 'Alle Terminals',
            fr: 'Tous les terminaux',
            it: 'Tutti i terminali',
            en: 'All nonterminals'
        },
        chapter: {
            de: 'Kapitel',
            fr: 'Chapitre',
            it: 'Capitolo',
            en: 'Chapter'
        },
        group: {
            de: 'Gruppe',
            fr: 'Groupe',
            it: 'Gruppo',
            en: 'Group'
        },
        nonterminal: {
            de: 'Nonterminal',
            fr: 'Nonterminal',
            it: 'Non terminale',
            en: 'Nonterminal'
        },
        terminal: {
            de: 'Terminal',
            fr: 'Terminal',
            it: 'Terminale',
            en: 'Terminal'
        },
        box_plot: {
            higher_whiskers: {
                de: 'is higher whisker [de]',
                fr: 'is higher whisker [fr]',
                it: 'is higher whisker [it]',
                en: 'is higher whisker [en]'
            },
            lower_whiskers: {
                de: 'is lower whisker [de]',
                fr: 'is lower whisker [fr]',
                it: 'is lower whisker [it]',
                en: 'is lower whisker [en]'
            },
            higher_quartile: {
                de: 'is higher quartile [de]',
                fr: 'is higher quartile [fr]',
                it: 'is higher quartile [it]',
                en: 'is higher quartile [en]'
            },
            lower_quartile: {
                de: 'is lower quartile [de]',
                fr: 'is lower quartile [fr]',
                it: 'is lower quartile [it]',
                en: 'is lower quartile [en]'
            },
            average: {
                de: 'is average value [de]',
                fr: 'is average value [fr]',
                it: 'is average value [it]',
                en: 'is average value [en]'
            }
        },
        charts: {
            bar: {
                name: {
                    de: 'Diagnosen: Anzahl Fälle nach Alterskategorie',
                    fr: "Diagnoses: Nombre des cas par catégorie d'âge",
                    it: 'Diagnosi: Numero di casi per categoria di età',
                    en: 'Diagnoses: Number of cases by age category'
                },
                axises: {
                    y: {
                        de: 'Anzahl Fälle',
                        fr: 'Nombre des cas',
                        it: 'Numero di casi',
                        en: 'Number of cases'
                    },
                    x: {
                        de: 'Alterskategorie',
                        fr: "Catégorie d'âge",
                        it: 'Categoria di età',
                        en: 'Age category'
                    }
                }
            },
            ordinal: {
                name: {
                    de: 'Diagnosen: Anzahl Fälle nach Alterskategorie',
                    fr: "Diagnoses: Nombre des cas par catégorie d'âge",
                    it: 'Diagnosi: Numero di casi per categoria di età',
                    en: 'Diagnoses: Number of cases by age category'
                },
                axises: {
                    y: {
                        de: 'Anzahl Fälle',
                        fr: 'Nombre des cas',
                        it: 'Numero di casi',
                        en: 'Number of cases'
                    },
                    x: {
                        de: 'Alterskategorie',
                        fr: "Catégorie d'âge",
                        it: 'Categoria di età',
                        en: 'Age category'
                    }
                }
            },
            pie: {
                name: {
                    de: 'Diagnosen: Anzahl Fälle nach Alterskategorie',
                    fr: "Diagnoses: Nombre des cas par catégorie d'âge",
                    it: 'Diagnosi: Numero di casi per categoria di età',
                    en: 'Diagnoses: Number of cases by age category'
                }
            },
            box: {
                name: {
                    de: 'Statistiken zur Aufenthaltsdauer',
                    fr: "Statistiques sur la durée du séjour",
                    it: 'Le statistiche per la durata del soggiorno',
                    en: 'Statistics for length of stay'
                },
                axises: {
                    y: {
                        de: 'Aufenthaltsdauer (in Tagen)',
                        fr: 'Durée du séjour (en jours)',
                        it: 'Durata del soggiorno (in giorni)',
                        en: 'Length of stay (in days)'
                    },
                    x: {
                        de: 'Alterskategorie',
                        fr: "Catégorie d'âge",
                        it: 'Categoria di età',
                        en: 'Age category'
                    }
                }
            }
        }
    }
});
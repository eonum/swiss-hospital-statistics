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
        all_mdcs: {
            de: 'Alle MDCs',
            fr: 'Tous les MDCs',
            it: 'Tutti i MDC',
            en: 'All MDCs'
        },
        all_base_drg: {
            de: 'Alle Basis-DRGs',
            fr: 'Tous les DRGs de base',
            it: 'Tutti i DRG di base',
            en: 'All base DRGs'
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
        mdc: {
            de: 'MDC',
            fr: 'MDC',
            it: 'MDC',
            en: 'MDC'
        },
        base_drg: {
            de: 'Basis-DRG',
            fr: 'DRG de base',
            it: 'DRG di base',
            en: 'Base DRG'
        },

        no_data: {
            de: 'Keine Daten verfügbar',
            fr: 'Aucune donnée disponible',
            it: 'Dati non disponibili',
            en: 'No data available'
        },

        box_plot: {
            higher_whiskers: {
                de: 'oberer Whisker: 90%-Quantil',
                fr: 'Moustache supérieur: 0.9-quantile',
                it: 'Baffo superiore: 0.9-quantili',
                en: 'upper whisker: 90th percentile'
            },
            lower_whiskers: {
                de: 'unterer Whisker: 10%-Quantil',
                fr: 'Moustache inférieure: 0.1-quantile',
                it: 'Baffo inferiore: 0.1-quantili',
                en: 'lower whisker: 10th percentile'
            },
            higher_quartile: {
                de: 'oberes Quartil (Q3)',
                fr: '3e quartile (Q3)',
                it: 'Quartile superiore (Q3)',
                en: 'upper quartile (Q3)'
            },
            lower_quartile: {
                de: 'unteres Quartil (Q1)',
                fr: '1er quartile (Q1)',
                it: 'Quartile inferiore (Q1)',
                en: 'lower quartile (Q1)'
            },
            average: {
                de: 'Durchschnitt',
                fr: 'Moyenne',
                it: 'Medio',
                en: 'Average'
            }
        },

        men: {
            de: 'Männer',
            fr: 'Hommes',
            it: 'Uomini',
            en: 'Men'
        },

        women: {
            de: 'Frauen',
            fr: 'Femmes',
            it: 'Donne',
            en: 'Women'
        },

        total: {
            de: 'Total',
            fr: 'Total',
            it: 'Totale',
            en: 'Total'
        },

        hospital_types: {

            general_centralised: {
                de: 'Allgemeine Krankenhäuser, Zentrumsversorgung',
                fr: 'Hôpitaux de soins généraux, prise en charge centralisée',
                it: 'Ospedali generali, assistenza centralizzato',
                en: 'General hospitals, centralised care'
            },

            general_basic: {
                de: 'Allgemeine Krankenhäuser, Grundversorgung',
                fr: 'Hôpitaux de soins généraux, soins de base',
                it: 'Ospedali generali, assistenza base',
                en: 'General hospitals, basic care'
            },

            psychiatric_clinics: {
                de: 'Spezialkliniken: Psychiatrische Kliniken',
                fr: 'Cliniques spécialisées: cliniques psychiatriques',
                it: 'Cliniche speciali: ospedali psichiatrichi',
                en: 'Special clincis: psychiatric clinics'
            },

            rehabilitation_clinic: {
                de: 'Spezialkliniken: Rehabilitationskliniken',
                fr: 'Cliniques spécialisées: cliniques de réadaptation',
                it: 'Cliniche speciali: ospedali di riabilitazione',
                en: 'Special clinics: rehabilitation clinics'
            },

            other_special_clinics: {
                de: 'Spezialkliniken: Andere Spezialkliniken',
                fr: 'Cliniques spécialisées: autres cliniques spécialisées',
                it: 'Cliniche speciali: altri',
                en: 'Special clinics: Other'
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
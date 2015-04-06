require 'datasets/icd_chapter_age_sex_dataset'
require 'codes/icd_chapter'
# clear out old data
HospitalType.delete_all
IcdChapter.delete_all

# seed the hospital types
HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Zentrumsversorgung', :text_fr => 'Hôpitaux de soins généraux, prise en charge centralisée')
HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Grundversorgung', :text_fr => 'Hôpitaux de soins généraux, soins de base')
HospitalType.create(:text_de => 'Spezialkliniken: Psychiatrische Kliniken', :text_fr => 'Cliniques spécialisées: cliniques psychiatriques')
HospitalType.create(:text_de => 'Spezialkliniken: Rehabilitationskliniken', :text_fr => 'Cliniques spécialisées: cliniques de réadaptation')
HospitalType.create(:text_de => 'Spezialkliniken: Andere Spezialkliniken', :text_fr => 'Cliniques spécialisées: autres cliniques spécialisées')


IcdChapter.create(roman_number: "I", number:1,
                  text_de: "Bestimmte infektiöse und parasitäre Krankheiten",
                  text_fr: "Certaines maladies infectieuses et parasitaires",
                  text_it: "Alcune malattie infettive e parassitarie")
IcdChapter.create(roman_number: "II", number:2,
                  text_de: "Neubildungen",
                  text_fr: "Tumeurs",
                  text_it: "Tumori")
IcdChapter.create(roman_number: "III", number:3,
                  text_de: "Krankheiten des Blutes und der blutbildenden Organe sowie bestimmte Störungen mit Beteiligung des Immunsystems",
                  text_fr: "Maladies du sang et des organes hématopoïétiques et certains troubles du système immunitaire",
                  text_it: "Malattie del sangue e degli organi ematopoietici ed alcuni disturbi del sistema immunitario")
IcdChapter.create(roman_number: "IV", number:4, text_de: "Endokrine, Ernährungs- und Stoffwechselkrankheiten",
                  text_fr: "Maladies endocriniennes, nutritionnelles et métaboliques",
                  text_it: "Malattie endocrine, nutrizionali e metaboliche")
IcdChapter.create(roman_number: "V", number:5,
                  text_de: "Psychische und Verhaltensstörungen",
                  text_fr: "Troubles mentaux et du comportement",
                  text_it: "Disturbi psichici e comportamentali")
IcdChapter.create(roman_number: "VI", number:6,
                  text_de: "Krankheiten des Nervensystems",
                  text_fr: "Maladies du système nerveux",
                  text_it: "Malattie del sistema nervoso")
IcdChapter.create(roman_number: "VII", number:7,
                  text_de: "Krankheiten des Auges und der Augenanhangsgebilde", text_fr: "Maladies de l'œil et de ses annexes",
                  text_it: "Malattie dell'occhio e degli annessi oculari")
IcdChapter.create(roman_number: "VIII", number:8,
                  text_de: "Krankheiten des Ohres und des Warzenfortsatzes",
                  text_fr: "Maladies de l'oreille et de l'apophyse mastoïde",
                  text_it: "Malattie dell'orecchio e dell'apofisi mastoide")
IcdChapter.create(roman_number: "IX", number:9,
                  text_de: "Krankheiten des Kreislaufsystems",
                  text_fr: "Maladies de l'appareil circulatoire",
                  text_it: "Malattie del sistema circolatori")
IcdChapter.create(roman_number: "X", number:10,
                  text_de: "Krankheiten des Atmungssystems",
                  text_fr: "Maladies de l'appareil respiratoire",
                  text_it: "Malattie del sistema circolatori")
IcdChapter.create(roman_number: "XI", number:11,
                  text_de: "Krankheiten des Verdauungssystems",
                  text_fr: "Maladies de l'appareil digestif",
                  text_it: "Malattie dell'apparato digerente")
IcdChapter.create(roman_number: "XII", number:12,
                  text_de: "Krankheiten der Haut und der Unterhaut",
                  text_fr: "Maladies de l'appareil digestif",
                  text_it: "Malattie della cute e del tessuto sottocutaneo")
IcdChapter.create(roman_number: "XIII", number:13,
                  text_de: "Krankheiten des Muskel-Skelett-Systems und des Bindegewebes",
                  text_fr: "Maladies du système ostéo-articulaire, des muscles et du tissu conjonctif",
                  text_it: "Malattie del sistema osteomuscolare e del tessuto connettivo")
IcdChapter.create(roman_number: "XIV", number:14,
                  text_de: "Krankheiten des Urogenitalsystems",
                  text_fr: "Maladies de l'appareil génito-urinaire",
                  text_it: "Malattie dell'apparato genitourinario")
IcdChapter.create(roman_number: "XV", number:15,
                  text_de: "Schwangerschaft, Geburt und Wochenbett",
                  text_fr: "Grossesse, accouchement et puerpéralité",
                  text_it: "Gravidanza, parto e puerperio")
IcdChapter.create(roman_number: "XVI", number:16,
                  text_de: "Bestimmte Zustände, die ihren Ursprung in der Perinatalperiode haben",
                  text_fr: "Certaines affections dont l'origine se situe dans la période périnatale",
                  text_it: "Alcune condizioni morbose che hanno origine nel periodo perinatale")
IcdChapter.create(roman_number: "XVII", number:17,
                  text_de: "Angeborene Fehlbildungen, Deformitäten und Chromosomenanomalien",
                  text_fr: "Malformations congénitales et anomalies chromosomiques",
                  text_it: "Malformazioni e deformazioni congenite, anomalie cromosomiche")
IcdChapter.create(roman_number: "XVIII", number:18,
                  text_de: "Symptome und abnorme klinische und Laborbefunde, die anderenorts nicht klassifiziert sind",
                  text_fr: "Symptômes, signes et résultats anormaux d'examens cliniques et de laboratoire, non classés ailleurs",
                  text_it: "Sintomi, segni e risultati anormali di esami clinici e di laboratorio, non classificati altrove")
IcdChapter.create(roman_number: "XIX", number:19,
                  text_de: "Verletzungen, Vergiftungen und bestimmte andere Folgen äußerer Ursachen",
                  text_fr: "Lésions traumatiques, empoisonnements et certaines autres conséquences de causes externes",
                  text_it: "Traumatismi, avvelenamenti ed alcune altre conseguenze di cause esterne")
IcdChapter.create(roman_number: "XX", number:20,
                  text_de: "Äußere Ursachen von Morbidität und Mortalität",
                  text_fr: "Causes externes de morbidité et de mortalité",
                  text_it: "Cause esterne di morbosità e mortalità")
IcdChapter.create(roman_number: "XXI", number:21,
                  text_de: "Faktoren, die den Gesundheitszustand beeinflussen und zur Inanspruchnahme des Gesundheitswesens führen",
                  text_fr: "Facteurs influant sur l'état de santé et motifs de recours aux services de santé",
                  text_it: "Fattori influenzanti lo stato di salute e il ricorso ai servizi sanitari")
IcdChapter.create(roman_number: "XXII", number:22,
                  text_de: "Schlüsselnummern für besondere Zwecke",
                  text_fr: "Codes d'utilisation particulière",
                  text_it: "Codici per scopi speciali")


require 'datasets/icd_chapter_age_sex_dataset'
require 'codes/icd_chapter'
require 'codes/icd_chapter_group'

# clear out old data
HospitalType.delete_all
IcdChapter.delete_all
IcdChapterGroup.delete_all

# seed the hospital types
HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Zentrumsversorgung', :text_fr => 'Hôpitaux de soins généraux, prise en charge centralisée')
HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Grundversorgung', :text_fr => 'Hôpitaux de soins généraux, soins de base')
HospitalType.create(:text_de => 'Spezialkliniken: Psychiatrische Kliniken', :text_fr => 'Cliniques spécialisées: cliniques psychiatriques')
HospitalType.create(:text_de => 'Spezialkliniken: Rehabilitationskliniken', :text_fr => 'Cliniques spécialisées: cliniques de réadaptation')
HospitalType.create(:text_de => 'Spezialkliniken: Andere Spezialkliniken', :text_fr => 'Cliniques spécialisées: autres cliniques spécialisées')

def select_group (group, start, finish)
  arr = group.code.split(/-/)
  from = arr[0]
  to = arr[1]
  from >= start && to <= finish
end

def init_chapter(chapter)
  arr = chapter.nonterminals.split(/-/)
  from = arr[0]
  to = arr[1]
  groups = IcdGroup.all
               .select {|group| select_group(group, from, to) }
               .sort! { |x,y| x.code <=> y.code }
               .map {|group| IcdChapterGroup.create(code: group.code, text_de: group.text_de, text_fr: group.text_fr, text_it: group.text_it, icd_chapter: chapter) }
  groups.each {|each| each.icd_nonterminals = IcdNonterminal.find_by_nonterminal(each.code); each.save}
  chapter.icd_chapter_groups = groups
  chapter.save
end

init_chapter(IcdChapter.create(roman_number: "I", number:1, nonterminals: 'A00-B99',
                  text_de: "Bestimmte infektiöse und parasitäre Krankheiten",
                  text_fr: "Certaines maladies infectieuses et parasitaires",
                  text_it: "Alcune malattie infettive e parassitarie"))

init_chapter(IcdChapter.create(roman_number: "II", number:2, nonterminals: 'C00-D48',
                  text_de: "Neubildungen",
                  text_fr: "Tumeurs",
                  text_it: "Tumori"))
init_chapter(IcdChapter.create(roman_number: "III", number:3, nonterminals: 'D50-D90',
                  text_de: "Krankheiten des Blutes und der blutbildenden Organe sowie bestimmte Störungen mit Beteiligung des Immunsystems",
                  text_fr: "Maladies du sang et des organes hématopoïétiques et certains troubles du système immunitaire",
                  text_it: "Malattie del sangue e degli organi ematopoietici ed alcuni disturbi del sistema immunitario"))
init_chapter(IcdChapter.create(roman_number: "IV", number:4, nonterminals: 'E00-E90',
                  text_de: "Endokrine, Ernährungs- und Stoffwechselkrankheiten",
                  text_fr: "Maladies endocriniennes, nutritionnelles et métaboliques",
                  text_it: "Malattie endocrine, nutrizionali e metaboliche"))
init_chapter(IcdChapter.create(roman_number: "V", number:5, nonterminals: 'F00-F99',
                  text_de: "Psychische und Verhaltensstörungen",
                  text_fr: "Troubles mentaux et du comportement",
                  text_it: "Disturbi psichici e comportamentali"))
init_chapter(IcdChapter.create(roman_number: "VI", number:6, nonterminals: 'G00-G99',
                  text_de: "Krankheiten des Nervensystems",
                  text_fr: "Maladies du système nerveux",
                  text_it: "Malattie del sistema nervoso"))
init_chapter(IcdChapter.create(roman_number: "VII", number:7, nonterminals: 'H00-H59',
                  text_de: "Krankheiten des Auges und der Augenanhangsgebilde",
                  text_fr: "Maladies de l'œil et de ses annexes",
                  text_it: "Malattie dell'occhio e degli annessi oculari"))
init_chapter(IcdChapter.create(roman_number: "VIII", number:8, nonterminals: 'H60-H95',
                  text_de: "Krankheiten des Ohres und des Warzenfortsatzes",
                  text_fr: "Maladies de l'oreille et de l'apophyse mastoïde",
                  text_it: "Malattie dell'orecchio e dell'apofisi mastoide"))
init_chapter(IcdChapter.create(roman_number: "IX", number:9, nonterminals: 'I00-I99',
                  text_de: "Krankheiten des Kreislaufsystems",
                  text_fr: "Maladies de l'appareil circulatoire",
                  text_it: "Malattie del sistema circolatori"))
init_chapter(IcdChapter.create(roman_number: "X", number:10, nonterminals: 'J00-J99',
                  text_de: "Krankheiten des Atmungssystems",
                  text_fr: "Maladies de l'appareil respiratoire",
                  text_it: "Malattie del sistema circolatori"))
init_chapter(IcdChapter.create(roman_number: "XI", number:11, nonterminals: 'K00-K93',
                  text_de: "Krankheiten des Verdauungssystems",
                  text_fr: "Maladies de l'appareil digestif",
                  text_it: "Malattie dell'apparato digerente"))
init_chapter(IcdChapter.create(roman_number: "XII", number:12, nonterminals: 'L00-L99',
                  text_de: "Krankheiten der Haut und der Unterhaut",
                  text_fr: "Maladies de l'appareil digestif",
                  text_it: "Malattie della cute e del tessuto sottocutaneo"))
init_chapter(IcdChapter.create(roman_number: "XIII", number:13, nonterminals: 'M00-M99',
                  text_de: "Krankheiten des Muskel-Skelett-Systems und des Bindegewebes",
                  text_fr: "Maladies du système ostéo-articulaire, des muscles et du tissu conjonctif",
                  text_it: "Malattie del sistema osteomuscolare e del tessuto connettivo"))
init_chapter(IcdChapter.create(roman_number: "XIV", number:14, nonterminals: 'N00-N99',
                  text_de: "Krankheiten des Urogenitalsystems",
                  text_fr: "Maladies de l'appareil génito-urinaire",
                  text_it: "Malattie dell'apparato genitourinario"))
init_chapter(IcdChapter.create(roman_number: "XV", number:15, nonterminals: 'O00-O99',
                  text_de: "Schwangerschaft, Geburt und Wochenbett",
                  text_fr: "Grossesse, accouchement et puerpéralité",
                  text_it: "Gravidanza, parto e puerperio"))
init_chapter(IcdChapter.create(roman_number: "XVI", number:16, nonterminals: 'P00-P96',
                  text_de: "Bestimmte Zustände, die ihren Ursprung in der Perinatalperiode haben",
                  text_fr: "Certaines affections dont l'origine se situe dans la période périnatale",
                  text_it: "Alcune condizioni morbose che hanno origine nel periodo perinatale"))
init_chapter(IcdChapter.create(roman_number: "XVII", number:17, nonterminals: 'Q00-Q99',
                  text_de: "Angeborene Fehlbildungen, Deformitäten und Chromosomenanomalien",
                  text_fr: "Malformations congénitales et anomalies chromosomiques",
                  text_it: "Malformazioni e deformazioni congenite, anomalie cromosomiche"))
init_chapter(IcdChapter.create(roman_number: "XVIII", number:18, nonterminals: 'R00-R99',
                  text_de: "Symptome und abnorme klinische und Laborbefunde, die anderenorts nicht klassifiziert sind",
                  text_fr: "Symptômes, signes et résultats anormaux d'examens cliniques et de laboratoire, non classés ailleurs",
                  text_it: "Sintomi, segni e risultati anormali di esami clinici e di laboratorio, non classificati altrove"))
init_chapter(IcdChapter.create(roman_number: "XIX", number:19, nonterminals: 'S00-T98',
                  text_de: "Verletzungen, Vergiftungen und bestimmte andere Folgen äußerer Ursachen",
                  text_fr: "Lésions traumatiques, empoisonnements et certaines autres conséquences de causes externes",
                  text_it: "Traumatismi, avvelenamenti ed alcune altre conseguenze di cause esterne"))
init_chapter(IcdChapter.create(roman_number: "XX", number:20, nonterminals: 'V01-Y84',
                  text_de: "Äußere Ursachen von Morbidität und Mortalität",
                  text_fr: "Causes externes de morbidité et de mortalité",
                  text_it: "Cause esterne di morbosità e mortalità"))
init_chapter(IcdChapter.create(roman_number: "XXI", number:21, nonterminals: 'Z00-Z99',
                  text_de: "Faktoren, die den Gesundheitszustand beeinflussen und zur Inanspruchnahme des Gesundheitswesens führen",
                  text_fr: "Facteurs influant sur l'état de santé et motifs de recours aux services de santé",
                  text_it: "Fattori influenzanti lo stato di salute e il ricorso ai servizi sanitari"))
init_chapter(IcdChapter.create(roman_number: "XXII", number:22, nonterminals: 'U00-U99',
                  text_de: "Schlüsselnummern für besondere Zwecke",
                  text_fr: "Codes d'utilisation particulière",
                  text_it: "Codici per scopi speciali"))
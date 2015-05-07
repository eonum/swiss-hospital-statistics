def write (file, output)
  File.write('db/'+file, output)
end


def import_icd_extra_nonterminals
  CSV.foreach('db/icd_extra_nonterminals_3.csv', quote_char: '"', col_sep: ',', row_sep: :auto, headers: true) do |row|
    code = row['code']
    text_de = row['text_de']
    text_fr = row['text_fr']
    text_it = row['text_it']
    short_code = code
    IcdNonterminal.new({short_code: short_code, code: code, text_de: text_de, text_fr: text_fr, text_it: text_it}).save
  end
end


def convert_chapter (chapter)
  {:roman_number => chapter.roman_number, :number => chapter.number, :nonterminals => chapter.nonterminals, :text_de => chapter.text_de, :text_fr => chapter.text_fr, :text_it => chapter.text_it}
end

def export_icd_chapters
  init_chapters
  write('icd_chapters.json',
        IcdChapter.all
            .collect{|chapter| convert_chapter (chapter)}
            .sort_by { |each| each[:number] }
            .to_json)
end

def convert_group (chapter, group)
  {:code => group.code, :chapter => chapter.roman_number, :chapter_number => chapter.number,:text_de => group.text_de, :text_fr => group.text_fr, :text_it => group.text_it}
end

def select_chapter (chapter, group)
  arr = chapter.nonterminals.split(/-/)
  from = arr[0]
  to = arr[1]
  arr = group.code.split(/-/)
  start = arr[0]
  finish = arr[1]
  from <= start && to >= finish
end

def init_chapter(chapter)
  chapter.save
end

def init_chapters
  IcdChapter.delete_all
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
end

def chapter_of_group (group)
  IcdChapter.all.select{|chapter| select_chapter(chapter, group)}.first
end

def export_icd_groups
  write('icd_groups.json',
        IcdGroup.all
            .collect{|group| convert_group(chapter_of_group(group), group)}
            .flatten
            .sort {|a, b| [a[:code], a[:chapter_number]] <=> [b[:code], b[:chapter_number]] }
            .to_json)
end

def convert_non_terminal (chapter, group, nonterminal)
  {:code => nonterminal.code,
   :short_code => nonterminal.short_code||nonterminal.code,
   :text_de => nonterminal.text_de,
   :text_fr => nonterminal.text_fr,
   :text_it => nonterminal.text_it,
   :coding_hint_de => nonterminal.coding_hint_de,
   :coding_hint_fr => nonterminal.coding_hint_fr,
   :coding_hint_it => nonterminal.coding_hint_it,
   :note_de => nonterminal.note_de,
   :note_fr => nonterminal.note_fr,
   :note_it => nonterminal.note_it,
   :inclusions_de => nonterminal.inclusions_de||[],
   :inclusions_fr => nonterminal.inclusions_fr||[],
   :inclusions_it => nonterminal.inclusions_it||[],
   :exclusions_de => nonterminal.exclusions_de||[],
   :exclusions_fr => nonterminal.exclusions_fr||[],
   :exclusions_it => nonterminal.exclusions_it||[],
   :group => group.code,
   :chapter => chapter.roman_number,
   :chapter_number => chapter.number}
end

def select_group (group, nonterminal)
  arr = group.code.split(/-/)
  from = arr[0]
  to = arr[1]
  code = nonterminal.code
  result = from <= code && to >= code
  result = code.start_with? from unless result
  result = code.start_with? to unless result
  result
end

def group_of_nonterminal (nonterminal)
  result = IcdGroup.all.select{|group| select_group(group, nonterminal)}.first
  puts nonterminal.as_document if result.nil?
  result
end

def export_icd_nonterminals
  write('icd_nonterminals.json',IcdNonterminal.all
                                    .collect{ |nonterminal| group = group_of_nonterminal(nonterminal);convert_non_terminal(chapter_of_group(group), group, nonterminal)}
                                    .flatten
                                    .sort {|a, b| [a[:code], a[:chapter_number]] <=> [b[:code], b[:chapter_number]] }
                                    .to_json)
end

def convert_terminal (chapter, group, nonterminal, terminal)
  {:code => terminal.code,
   :short_code => terminal.short_code,
   :text_de => terminal.text_de,
   :text_fr => terminal.text_fr,
   :text_it => terminal.text_it,
   :search_text_de => terminal.search_text_de,
   :search_text_fr => terminal.search_text_fr,
   :search_text_it => terminal.search_text_it,
   :coding_hint_de => terminal.coding_hint_de,
   :coding_hint_fr => terminal.coding_hint_fr,
   :coding_hint_it => terminal.coding_hint_it,
   :note_de => terminal.note_de,
   :note_fr => terminal.note_fr,
   :note_it => terminal.note_it,
   :inclusions_de => terminal.inclusions_de||[],
   :inclusions_fr => terminal.inclusions_fr||[],
   :inclusions_it => terminal.inclusions_it||[],
   :exclusions_de => terminal.exclusions_de||[],
   :exclusions_fr => terminal.exclusions_fr||[],
   :exclusions_it => terminal.exclusions_it||[],
   :annotations => terminal.annotations||[],
   :nonterminal => nonterminal.code,
   :nonterminal_short => nonterminal.short_code||nonterminal.code,
   :group => group.code,
   :chapter => chapter.roman_number,
   :chapter_number => chapter.number}
end


def select_nonterminal (nonterminal, terminal)
  terminal.code.start_with? nonterminal.code
end

def nonterminal_of_terminal (terminal)
  code = terminal.code[0,2]
  result = IcdNonterminal.where(code: /^#{code}/).select{|each| select_nonterminal(each, terminal)}.first
  puts terminal.as_document if result.nil?
  #parse_not_found(terminal.code) if result.nil?
  result
end

def parse_not_found(code)
  return if code.empty?
  begin
    page = Nokogiri::HTML(open("http://www.icd-code.de/icd/code/#{code}.html"))
    name = page.css('td.code_three')[0].text
    code = page.css('div.code')[0].text.tr('^A-Za-z0-9', '')
    puts "#{code};#{name}"
    open('db/unknown_nonterminals_3.txt', 'a') { |f|
      f.puts "#{code};#{name}"
    }
  rescue OpenURI::HTTPError => ex
    begin
      Nokogiri::HTML(open("http://www.icd-code.de/icd/code/#{code}*.html"))
      parse_not_found(code+'*')
    rescue OpenURI::HTTPError => ex
      begin
        Nokogiri::HTML(open("http://www.icd-code.de/icd/code/#{code}!.html"))
        parse_not_found(code+'!')
      rescue OpenURI::HTTPError => ex
        begin
          Nokogiri::HTML(open("http://www.icd-code.de/icd/code/#{code}.-!.html"))
          parse_not_found(code+'.-!')
        rescue OpenURI::HTTPError => ex
          begin
            Nokogiri::HTML(open("http://www.icd-code.de/icd/code/#{code}.-.html"))
            parse_not_found(code+'.-')
          rescue OpenURI::HTTPError => ex
            parse_not_found(code[0...-1])
          end
        end
      end
    end
  end
end

def export_icd_terminals
  write('icd_terminals.json',IcdCode.all
                                 .collect{ |terminal| nonterminal = nonterminal_of_terminal(terminal); group = group_of_nonterminal(nonterminal); convert_terminal(chapter_of_group(group), group, nonterminal, terminal)}
                                 .flatten
                                 .sort {|a, b| [a[:code], a[:chapter_number]] <=> [b[:code], b[:chapter_number]] }
                                 .to_json)
end

# export_icd_chapters
# export_icd_groups
# export_icd_nonterminals
# export_icd_terminals
#import_icd_extra_nonterminals
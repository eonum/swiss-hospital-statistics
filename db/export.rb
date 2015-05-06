def write (file, output)
  File.write('db/'+file, output)
end

def convert_chapter (chapter)
  {:roman_number => chapter.roman_number, :number => chapter.number, :nonterminals => chapter.nonterminals, :text_de => chapter.text_de, :text_fr => chapter.text_fr, :text_it => chapter.text_it}
end

def export_icd_chapters
  write('icd_chapters.json',
        IcdChapter.all
            .collect{|chapter| convert_chapter (chapter)}
            .sort_by { |each| each[:number] }
            .to_json)
end

def convert_group (chapter, group)
  {:code => group.code, :chapter => chapter.roman_number, :chapter_number => chapter.number,:text_de => group.text_de, :text_fr => group.text_fr, :text_it => group.text_it}
end

def export_icd_groups
  write('icd_groups.json',
        IcdChapter.all
            .collect{|chapter| chapter.icd_chapter_groups.collect { |group| convert_group(chapter, group) }}
            .flatten
            .sort {|a, b| [a[:code], a[:chapter_number]] <=> [b[:code], b[:chapter_number]] }
            .to_json)
end

def convert_non_terminal (chapter, group, nonterminal)
  {:code => nonterminal.code,
   :short_code => nonterminal.short_code,
   :text_de => nonterminal.text_de,
   :text_fr => nonterminal.text_fr,
   :text_it => nonterminal.text_it,
   :coding_hint_de => nonterminal.coding_hint_de,
   :coding_hint_fr => nonterminal.coding_hint_fr,
   :coding_hint_it => nonterminal.coding_hint_it,
   :note_de => nonterminal.note_de,
   :note_fr => nonterminal.note_fr,
   :note_it => nonterminal.note_it,
   :inclusions_de => nonterminal.inclusions_de,
   :inclusions_fr => nonterminal.inclusions_fr,
   :inclusions_it => nonterminal.inclusions_it,
   :exclusions_de => nonterminal.exclusions_de,
   :exclusions_fr => nonterminal.exclusions_fr,
   :exclusions_it => nonterminal.exclusions_it,
   :group => group.code,
   :chapter => chapter.roman_number,
   :chapter_number => chapter.number}
end

def export_icd_nonterminals
  write('icd_nonterminals.json',IcdChapter.all
                                    .collect{ |chapter| chapter.icd_chapter_groups.collect { |group| group.icd_nonterminals.collect{ |nonterminal| convert_non_terminal(chapter, group, nonterminal)} }}
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
   :inclusions_de => terminal.inclusions_de,
   :inclusions_fr => terminal.inclusions_fr,
   :inclusions_it => terminal.inclusions_it,
   :exclusions_de => terminal.exclusions_de,
   :exclusions_fr => terminal.exclusions_fr,
   :exclusions_it => terminal.exclusions_it,
   :annotations => terminal.annotations,
   :nonterminal => nonterminal.code,
   :nonterminal_short => nonterminal.short_code,
   :group => group.code,
   :chapter => chapter.roman_number,
   :chapter_number => chapter.number}
end

def export_icd_terminals
  write('icd_terminals.json',IcdChapter.all
                                 .collect{ |chapter| chapter.icd_chapter_groups.collect { |group| group.icd_nonterminals.collect{ |nonterminal|
                              IcdCode.where(code: /^#{nonterminal.code}/i)
                                  .collect{|terminal| convert_terminal(chapter, group, nonterminal, terminal) }
                            }}}
                                 .flatten
                                 .sort {|a, b| [a[:code], a[:chapter_number]] <=> [b[:code], b[:chapter_number]] }
                                 .to_json)
end

export_icd_chapters
export_icd_groups
export_icd_nonterminals
export_icd_terminals
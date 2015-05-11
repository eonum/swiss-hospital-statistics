require 'datasets/icd_chapter_age_sex_dataset'
require 'codes/icd_chapter'
require 'codes/icd_group'
require 'codes/icd_nonterminal'
require 'codes/icd_terminal'
require 'codes/icd_code'

def measure_time (title, &block)
  puts "#{title}..."
  time_start = Time.now
  block.call
  puts "   done in #{Time.now - time_start} seconds"
end

def new_icd_chapter (json)
  IcdChapter.new(roman_number: json['roman_number'], number: json['number'], nonterminals: json['nonterminals'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end

def new_icd_group (json)
  IcdGroup.new(code: json['code'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end

def new_icd_nonterminal (json)
  IcdNonterminal.new(code: json['code'], short_code: json['short_code'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end

def new_icd_terminal (json)
  IcdTerminal.new(code: json['code'], short_code: json['short_code'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end

def new_icd_code (json)
  IcdCode.new(code: json['code'], short_code: json['short_code'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end

def import_hospitals
  measure_time 'Importing hospitals' do
    HospitalType.delete_all
    HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Zentrumsversorgung', :text_fr => 'Hôpitaux de soins généraux, prise en charge centralisée')
    HospitalType.create(:text_de => 'Allgemeine Krankenhäuser, Grundversorgung', :text_fr => 'Hôpitaux de soins généraux, soins de base')
    HospitalType.create(:text_de => 'Spezialkliniken: Psychiatrische Kliniken', :text_fr => 'Cliniques spécialisées: cliniques psychiatriques')
    HospitalType.create(:text_de => 'Spezialkliniken: Rehabilitationskliniken', :text_fr => 'Cliniques spécialisées: cliniques de réadaptation')
    HospitalType.create(:text_de => 'Spezialkliniken: Andere Spezialkliniken', :text_fr => 'Cliniques spécialisées: autres cliniques spécialisées')
  end
end

def import_icd_terminals
  measure_time 'Importing ICD Chapters and Nonterminals from Json files' do
    IcdChapter.delete_all
    puts '   reading json...'
    chapters_json = JSON.parse(File.read('db/icd_chapters.json'))
    groups_json = JSON.parse(File.read('db/icd_groups.json'))
    nonterminals_json = JSON.parse(File.read('db/icd_nonterminals.json'))
    terminals_json = JSON.parse(File.read('db/icd_terminals.json'))

    puts '   parsing...'

    chapters_arr = chapters_json.collect{|chapter_json| new_icd_chapter(chapter_json) }
    chapters = Hash[ *chapters_arr.collect { |chapter| [chapter.roman_number, chapter ] }.flatten ]

    groups_arr = groups_json.collect{|group_json| group = new_icd_group(group_json); chapters[group_json['chapter']].icd_groups.push(group); group }
    groups = Hash[ *groups_arr.collect { |group| [group.code, group ] }.flatten ]

    nonterminals_arr = nonterminals_json.collect{|nonterminal_json| nonterminal = new_icd_nonterminal(nonterminal_json); groups[nonterminal_json['group']].icd_nonterminals.push(nonterminal); nonterminal }
    nonterminals = Hash[ *nonterminals_arr.collect { |nonterminal| [nonterminal.code, nonterminal ] }.flatten ]

    terminals_json.collect{|terminal_json| terminal = new_icd_terminal(terminal_json)
    nonterminals[terminal_json['nonterminal']].icd_terminals.push(terminal)}
    IcdChapter.collection.insert chapters_arr.collect{|each| each.as_document } unless chapters_arr.empty?
  end
end

def import_icd_codes
  measure_time 'Importing ICD codes from Json file' do
    IcdCode.delete_all
    icd_json = JSON.parse(File.read('db/icd_terminals.json'))
    codes = icd_json.map{ |json| new_icd_code(json) }
    IcdCode.collection.insert codes.collect{|each| each.as_document } unless codes.empty?
  end
end

def new_drg_chapter (json)
  DrgChapter.new(code: json['code'], short_code: json['number'], index: json['index'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end

def new_drg_nonterminal (json)
  DrgNonterminal.new(code: json['code'], short_code: json['short_code'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end

def new_drg_terminal (json)
  DrgTerminal.new(code: json['code'], short_code: json['short_code'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end

def new_drg_code (json)
  DrgCode.new(code: json['code'], short_code: json['short_code'], text_de: json['text_de'], text_fr: json['text_fr'], text_it: json['text_it'])
end


def import_drg_terminals
  measure_time 'Importing DRG Chapters and Nonterminals from Json files' do
    DrgChapter.delete_all
    puts '   reading json...'
    chapters_json = JSON.parse(File.read('db/drg_chapters.json'))
    nonterminals_json = JSON.parse(File.read('db/drg_nonterminals.json'))
    terminals_json = JSON.parse(File.read('db/drg_terminals.json'))

    puts '   parsing...'

    chapters_arr = chapters_json.collect{|chapter_json| new_drg_chapter(chapter_json) }
    chapters = Hash[ *chapters_arr.collect { |chapter| [chapter.code, chapter ] }.flatten ]

    nonterminals_arr = nonterminals_json.collect{|nonterminal_json| nonterminal = new_drg_nonterminal(nonterminal_json); chapters[nonterminal_json['mdc_code']].drg_nonterminals.push(nonterminal); nonterminal }
    nonterminals = Hash[ *nonterminals_arr.collect { |nonterminal| [nonterminal.code, nonterminal ] }.flatten ]

    terminals_json.collect{|terminal_json| terminal = new_drg_terminal(terminal_json)
    nonterminals[terminal_json['adrg_code']].drg_terminals.push(terminal)}
    DrgChapter.collection.insert chapters_arr.collect{|each| each.as_document } unless chapters_arr.empty?
  end
end

def import_drg_codes
  measure_time 'Importing DRG codes from Json file' do
    DrgCode.delete_all
    drg_json = JSON.parse(File.read('db/drg_terminals.json'))
    codes = drg_json.map{ |json| new_drg_code(json) }
    DrgCode.collection.insert codes.collect{|each| each.as_document } unless codes.empty?
  end
end

def update_all_datasets
  AbstractDataset.delete_all
  Catalog.new.update_db
end

def seed_all
  import_hospitals
  import_icd_terminals
  import_icd_codes
  import_drg_terminals
  import_drg_codes
  update_all_datasets
end

measure_time 'Seeding database' do
  seed_all
end
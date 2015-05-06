require 'codes/icd_code'
require 'codes/chop_code'
require 'codes/drg'
require 'codes/icd_chapter'

#
# This class is responsible for the mapping of tags to the code types from the catalogs stemming from
# the initial db dump.
#
class CodeCatalog

  def initialize
    @codes = {
        :icd => IcdCode,
        :chop => ChopCode,
        :drg => Drg
    }
  end

  # Gets the code that starts with
  # or is equal to the given code
  def specific_code(tag, code)
    type = code_for_tag(tag)
    result = type.where(:short_code => /^#{code}/).to_a
    DocumentForJSONCleaner.new.clean_documents_for_json(result)
  end

  # Fetches all codes for a specific type from the DB
  def codes_for_tag(tag)
    type = code_for_tag(tag)
    codes = type.all.pluck(:code, :short_code, :text_de, :text_fr, :text_it).to_a
    codes.collect{|each| {:type => tag, :code => each[0], :short_code => each[1], :text_de => each[2], :text_fr => each[3], :text_it => each[4]}}.sort_by{|each| each[:code]}
  end

  def code_for_tag(tag)
    return unless tag
    @codes[tag.to_sym]
  end

  def icd_chapters
    DocumentForJSONCleaner.new.clean_documents_for_json(IcdChapter.all.asc(:number))
  end

end
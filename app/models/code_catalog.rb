require 'codes/icd_code'
require 'codes/chop_code'
require 'codes/drg'

#
# This class is responsible for the mapping of tags to the code types from the catalogs stemming from
# the initial db dump.
#
class CodeCatalog

  def initialize
    @codes = {
        "icd" => IcdCode,
        "chop" => ChopCode,
        "drg" => Drg
    }
  end

  # Gets the code that starts with
  # or is equal to the given code
  def specific_code(tag, code)
    type = code_for_tag(tag)
    result = type.where(:short_code => /^#{code}/).to_a
    DocumentForJSONCleaner.new.clean_documents_for_json(result)
  end

  # Fetches all codes for a specific type from the DB.
  # Warning, fetches the entire collection!
  def codes_for_tag(tag)
    type = code_for_tag(tag)
    type.all.to_a
  end

  def code_for_tag(tag)
    return unless tag
    @codes[tag]
  end

end
require 'abstract/categorised_dataset'
require 'catalog'
require 'parsers/codes/su_age_parser'
require 'parsers/streams/su_age_stream'

class AgeCodeDataset < CategorisedDataset
  pragmatize!

  # belongs to ICD, because it's data is filed under ICD codes
  belongs_to :icd_code

  @tag = :age
  @type_description = 'Age code means something and does something'

  def find_parent
    # TODO: how do we do that? -> customer meeting
  end

  def persist_dataset
    parent_code = find_parent
    if parent_code.nil?
      self.save
    else
      # persist self on parent
      parent_code.icd_code_datasets.push(self)
      parent_code.save
    end
  end

  _parser
  def self.age_parser
    SuAgeParser.new('public/statistics/su-d-14.04.02-AGE-zp-2013.xls').stream(SuAgeStream.new)
    # SuAgeParser.new('./test/fixtures/su_d_age.xls').stream(SuAgeStream.new)
  end

end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def age_code_in(context)
    AgeCodeDataset
  end
end
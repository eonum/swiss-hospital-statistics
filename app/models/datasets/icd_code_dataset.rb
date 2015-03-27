require 'abstract/categorised_dataset'
require 'catalog'

class IcdCodeDataset < CategorisedDataset
  belongs_to :icd_code

  pragmatize!

  @tag = :icd
  @type_description = 'Icd code means something and does something'

  def find_parent
    # find corresponding Icd Code
    IcdCode.where(short_code: self.code).first
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
  def self.icd_parser
    SuChopDrgIcdParser.new('public/statistics/su-d-14.04.02-ICD-zp-2013.xls').stream(SuChopDrgIcdStream.new(self))
  end
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def icd_code_in(context)
    IcdCodeDataset
  end
end
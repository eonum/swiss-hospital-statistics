require 'abstract/categorised_code'
require 'catalog'

class IcdCodeDataset < CategorisedDataset
  belongs_to :icd_code

  pragmatize!

  @tag = :icd
  @type_description = 'Icd code means something and does something'

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
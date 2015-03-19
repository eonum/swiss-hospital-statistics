require 'abstract/categorised_dataset'
require 'catalog'

class DrgCodeDataset < CategorisedDataset
  pragmatize!

  belongs_to :drg

  @tag = :drg
  @type_description = 'Drg code means something and does something'

  _parser
  def self.drg_parser
    SuChopDrgIcdParser.new('public/statistics/su-d-14.04.02-DRG-2013.xls').stream(SuChopDrgIcdStream.new(self))
  end
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def drg_code_in(context)
    DrgCodeDataset
  end
end
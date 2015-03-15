require 'abstract/categorised_code'
require 'catalog'

class DrgCode < CategorisedCode
  pragmatize!

  @tag = :drg
  @type_description = 'Drg code means something and does something'

  _parser
  def self.drg_parser
    SuChopDrgIcdParser.new('public/statistics/su-d-14.04.02-DRG-zp-2013.xls').stream(SuChopDrgIcdStream.new(self))
  end
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def drg_code_in(context)
    DrgCode
  end
end
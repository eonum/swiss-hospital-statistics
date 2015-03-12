require 'abstract/categorised_code'
require 'catalog'

class DrgCode < CategorisedCode

  include Mongoid::Document
  include MultiLanguageText

  def name
    return 'DrgCode'
  end

end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def drg_code_in(aContext)
    DrgCode
  end
end
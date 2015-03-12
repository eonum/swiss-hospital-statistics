require 'abstract/categorised_code'
require 'catalog'

class AgeCode < CategorisedCode

  include Mongoid::Document
  include MultiLanguageText

  def name
    return 'AgeCode'
  end

end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def age_code_in(aContext)
    AgeCode
  end
end
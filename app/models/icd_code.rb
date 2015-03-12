require 'abstract/categorised_code'
require 'catalog'

class IcdCode < CategorisedCode

  def name
    return 'IcdCode'
  end

end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def icd_code_in(aContext)
    IcdCode
  end
end
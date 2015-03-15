require 'abstract/categorised_code'
require 'catalog'

class IcdCode < CategorisedCode
  pragmatize!

  @tag = :icd
  @type_description = 'Icd code means something and does something'
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def icd_code_in(context)
    IcdCode
  end
end
require 'abstract/categorised_code'
require 'catalog'

class KeCodeDataset < CategorisedDataset
  pragmatize!

  @tag = :ke
  @type_description = 'Ke code means something and does something'
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def ke_code_in(context)
    KeCodeDataset
  end
end
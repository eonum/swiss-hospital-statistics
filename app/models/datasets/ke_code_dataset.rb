require 'abstract/categorised_dataset'
require 'catalog'

# we only need ke data as soon as we have finished the orange excel files
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
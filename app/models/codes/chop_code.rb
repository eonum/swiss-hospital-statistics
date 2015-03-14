require 'abstract/categorised_code'
require 'catalog'

class ChopCode < CategorisedCode

  @name ='ChopCode'
  @id = :chop
  @type_description = 'Chop code means something and does something'
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def chop_code_in(context)
    ChopCode
  end
end
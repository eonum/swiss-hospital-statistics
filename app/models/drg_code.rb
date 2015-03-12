require 'abstract/categorised_code'
require 'catalog'

class DrgCode < CategorisedCode
  include Mongoid::Document
  include MultiLanguageText

  @name ='DrgCode'
  @id = 'drg'
  @type_description = 'Drg code means something and does something'

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
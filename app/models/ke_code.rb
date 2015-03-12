require 'catalog'

class KeCode
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def ke_code_in(aContext)
    KeCode
  end
end
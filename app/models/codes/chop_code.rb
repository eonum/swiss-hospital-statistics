require 'abstract/categorised_code'
require 'catalog'

class ChopCode < CategorisedCode

  @name ='ChopCode'
  @id = :chop
  @type_description = 'Chop code means something and does something'

  # static method for general information about the collection
  def ChopCode::to_json
    test = "Count: ".concat(ChopCode.count.to_s).concat("\n\n")
    ChopCode.each do |chopCode|
      test += chopCode[:code] + "\n"
    end
    return test
  end

  # method for an object
  def to_json
    ChopCode.new
  end
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
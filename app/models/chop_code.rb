require 'abstract/categorised_code'
require 'catalog'

class ChopCode < CategorisedCode

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
    chopCode = ChopCode.new
    return chopCode
  end

  def name
    return 'CHOPCode'
  end
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def chop_code_in(aContext)
    ChopCode
  end
end
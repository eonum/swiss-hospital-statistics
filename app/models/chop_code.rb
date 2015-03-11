require 'abstract/categorised_code'

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

require 'abstract/categorised_code'

class ChopCode < CategorisedCode
  include Mongoid::Document
  include MultiLanguageText

  has_and_belongs_to_many :parents, class_name: 'ChopNonterminal'

  field :short_code, :type => String
  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
  field :version, :type => String

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

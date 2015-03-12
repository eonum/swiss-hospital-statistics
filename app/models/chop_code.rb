require 'abstract/categorised_code'

class ChopCode < CategorisedCode
  include Mongoid::Document
  include MultiLanguageText

  has_and_belongs_to_many :parents, class_name: 'ChopNonterminal'

  def name
    return 'CHOPCode'
  end


end

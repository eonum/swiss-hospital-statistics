require 'abstract/abstract_code'

class ChopCode < AbstractCode
  include Mongoid::Document
  include MultiLanguageText

  has_and_belongs_to_many :parents, class_name: 'ChopNonterminal'

  def name
    return 'CHOPCode'
  end
end

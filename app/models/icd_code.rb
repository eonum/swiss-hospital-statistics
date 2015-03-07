require 'abstract/categorised_code'

class IcdCode < CategorisedCode
  include Mongoid::Document
  include MultiLanguageText

  has_and_belongs_to_many :parents, class_name: 'IcdNonterminal'

  def name
    return 'IcdCode'
  end

end

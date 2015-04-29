require 'codes/icd_nonterminal'

class IcdChapterGroup
  include Mongoid::Document
  include MultiLanguageText

  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  embedded_in :icd_chapter

  embeds_many :icd_nonterminals do
    def find_by_nonterminal(nonterminals)
      IcdNonterminal.find_by_nonterminal(nonterminals)
    end
  end

end
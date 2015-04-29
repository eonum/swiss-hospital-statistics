require 'codes/icd_nonterminal'

class IcdChapter
  include Mongoid::Document

  field :roman_number, :type => String
  field :nonterminals, :type => String
  field :number, :type => Integer
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  has_many :icd_chapter_age_sex_datasets
  embeds_many :icd_nonterminals do
    def find_by_nonterminal(nonterminals)
      IcdNonterminal.find_by_nonterminal(nonterminals)
    end
  end
end
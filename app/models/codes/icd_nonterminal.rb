require 'codes/icd_terminal'

class IcdNonterminal
  include Mongoid::Document
  include MultiLanguageText

  field :code, :type => String
  field :short_code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  embedded_in :icd_group
  embeds_many :icd_terminals
end
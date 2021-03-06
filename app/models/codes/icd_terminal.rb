class IcdTerminal
  include Mongoid::Document

  field :code, :type => String
  field :short_code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  embedded_in :icd_nonterminal
end
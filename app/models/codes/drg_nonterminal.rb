class DrgNonterminal
  include Mongoid::Document

  field :code, :type => String
  field :short_code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  embedded_in :drg_chapter
  embeds_many :drg_terminals
end
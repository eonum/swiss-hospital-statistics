require 'codes/drg_nonterminal'

class DrgChapter
  include Mongoid::Document

  field :code, :type => String
  field :short_code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
  field :index, :type => String

  embeds_many :drg_nonterminals
end
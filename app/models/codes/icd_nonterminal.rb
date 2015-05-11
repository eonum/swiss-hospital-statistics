require 'codes/icd_terminal'

class IcdNonterminal
  include Mongoid::Document
  include MultiLanguageText

  field :code, :type => String
  field :short_code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  # field :coding_hint_de, :type => String
  # field :coding_hint_fr, :type => String
  # field :coding_hint_it, :type => String
  # field :note_de, :type => String
  # field :note_fr, :type => String
  # field :note_it, :type => String
  # field :inclusions_de, :type => Array
  # field :inclusions_fr, :type => Array
  # field :inclusions_it, :type => Array
  # field :exclusions_de, :type => Array
  # field :exclusions_fr, :type => Array
  # field :exclusions_it, :type => Array


  embedded_in :icd_group
  embeds_many :icd_terminals
end
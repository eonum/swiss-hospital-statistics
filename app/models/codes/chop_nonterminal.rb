class ChopNonterminal
  include Mongoid::Document
  include MultiLanguageText

  field :short_code, :type => String
  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  # field :notes_de, :type => Array
  # field :notes_fr, :type => Array
  # field :notes_it, :type => Array
  # field :descriptions_de, :type => Array
  # field :descriptions_fr, :type => Array
  # field :descriptions_it, :type => Array
  # field :supplement_codes_de, :type => Array
  # field :supplement_codes_fr, :type => Array
  # field :supplement_codes_it, :type => Array
end
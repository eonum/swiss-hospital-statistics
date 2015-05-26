class ChopCode
  include Mongoid::Document
  include MultiLanguageText

  has_and_belongs_to_many :parents, class_name: 'ChopNonterminal'

  has_many :chop_code_datasets

  field :code, :type => String
  field :short_code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  # field :annotations, :type => Array
  # field :descriptions_de, :type => Array
  # field :descriptions_fr, :type => Array
  # field :descriptions_it, :type => Array
  # field :notes_de, :type => Array
  # field :notes_fr, :type => Array
  # field :notes_it, :type => Array
  # field :search_text_de, :type => String
  # field :search_text_fr, :type => String
  # field :search_text_it, :type => String
  # field :supplement_codes_de, :type => Array
  # field :supplement_codes_fr, :type => Array
  # field :supplement_codes_it, :type => Array

end
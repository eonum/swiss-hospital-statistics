class ChopCode
  include Mongoid::Document
  include MultiLanguageText

  has_and_belongs_to_many :parents, class_name: 'ChopNonterminal'

  has_many :chop_code_datasets

  field :short_code, :type => String
  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
end
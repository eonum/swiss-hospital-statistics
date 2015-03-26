class IcdCode
  include Mongoid::Document
  include MultiLanguageText

  has_and_belongs_to_many :parents, class_name: 'IcdNonterminal'

  # possible datasets
  has_many :icd_code_datasets
  has_many :age_code_datasets

  field :short_code, :type => String
  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
end
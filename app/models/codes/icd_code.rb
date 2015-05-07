class IcdCode
  include Mongoid::Document
  include MultiLanguageText

  field :short_code, :type => String
  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  # possible datasets
  has_many :icd_code_datasets
  has_many :age_code_datasets
end
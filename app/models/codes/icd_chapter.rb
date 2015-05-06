require 'codes/icd_group'

class IcdChapter
  include Mongoid::Document

  field :roman_number, :type => String
  field :nonterminals, :type => String
  field :number, :type => Integer
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  embeds_many :icd_groups
  has_many :icd_chapter_age_sex_datasets
end
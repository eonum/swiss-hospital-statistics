class HospitalType
  include Mongoid::Document

  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String

  has_many :sex_interval_categories
end
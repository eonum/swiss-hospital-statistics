require 'categories/sex_interval_category'

class HospitalType
  include Mongoid::Document

  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
end
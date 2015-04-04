require 'abstract/interval_category'

class SexIntervalCategory < IntervalCategory

  @tag = :sex_interval

  field :dad, :type => Float
  field :percentage, :type => Float
  field :sex, :type => Integer

  belongs_to :hospital_type
end
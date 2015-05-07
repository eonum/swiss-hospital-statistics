require 'abstract/interval_category'

class SexIntervalCategory < IntervalCategory

  @tag = :sex_interval

  attr_accessor :dad
  attr_accessor :percentage
  attr_accessor :sex
  attr_accessor :hospital_type
end
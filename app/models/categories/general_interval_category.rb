require 'abstract/interval_category'

class GeneralIntervalCategory < IntervalCategory

  attr_accessor :dad
  attr_accessor :sa
  attr_accessor :min
  attr_accessor :max
  attr_accessor :number

  @tag = :interval

end
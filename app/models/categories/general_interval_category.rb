require 'abstract/interval_category'

class GeneralIntervalCategory < IntervalCategory

  field :dad, :type => Integer
  field :sa, :type => Integer
  field :min, :type => Integer
  field :max, :type => Integer
  field :number, :type => Integer

  @tag = :interval

end
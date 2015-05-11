require 'abstract/interval_category'

class SexIntervalCategory < IntervalCategory

  @tag = :sex_interval

  attr_accessor :dad
  attr_accessor :percentage
  attr_accessor :sex
  attr_accessor :hospital

  def initialize(options = {})
    super(options)
    @dad = options[:dad]
    @percentage = options[:percentage]
    @sex = options[:sex]
    @hospital = options[:hospital]
  end
end
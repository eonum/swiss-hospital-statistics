require 'abstract/abstract_category'

class IntervalCategory < AbstractCategory

  attr_accessor :interval
  attr_accessor :n

  def initialize(options = {})
    super()
    @interval = options[:interval]
    @n = options[:n]
  end

end
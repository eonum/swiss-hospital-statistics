require 'abstract/abstract_category'

class PercentileCategory < AbstractCategory

  attr_accessor :percentile
  attr_accessor :amount

  @tag = :percentile

  def initialize(options = {})
    super()
    @percentile = options[:percentile]
    @amount = options[:amount]
  end

  def ==(another)
    self.percentile == another.percentile && self.amount == another.amount
  end

end
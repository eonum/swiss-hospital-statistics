require 'abstract/abstract_category'

class PercentileCategory < AbstractCategory

  field :percentile, :type => Integer
  field :amount, :type => Float

  @id = :percentile

  def initialize (percentile, amount, *args)
    super(*args)
    self.percentile = percentile
    self.amount = amount
  end

  def ==(another)
    self.percentile == another.percentile && self.amount == another.amount
  end

end
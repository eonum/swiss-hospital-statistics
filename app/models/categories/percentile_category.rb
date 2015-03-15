require 'abstract/abstract_category'

class PercentileCategory < AbstractCategory

  field :percentile, :type => Integer
  field :amount, :type => Float

  @tag = :percentile

  def ==(another)
    self.percentile == another.percentile && self.amount == another.amount
  end

end
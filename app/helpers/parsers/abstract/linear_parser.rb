require 'parsers/abstract/composite_parser'

class LinearParser < CompositeParser

  attr_reader :is_index_used

  def initialize
    super
    @from = 1
    @step = 1
    @to = Float::INFINITY
    @position = @from
    @is_index_used = false

    #defines parsing logic for linear parsers in super class
    self.parsing do
    |parser|
      self.position(@from)
      (@from..@to).step(@step) {|index|
        index = index.round
        value = parser.value_at(index)
        break if @to == Float::INFINITY && !value
        self.position(index)
        parser.stream(@is_index_used ? index : value, @position)}
      self.position(@from)
    end
  end

  def from(index=nil)
    return @from unless index
    @from = index
    self.position(@from)
    self
  end

  def step(step=nil)
    return @step unless step
    @step = step
    self
  end

  def to(index=nil)
    return @to unless index
    @to = index
    self
  end

  def position(position=nil)
    return @position unless position
    @position = position
    self
  end

  def index
    @is_index_used = true
  end

  protected

  def value_at (index)
    raise 'SubclassResponsibility'
  end

end
require 'parsers/abstract/composite_parser'

class LinearParser < CompositeParser

  def initialize
    super
    @from = 0
    @to = 1
    @position = @from

    self.parsing do
      |parser|
      self.position(@from)
      (@from..@to).each {|index| self.position(index); parser.stream(parser.value_at(index), @position)}
      self.position(@from)
    end
  end

  def from(index=nil)
    return @from unless index
    @from = index
    self.position(@from)
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

  protected

  def value_at (index)
    raise 'SubclassResponsibility'
  end

end
require 'parsers/abstract/linear_parser'

class RowParser < LinearParser

  attr_reader :row

  def initialize
    super
    @row = 0
  end

  def row(row = nil)
    return @row unless row
    @row = row
    self
  end

  def repeated (&block)
    return super(&block) if block
    self.repeated{|parser, value| parser.row(value)}
  end

  protected

  def value_at (index)
    self.sheet.cell(@row, index)
  end

end
require 'parsers/abstract/linear_parser'

class RowParser < LinearParser

  def initialize
    super
    @row = 1
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
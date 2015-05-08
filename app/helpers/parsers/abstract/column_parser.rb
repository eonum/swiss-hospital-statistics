require 'parsers/abstract/linear_parser'

class ColumnParser < LinearParser

  def initialize
    super
    @column = 1
  end

  def column(column=nil)
    return @column unless column
    @column = column
    self
  end

  def repeated (&block)
    return super(&block) if block
    self.repeated{|parser, value| parser.column(value)}
  end

  protected

  def value_at (index)
    puts "#{index} #{@column} #{self.sheet.cell(index, @column)}"
    self.sheet.cell(index, @column)
  end

end
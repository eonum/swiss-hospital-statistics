require 'parsers/abstract/composite_parser'

class BoxParser < CompositeParser

  def initialize
    super
    @column = 1
    @row = 1
    @row_to = Float::INFINITY
    @column_to = Float::INFINITY
    @position = @column
    @repeated_column = false
    @repeated_row = true

    #defines parsing logic for linear parsers in super class
    self.parsing do
    |parser|
      greatest_column = @column
      self.position(@column)
      (@row..@row_to).each {|row_index|
        row_index = row_index.round
        row_value = []
        (@column..@column_to).each {|column_index|
          column_index = column_index.round
          value = parser.value_at(column_index, row_index)
          break if @row_to == Float::INFINITY && !value && (column_index > greatest_column || (column_index == @column && row_index == @row))
          greatest_row = [greatest_column, column_index].max
          row_value.push(value)
        }
        break if @column_to == Float::INFINITY && row_value.count { |x| x } == 0
        self.position(row_index)
        parser.stream(row_value, @position)
      }
      self.position(@column)
    end
  end

  def repeated_row
    @repeated_row = true
    @repeated_column = false
  end

  def repeated_column
    @repeated_row = false
    @repeated_column = true
  end

  def column(column=nil)
    return @column unless column
    @column = column
    self
  end

  def row(row = nil)
    return @row unless row
    @row = row
    self
  end

  def row_to(index=nil)
    return @row_to unless index
    @row_to = index
    self
  end

  def position(position=nil)
    return @position unless position
    @position = position
    self
  end

  def column_to(index=nil)
    return @column_to unless index
    @column_to = index
    self
  end

  def repeated (&block)
    return super(&block) if block
    self.repeated{|parser, value|
      parser.column(value) if @repeated_column
      parser.row(value) if @repeated_row }
  end

  def value_at (column, row)
    self.sheet.cell(row, column)
  end

end
require 'categories/general_interval_category'
require 'categories/percentile_category'

class Top3IcdStream

  attr_reader :map

  def initialize(clazz = nil)
    self.clazz(clazz)
    @map = {}
  end

  def hospital(hospital)
    puts "type=#{hospital}"
  end

  def tab (tab)
    puts tab
    @tab = tab
    @map[@tab] = {} unless @map[@tab]
  end

  def year (year)
    @year = year
    @map[@tab][@year] = {} unless @map[@tab][@year]
  end

  def code(code)
    @code_id = code[0]
    @map[@tab][@year][@code_id] = {} unless @map[@tab][@year][@code_id]
    @map[@tab][@year][@code_id][:data] = code
  end

  def percentile_values (values)
    @map[@tab][@year][@code_id] = {} unless @map[@tab][@year][@code_id]
    @map[@tab][@year][@code_id][:percentiles] = Hash[@percentiles.zip(values)]
  end

  def percentiles (percentiles)
    @percentiles = percentiles
  end

  def clazz(clazz=nil)
    return @clazz unless clazz
    @clazz = clazz
    self
  end

  def to_codes

  end
end
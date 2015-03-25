require 'categories/general_interval_category'
require 'categories/percentile_category'

class SuChopDrgIcdStream

  attr_reader :map

  def initialize(clazz = nil)
    self.clazz(clazz)
    @map = {}
  end

  def tab (tab)
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
    @codes = {}
    @map.each {|raw_interval, sheet|
      puts 'Parsing... '+ raw_interval
      sheet.each{|year, codes|
        codes.each{|id, raw_code|
          @codes[id] = @clazz.new unless @codes[id]
          data = raw_code[:data]
          percentiles = raw_code[:percentiles]
          code = @codes[id]
          code.code = id
          code.description = data[1]
          code.year = year
          #year_data = code.at(year, true)
          dataset_data = code.new_data
          interval = Interval.new.from_s(raw_interval)
          interval_category = dataset_data.at_find(GeneralIntervalCategory.tag){|each| each.interval == interval }
          unless interval_category
            interval_category = GeneralIntervalCategory.new(interval: interval)
            interval_category.n = data[2]
            interval_category.dad = data[3]
            interval_category.sa = data[4]
            interval_category.min = data[5]
            interval_category.max = data[6]
            percentiles.each{|key, value| interval_category.add(PercentileCategory.new(percentile: key, amount: value))}
            dataset_data.add(interval_category)
          end
        }
      }
    }
    codes = @codes.values.sort_by{|each| each.code.downcase}
    #codes.each{|each| each.unlock}
    codes
  end

end
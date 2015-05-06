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
    @codes = [  ]
    puts "   creating #{clazz.name}..."
    time_start = Time.now
    @map.each {|raw_interval, sheet|
      print "   reading... #{raw_interval}"
      sheet.each{|year, codes|
        codes.each{|id, raw_code|
          code = @clazz.new
          @codes.push(code)
          data = raw_code[:data]
          percentiles = raw_code[:percentiles]
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
      puts '   done'
    }
    codes = @codes.sort_by!{|each| each.code.downcase}
    puts "   converted in #{Time.now - time_start} seconds"
    codes
  end
end
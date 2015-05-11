require 'categories/general_interval_category'
require 'categories/percentile_category'

class Top3IcdStream

  attr_reader :map

  def initialize(clazz = nil)
    self.clazz(clazz)
    @map = {}
    @sex_catalog = []
  end

  def hospital(hospital)
    @hospital = hospital
    @map[@year][@sex][@hospital] = {} unless @map[@year][@sex][@hospital]
  end

  def top3(top3)
    @map[@year][@sex][@hospital] = top3
  end

  def parse_top3(top3)
    
  end

  def tab (tab)
    data = parse_tab(tab)
    @year = data[:year]
    @sex = sex_index(data[:sex])
    @map[@year] = {  } unless @map[@year]
    @map[@year][@sex] = {  } unless @map[@year][@sex]
  end


  def parse_tab (name)
    arr = name.downcase.tr(')', '').tr(' ', '').split('(')
    { year: arr[0].to_i, sex: arr[1]}
  end

  def sex_index(sex)
    @sex_catalog.push(sex) unless @sex_catalog.include?(sex)
    @sex_catalog.find_index(sex)
  end

  def clazz(clazz=nil)
    return @clazz unless clazz
    @clazz = clazz
    self
  end

  def to_codes
    puts @map
  end
end
require 'categories/general_interval_category'
require 'categories/percentile_category'

class Top3IcdStream

  attr_reader :map

  def initialize(clazz = nil)
    self.clazz(clazz)
    @map = {}
  end

  def hospital(hospital)
    @hospital = hospital
  end

  def top3(top3)
    @map[@tab][@hospital] = top3
  end

  def tab (tab)
    @tab = tab
    @map[@tab] = {} unless @map[@tab]
  end

  def clazz(clazz=nil)
    return @clazz unless clazz
    @clazz = clazz
    self
  end

  def to_codes

  end
end
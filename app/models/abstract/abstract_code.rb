require 'abstract/abstract_data'
require 'mongoid_extensions'

class AbstractCode
  include Mongoid::Document
  include MultiLanguageText

  field :code, :type => String
  field :description, :type => String
  field :years, :type => HashWithIndifferentAccess, :default => Hash[]

  @tag = 'unknown'
  @type_description = 'Abstract code does nothing'

  def self.tag
    @tag
  end

  def self.type_description
    @type_description
  end

  def locked?
    @locked
  end

  def lock
    @_years_copy = self.years.deep_copy
    @locked = true
    self
  end

  def unlock
    @locked = false
    self.years = @_years_copy
    self
  end

  def years
    return @_years_copy if self.locked?
    super
  end

  def update_with(&block)
    self.lock
    block.call(self)
    self.unlock
  end

  # Adds the given data under the given year to this code
  # @param year the year to save the data under
  # @param data the data to save under the year
  def add_year(year, data = nil)
    self.years[year.to_s] = (data) ? data : self.new_data(year)
    self.at(year)
  end

  def at(year, do_add = false)
    return self.add_year(year) if do_add && !self.years[year.to_s]
    self.years[year.to_s]
  end

  def new_data (year)
    AbstractData.new(year: year)
  end

end
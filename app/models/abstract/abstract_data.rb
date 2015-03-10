class AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :year, :type => Integer

  def initialize(year)
    self.year = year
    save
  end

  def year
    return :year
  end
end
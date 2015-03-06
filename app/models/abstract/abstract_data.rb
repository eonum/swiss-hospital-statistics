class AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :year, :type => Integer

  def year
    return :year
  end

  def fromJSON(json)

  end

  def asJSON

  end
end
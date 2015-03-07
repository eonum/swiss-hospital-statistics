class AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :year, :type => Integer

  def year
    return :year
  end
end
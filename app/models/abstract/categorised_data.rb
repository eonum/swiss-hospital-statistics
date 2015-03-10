require 'abstract/abstract_data'

class CategorisedData < AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :categories, :type => Hash

  def categories
    #TODO: implement this
  end

  def at
    #TODO: implement this
  end

end
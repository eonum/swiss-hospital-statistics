require 'abstract/categorised_code'

class AgeCode < CategorisedCode

  include Mongoid::Document
  include MultiLanguageText

  def name
    return 'AgeCode'
  end

end
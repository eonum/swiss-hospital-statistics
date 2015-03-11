require 'abstract/abstract_code'

class CategorisedCode < AbstractCode

  def name
    return 'Abstract Code';
  end

  def newData
    return CategorisedData.new
  end

end
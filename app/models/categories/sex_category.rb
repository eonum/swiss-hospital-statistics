require 'abstract/abstract_category'

class SexCategory < AbstractCategory

  attr_accessor :sex

  @tag = :sex


  def initialize(options = {})
    super()
    @sex = options[:sex]
  end

end
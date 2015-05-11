class CodeDescriptionCategory < AbstractCategory

  @tag = :code_description

  attr_accessor :text_de
  attr_accessor :text_fr
  attr_accessor :text_it
  attr_accessor :code
  attr_accessor :short_code

  def initialize(options = {})
    super()
    @text_de = options[:text_de]
    @text_fr = options[:text_fr]
    @text_it = options[:text_it]
    @text_it = options[:code]
    @short_code = options[:short_code]
  end

end
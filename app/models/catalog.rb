require 'pragmas'
Dir['./app/models/**/*.rb'].each{ |f| require f }

class Catalog

  attr_reader :catalog

  def initialize
    @catalog = { :codes => {  } }
  end

  def codes
    Pragma.pragmas_named_in(:code, self.class).collect{|each| self.send(each.method, self)}
  end

  def be_preview
    self.codes.each{|each| self.push_code_type (each) }
    self
  end

  def push_code_type (_code)
    code = { :description => _code.type_description }
    @catalog[:codes][code.id.to_sym] = code
    code
  end

  def be_preview_for (symbol)
    type = self.codes.select {|each| each.id == symbol.to_sym}.first
    code = self.push_code_type(type)
  end

  def to_json
    { :codes => @catalog }
  end
end
require 'pragmas'
require 'scripting'
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
    @catalog[:codes][_code.tag.to_sym] = code
    code
  end

  def be_preview_for (symbol)
    type = self.codes.select {|each| each.tag == symbol.to_sym}.first
    return self unless type
    code = self.push_code_type(type)
    codes = type.all.pluck(:code)
    code[:codes] = codes
    self
  end

  def update_db
    self.codes.each{|each|
      pragmas = Pragma.pragmas_named_in(:parser, each)
      unless pragmas.empty?
        parser = pragmas.first.method.eonum_value(each)
        parser.parse
        codes = parser.stream.to_codes
        puts 'Parsed '+ codes.size.to_s + ' ' + each.name + 's'
        each.collection.insert codes.collect{|each| each.as_document }
      end
    }
  end

  def to_json
    { :codes => @catalog }
  end
end
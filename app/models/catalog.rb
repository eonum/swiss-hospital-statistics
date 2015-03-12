require 'pragmas'
Dir['./app/models/**/*.rb'].each{ |f| require f }

class Catalog

  attr_reader :catalog

  def codes
    Pragma.pragmas_named_in(:code, self.class).collect{|each| self.send(each.method, self)}
  end

  def be_preview
    @catalog = { :codes => {  } }
    self.codes.each{|each| @catalog[:codes][each.id.to_sym] = { :description => each.type_description }}
    self
  end

  def to_json
    { :codes => @catalog }
  end
end
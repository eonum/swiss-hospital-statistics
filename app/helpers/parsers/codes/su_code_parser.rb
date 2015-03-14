require 'parsers/abstract/composite_parser'

class SuCodeParser < CompositeParser

  def stream (stream = nil)
    return @stream unless stream
    @stream = stream
    self.build
    self
  end

  def build
    raise 'SubclassResponsibility'
  end

end
module Parsers

  class SuDParser < AbstractParser

    def parse
      @drg = Drg.new
      @drg.text_fr = @filename
      # parsing logic here
     @drg.save
      return @drg
    end
  end
end
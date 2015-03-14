require 'test_helper'
require 'cascadable'

class SuDChopCompositeParserTest < ActiveSupport::TestCase

  def setup
    @stream = SuChopDrgIcdStream.new
    @parser = SuChopDrgIcdParser.new('./test/fixtures/su_d_chop.xls').stream(@stream)
  end

  def test_chop_parser
    @parser.parse
    puts @stream.map
  end
end
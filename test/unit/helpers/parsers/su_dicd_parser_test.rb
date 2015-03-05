require 'test_helper'

class SuDICDParserTest < ActiveSupport::TestCase

  def setup
    @parser = SuDICDParser.new("./test/fixtures/su_d_icd.xls")
  end

  def test_basic_test
    Array arr = @parser.parse(20)
    puts "run"
    assert_equal(20, arr.count)
  end

end
